import './styles.css';
import Measure from 'react-measure';
import * as React from 'react';
import { Stage, Layer, Text, Group, Path } from 'react-konva';
import { graphlib, layout } from 'dagre';
import _ from 'lodash';
import { isGroup } from './contants';
import { getPathData } from './util';
import { Arrow } from './shape/arrows';
import { Edge, GroupBy, Node } from './types';
import { DagNode } from './shape/node';
import { DagGroupNode } from './shape/groupNode';
import Konva from 'konva';

type Props = {
  text: string;
  edges: Edge[];
  nodes: Node[];
  groupBy?: GroupBy;
};

type State = {
  dimensions: {
    width: number;
    height: number;
  };
};

export default class Dag extends React.Component<Props, State> {
  state = {
    dimensions: {
      width: 0,
      height: 0,
    },
  };

  graph: graphlib.Graph<Node>;
  stage = React.createRef<Stage>();
  layer = React.createRef();

  constructor(props: Props) {
    super(props);
    this.setGraph(props.nodes, props.edges, props.groupBy);
  }

  setGraph(nodes: Node[], edges: Edge[], groupBy?: GroupBy) {
    this.graph = new graphlib.Graph<Node>({
      directed: true,
      multigraph: true,
      compound: !!groupBy,
    });
    this.graph
      .setGraph({
        rankdir: 'LR',
        edgesep: 40,
      })
      .setDefaultEdgeLabel(function () {
        return {};
      });
    nodes.forEach((node) => {
      this.graph.setNode(node.id, { label: node.id, width: 158, height: 28, ...node });
    });
    edges.forEach((edge: Edge, index) => {
      this.graph.setEdge(edge.start, edge.end, { ...edge }, `${index}`);
    });
    if (groupBy) {
      const res = _.groupBy(nodes, groupBy.key);
      Object.keys(res).forEach((key) => {
        const groupId = `$group_${key}$`;
        this.graph.setNode(groupId, { label: key, [groupBy.key]: key, [isGroup]: true });
        res[key].forEach((node) => {
          this.graph.setParent(node.id, groupId);
        });
      });
    }
    layout(this.graph);
  }

  shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>) {
    if (this.props === nextProps && this.state === nextState) {
      return false;
    }
    if (this.props.nodes !== nextProps.nodes || this.props.edges !== nextProps.edges) {
      this.setGraph(nextProps.nodes, nextProps.edges, nextProps.groupBy);
    }
    return true;
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
    if (
      prevState.dimensions !== this.state.dimensions ||
      this.props.nodes !== prevProps.nodes ||
      this.props.edges !== prevProps.edges
    ) {
      this.fitView();
    }
  }

  getStage = () => {
    return this.stage.current!.getStage();
  };

  fitView = () => {
    const stage = this.getStage();
    const { width: oldWidth, height: oldHeight } = stage.getClientRect({
      skipTransform: true,
    });
    const radio = Math.min(
      this.state.dimensions.width / oldWidth,
      this.state.dimensions.height / oldHeight
    );
    if (radio < 1) {
      stage.getStage().scale({ x: radio, y: radio });
    }
    const mousePointTo = {
      x: this.state.dimensions.width / 2 - oldWidth / 2,
      y: this.state.dimensions.height / 2 - oldHeight / 2,
    };
    stage.position(mousePointTo);
    stage.batchDraw();
  };

  onWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    const scaleBy = 0.96;
    const stage = this.stage.current!.getStage();
    const oldScale = stage.scaleX();
    const mousePointTo = {
      x: stage.getPointerPosition()!.x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition()!.y / oldScale - stage.y() / oldScale,
    };
    const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
    if (e.evt.deltaY > 0 && newScale < 0.1) {
      return;
    }
    stage.scale({ x: newScale, y: newScale });

    const newPos = {
      x: -(mousePointTo.x - stage.getPointerPosition()!.x / newScale) * newScale,
      y: -(mousePointTo.y - stage.getPointerPosition()!.y / newScale) * newScale,
    };
    stage.position(newPos);
    stage.batchDraw();
  };

  scale = (scale: number) => {
    const stage = this.getStage();
    if (scale < 0.1) {
      return;
    }
    stage.getStage().scale({ x: scale, y: scale });
    stage.batchDraw();
  };

  render() {
    console.log('xxx');
    const { text } = this.props;
    const { dimensions } = this.state;
    return (
      <Measure
        bounds
        onResize={(contentRect) => {
          this.setState({ dimensions: contentRect.bounds || { width: 0, height: 0 } });
        }}
      >
        {({ measureRef }) => (
          <div ref={measureRef} className="dag-container">
            <Stage
              ref={this.stage}
              onWheel={this.onWheel}
              width={dimensions.width}
              height={dimensions.height}
              dragBoundFunc={function (pos) {
                return {
                  x: pos.x,
                  y: pos.y,
                };
              }}
              draggable
            >
              <Layer>
                <Text text={text} />
                {this.graph.nodes().map((v) => {
                  const node = this.graph.node(v);
                  console.log(node);
                  // @ts-ignore
                  if (node[isGroup]) {
                    return <DagGroupNode key={v} node={node} groupBy={this.props.groupBy!} />;
                  }
                  return <DagNode key={v} node={node} />;
                })}
                {this.graph.edges().map((e) => {
                  const edge = this.graph.edge(e);
                  const startNode = this.graph.node(e.v);
                  const endNode = this.graph.node(e.w);
                  const points = [
                    { x: startNode.x + startNode.width / 2, y: startNode.y },
                    ...edge.points.slice(1, -1),
                    { x: endNode.x - endNode.width / 2, y: endNode.y },
                  ];
                  const endPoint = points[edge.points.length - 1],
                    pts = points[edge.points.length - 2];
                  const x = Math.abs(endPoint.x - pts.x);
                  const y = Math.abs(endPoint.y - pts.y);
                  // 斜边长
                  const z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
                  // 弧度
                  const radina =
                    Math.abs(endPoint.x - pts.x) > Math.abs(endPoint.y - pts.y)
                      ? Math.acos(x / z)
                      : Math.asin(y / z);
                  console.log(e, edge.points, endPoint, pts, radina);

                  // 角度
                  const angle = 180 / (Math.PI / radina);
                  return (
                    <Group key={e.v + e.w + e.name}>
                      <Path data={getPathData(points)} stroke="#04c0c7" strokeWidth={4} />
                      <Arrow angle={-angle} x={endPoint.x} y={endPoint.y - 5} />
                    </Group>
                  );
                })}
              </Layer>
            </Stage>
          </div>
        )}
      </Measure>
    );
  }
}

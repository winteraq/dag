import './styles.css';
import Measure from 'react-measure';
import * as React from 'react';
import { Stage, Layer } from 'react-konva';
import { graphlib, layout } from 'dagre';
import Konva from 'konva';
import _ from 'lodash';
import { isGroup } from './contants';
import { Edge, GroupBy, Node, onNodeClick, onNodeContextMenu } from './types';
import { DagNode } from './shape/node';
import { DagEdge } from './shape/edge';
import { DagGroupNode } from './shape/groupNode';

type Props = {
  edges: Edge[];
  nodes: Node[];
  groupBy?: GroupBy;
  onNodeClick?: onNodeClick;
  onNodeContextMenu?: onNodeContextMenu;
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
                {this.graph.nodes().map((v) => {
                  const node = this.graph.node(v);
                  console.log(node);
                  // @ts-ignore
                  if (node[isGroup]) {
                    return <DagGroupNode key={v} node={node} groupBy={this.props.groupBy!} />;
                  }
                  return (
                    <DagNode
                      key={v}
                      node={node}
                      onContextMenu={this.props.onNodeContextMenu}
                      onClick={this.props.onNodeClick}
                    />
                  );
                })}
                {this.graph.edges().map((e) => {
                  const edge = this.graph.edge(e);
                  const startNode = this.graph.node(e.v);
                  const endNode = this.graph.node(e.w);
                  return <DagEdge key={e.v + e.w + e.name} startNode={startNode} endNode={endNode} edge={edge} />;
                })}
              </Layer>
            </Stage>
          </div>
        )}
      </Measure>
    );
  }
}

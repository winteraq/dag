import './styles.css';
import Measure from 'react-measure';
import * as React from 'react';
import { Stage, Layer, Text, Rect, Group, Path } from 'react-konva';
import { graphlib, layout } from 'dagre';
import _ from 'lodash';
import { isGroup } from './contants';
import { getPathData } from './util';

type Node = {
  id: string;
  [key: string]: any;
  extra?: any;
};
type Edge = { start: string; end: string; extra?: any; [key: string]: any };
type Props = {
  text: string;
  edges: Edge[];
  nodes: Node[];
  groupBy?: string;
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

  constructor(props: Props) {
    super(props);
    this.setGraph(props.nodes, props.edges, props.groupBy);
  }

  setGraph(nodes: Node[], edges: Edge[], groupBy?: string) {
    this.graph = new graphlib.Graph<Node>({ multigraph: true, compound: !!groupBy });
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
    edges.forEach((edge: Edge) => {
      this.graph.setEdge(edge.start, edge.end, { ...edge });
    });
    if (groupBy) {
      const res = _.groupBy(nodes, groupBy);
      Object.keys(res).forEach((key) => {
        const groupId = `$group_${key}$`;
        this.graph.setNode(groupId, { label: key, [isGroup]: true });
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
            <Stage width={dimensions.width} height={dimensions.height}>
              <Layer>
                <Text text={text} />
                {this.graph.nodes().map((v) => {
                  const node = this.graph.node(v);
                  console.log(node);
                  // @ts-ignore
                  if (node[isGroup]) {
                    return (
                      <Group key={v} x={node.x - node.width / 2} y={node.y - node.height / 2}>
                        <Rect
                          dash={[4, 4]}
                          stroke={'#222222'}
                          strokeWidth={1}
                          width={node.width}
                          height={node.height}
                        />
                      </Group>
                    );
                  }
                  return (
                    <Group key={v} x={node.x - node.width / 2} y={node.y - node.height / 2}>
                      <Rect
                        fill={'red'}
                        stroke={'blue'}
                        strokeWidth={2}
                        width={node.width}
                        height={node.height}
                      />
                      <Text text={node.label} />
                    </Group>
                  );
                })}
                {this.graph.edges().map((e) => {
                  const edge = this.graph.edge(e);
                  return (
                    <Path
                      data={getPathData(edge.points)}
                      key={e.v + e.w}
                      stroke="#04c0c7"
                      strokeWidth={4}
                    />
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

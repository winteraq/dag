import './styles.css';
import Measure from 'react-measure';
import * as React from 'react';
import { Stage, Layer } from 'react-konva';
import { graphlib, layout } from 'dagre';
import Konva from 'konva';
import _ from 'lodash';
import { isGroup } from './contants';
import {
  ActiveNode,
  Edge,
  GroupBy,
  Node,
  onNodeClick,
  onNodeContextMenu,
  onNodeHover,
  onNodeOutHover,
} from './types';
import { DagNode } from './shape/node';
import { DagEdge } from './shape/edge';
import { DagGroupNode } from './shape/groupNode';
import { getTheme } from './theme';

type Props = {
  edges: Edge[];
  nodes: Node[];
  type?: 'column' | 'default';
  activeNode?: ActiveNode;
  primaryNode?: { id: string };
  groupBy?: GroupBy;
  onNodeClick?: onNodeClick;
  onNodeContextMenu?: onNodeContextMenu;
  onNodeHover?: onNodeHover;
  onNodeOutHover?: onNodeOutHover;
  searchKey?: string;
};

type State = {
  dimensions: {
    width: number;
    height: number;
  };
};

export class Dag extends React.Component<Props, State> {
  state = {
    dimensions: {
      width: 0,
      height: 0,
    },
  };

  static defaultProps = {
    type: 'default',
  };

  graph: graphlib.Graph<Node>;

  stage = React.createRef<Stage>();
  layer = React.createRef<Konva.Layer>();

  constructor(props: Props) {
    super(props);
    this.setGraph(props);
  }

  setGraph({ nodes, edges, type, groupBy, activeNode, primaryNode }: Props) {
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
    let $state$ = activeNode ? 'disable' : 'secondary';
    const { nodeHeight, nodeWidth } = getTheme();
    nodes.forEach((node) => {
      const l = type === 'column' && node.columns?.length ? node.columns?.length + 1 : 1;
      this.setNode(
        {
          label: node.id,
          width: nodeWidth,
          height: nodeHeight * l,
          $state$,
          ...node,
        },
        node.id === activeNode?.id ? 'active' : $state$,
        type,
        primaryNode,
        node.id === activeNode?.id ? activeNode?.columnId : undefined
      );
    });
    edges.forEach((edge: Edge, index) => {
      if (activeNode) {
        if (edge.start === activeNode.id || edge.end === activeNode.id) {
          if (
            (type === 'column' &&
              ((edge.start === activeNode.id && edge.startCol === activeNode.columnId) ||
                (edge.end === activeNode.id && edge.endCol === activeNode.columnId))) ||
            type !== 'column'
          ) {
            $state$ = 'active';
            const startNode = this.graph.node(edge.start);
            const endNode = this.graph.node(edge.end);
            this.setNode(
              startNode,
              $state$,
              type,
              primaryNode,
              type === 'column' ? edge.startCol : edge.start
            );
            this.setNode(
              endNode,
              $state$,
              type,
              primaryNode,
              type === 'column' ? edge.endCol : edge.end
            );
            this.graph.setEdge(edge.start, edge.end, { ...edge, $state$: '' }, `${index}`);
            return;
          }
        }
        this.graph.setEdge(edge.start, edge.end, { ...edge, $state$: 'disable' }, `${index}`);
      } else {
        this.graph.setEdge(edge.start, edge.end, { ...edge, $state$: '' }, `${index}`);
      }
    });
    if (groupBy) {
      const res = _.groupBy(nodes, groupBy.key);
      Object.keys(res).forEach((key) => {
        const groupId = `$group_${key}$`;
        this.graph.setNode(groupId, {
          label: key,
          [groupBy.key]: key,
          [isGroup]: true,
        });
        res[key].forEach((node) => {
          this.graph.setParent(node.id, groupId);
        });
      });
    }
    layout(this.graph);
  }

  setNode(
    node: Node,
    $state$: string,
    type?: string,
    primaryNode?: { id: string },
    selectColId?: string
  ) {
    if (type === 'column' && !!selectColId && Array.isArray(node.columns)) {
      node.columns.forEach((col) => {
        if (col.id === selectColId) {
          col.$state$ = $state$;
        }
      });
    }
    if (primaryNode?.id && primaryNode?.id === node.id) {
      this.graph.setNode(node.id, { ...node, $state$: 'primary' });
    } else {
      this.graph.setNode(node.id, {
        ...node,
        // 列视图的时候，节点状态为active的时候，分两种情况，
        // 被激活的column正常蓝色，非active的column还是黑色
        $state$: type === 'column' && $state$ === 'active' ? 'secondary' : $state$,
      });
    }
  }

  shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>) {
    if (this.props === nextProps && this.state === nextState) {
      return false;
    }
    if (this.props.nodes !== nextProps.nodes || this.props.edges !== nextProps.edges) {
      this.setGraph(nextProps);
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
    const { width, height } = this.state.dimensions;
    const { width: stageWidth, height: stageHeight } = stage.getClientRect({
      skipTransform: true,
    });
    const radio = Math.min(width / stageWidth, height / stageHeight) - 0.15;
    if (radio < 1) {
      stage.getStage().scale({ x: radio, y: radio });
      const mousePointTo = {
        x: width / 2 - (stageWidth * radio) / 2,
        y: height / 2 - (stageHeight * radio) / 2,
      };
      stage.position(mousePointTo);
    } else {
      const mousePointTo = {
        x: width / 2 - stageWidth / 2,
        y: height / 2 - stageHeight / 2,
      };
      stage.position(mousePointTo);
    }
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
          this.setState({
            dimensions: contentRect.bounds || { width: 0, height: 0 },
          });
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
              <Layer ref={this.layer}>
                {/* 先遍历node，这样才能提前索引 column */}
                {this.graph.nodes().map((v) => {
                  const node = this.graph.node(v);
                  // @ts-ignore
                  if (node[isGroup]) {
                    return <DagGroupNode key={v} node={node} groupBy={this.props.groupBy!} />;
                  }
                  return (
                    <DagNode
                      key={v}
                      type={this.props.type!}
                      node={node}
                      onContextMenu={this.props.onNodeContextMenu}
                      onClick={this.props.onNodeClick}
                      activeNode={this.props.activeNode}
                      searchKey={this.props.searchKey}
                      stage={this.stage.current!}
                    />
                  );
                })}
                {this.graph.edges().map((e) => {
                  const edge = this.graph.edge(e);
                  const startNode = this.graph.node(e.v);
                  const endNode = this.graph.node(e.w);
                  return (
                    <DagEdge
                      key={e.v + e.w + e.name}
                      type={this.props.type!}
                      startNode={startNode}
                      endNode={endNode}
                      edge={edge}
                      activeNode={this.props.activeNode}
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

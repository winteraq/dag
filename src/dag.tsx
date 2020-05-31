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
  NodeAttr,
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
  nodeAttr?: NodeAttr;
  onStageClick?: (evt: Konva.KonvaEventObject<MouseEvent>) => void;
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

  edges: Edge[];

  nodes: Node[];

  constructor(props: Props) {
    super(props);
    this.edges = _.cloneDeep(props.edges);
    this.nodes = _.cloneDeep(props.nodes);
    this.setGraph({ ...props });
  }

  setGraphWithoutReLayout({ type, activeNode, primaryNode }: Props) {
    const nodes = this.nodes;
    const edges = this.edges;
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
      const edgeName = `${index}`;
      const graphEdge = this.graph.edge(edge.start, edge.end, edgeName);
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
              type === 'column' ? edge.startCol : edge.start,
              true
            );
            this.setNode(
              endNode,
              $state$,
              type,
              primaryNode,
              type === 'column' ? edge.endCol : edge.end,
              true
            );
            this.graph.setEdge(
              edge.start,
              edge.end,
              { ...graphEdge, ...edge, $state$: '' },
              edgeName
            );
            return;
          }
        }
        this.graph.setEdge(
          edge.start,
          edge.end,
          { ...graphEdge, ...edge, $state$: 'disable' },
          edgeName
        );
      } else {
        this.graph.setEdge(edge.start, edge.end, { ...graphEdge, ...edge, $state$: '' }, edgeName);
      }
    });
  }

  setGraph({ type, groupBy, activeNode, primaryNode }: Props) {
    const nodes = this.nodes;
    this.graph = new graphlib.Graph<Node>({
      directed: true,
      multigraph: true,
      compound: !!groupBy,
    });
    this.graph
      .setGraph({
        rankdir: 'LR',
        edgesep: 20,
        ranksep: Math.max(nodes.length * 3, 160),
      })
      .setDefaultEdgeLabel(function () {
        return {};
      });
    // @ts-ignore
    this.setGraphWithoutReLayout({ type, activeNode, primaryNode });
    if (groupBy) {
      const res = _.groupBy(nodes, groupBy.key);
      // console.log('res', res);
      Object.keys(res).forEach((key: string) => {
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
    selectColId?: string,
    keepState = false
  ) {
    const graphNode = this.graph.node(node.id) || {};
    if (type === 'column' && Array.isArray(node.columns)) {
      node.columns.forEach((col) => {
        if (col.id === selectColId) {
          col.$state$ = $state$;
        } else {
          col.$state$ = keepState ? col.$state$ : null;
        }
      });
    }
    if (primaryNode?.id && primaryNode?.id === node.id) {
      this.graph.setNode(node.id, { ...graphNode, ...node, $state$: 'primary' });
    } else {
      this.graph.setNode(node.id, {
        ...graphNode,
        ...node,
        // 列视图的时候，节点状态为active的时候，分两种情况，
        // 被激活的column正常蓝色，非active的column还是黑色
        $state$: type === 'column' && $state$ === 'active' ? 'secondary' : $state$,
      });
    }
  }

  shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>) {
    if (this.state !== nextState) {
      return true;
    }
    if (this.props === nextProps && this.state === nextState) {
      return false;
    }
    if (
      this.props.type !== nextProps.type ||
      JSON.stringify(this.props.groupBy) !== JSON.stringify(nextProps.groupBy) ||
      this.props.nodes !== nextProps.nodes ||
      this.props.edges !== nextProps.edges
    ) {
      if (nextProps.nodes !== this.props.nodes) {
        this.nodes = _.cloneDeep(nextProps.nodes);
      }
      if (nextProps.edges !== this.props.edges) {
        this.edges = _.cloneDeep(nextProps.edges);
      }
      this.setGraph(nextProps);
    }
    if (
      this.props.searchKey !== nextProps.searchKey ||
      JSON.stringify(this.props.activeNode) !== JSON.stringify(nextProps.activeNode) ||
      JSON.stringify(this.props.primaryNode) !== JSON.stringify(nextProps.primaryNode)
    ) {
      this.setGraphWithoutReLayout(nextProps);
    }
    return true;
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
    if (
      prevState.dimensions !== this.state.dimensions ||
      this.props.nodes !== prevProps.nodes ||
      this.props.edges !== prevProps.edges ||
      this.props.primaryNode?.id !== prevProps.primaryNode?.id
    ) {
      this.fitView();
    }
  }

  getStage = () => {
    return this.stage.current!.getStage();
  };

  getLayer = () => {
    return this.layer.current!;
  };

  fitView = () => {
    const stage = this.getStage();
    const { width, height } = this.state.dimensions;
    const { width: stageWidth, height: stageHeight } = stage.getClientRect({
      skipTransform: true,
    });
    const radio = Math.min(width / stageWidth, height / stageHeight);
    // console.log(radio, width, height, 'stage', stageWidth, stageHeight);
    if (radio < 1) {
      stage.getStage().scale({ x: radio, y: radio });
      const mousePointTo = {
        x: width / 2 - (stageWidth * radio) / 2,
        y: height / 2 - (stageHeight * radio) / 2,
      };
      stage.position(mousePointTo);
    } else {
      stage.getStage().scale({ x: 1, y: 1 });
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
    if (scale < 0.0001) {
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
              onClick={(evt) => {
                // console.log(evt);
                evt.evt.button === 0 && this.props.onStageClick && this.props.onStageClick(evt);
              }}
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
                      nodeAttr={this.props.nodeAttr}
                      onContextMenu={this.props.onNodeContextMenu}
                      onClick={this.props.onNodeClick}
                      onHover={this.props.onNodeHover}
                      onOutHover={this.props.onNodeOutHover}
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

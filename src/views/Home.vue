<template>
  <div class="logic-flow-view">
    <h3 class="demo-title">LogicFlow Vue demo</h3>
    <!-- 辅助工具栏 -->
    <!-- 节点面板 -->
    <NodePanel :lf="lf" :nodeData="nodeList"></NodePanel>
    <!-- 画布 -->
    <div id="LF-view" ref="container"></div>
    <!-- 用户节点自定义操作面板 -->
  </div>
</template>

<script>
import LogicFlow from "@logicflow/core";
import "@logicflow/core/dist/style/index.css";
import { Vue } from "vue-property-decorator";
import {
  Group,
  DndPanel,
  BpmnElement,
  SelectionSelect,
  Snapshot,
  BpmnAdapter,
} from "@logicflow/extension";
import "@logicflow/extension/lib/style/index.css";
import Component from "vue-class-component";
import NodePanel from "./../components/AddPannel.vue";

import {
  registerStart,
  registerEnd,
  registerUser,
} from "./../components/registerNode";
@Component({
  components: {
    NodePanel,
  },
})
export default class Home extends Vue {
  // 节点
  data = {
    nodes: [
      {
        id: "1",
        type: "bpmn:startEvent",
        x: 100,
        y: 100,
        text: {
          value: "开始",
          x: 100,
          y: 140,
        },
      },
      {
        id: "2",
        type: "bpmn:userTask",
        x: 300,
        y: 100,
        text: {
          value: "加班申请",
          x: 300,
          y: 100,
        },
      },
      {
        id: "3",
        type: "bpmn:userTask",
        x: 500,
        y: 100,
        text: {
          value: "领导审批",
          x: 500,
          y: 100,
        },
      },
      {
        id: "4",
        type: "bpmn:userTask",
        x: 700,
        y: 100,
        text: {
          value: "HR审批",
          x: 700,
          y: 100,
        },
      },
      {
        id: "5",
        type: "bpmn:endEvent",
        x: 900,
        y: 100,
        text: {
          value: "结束",
          x: 900,
          y: 140,
        },
      },
    ],
    edges: [
      {
        sourceNodeId: "1",
        targetNodeId: "2",
        type: "line",
        id: "ad7dc22f-f8fa-42bc-a3f3-451f60fcbc1c",
        startPoint: { x: 118, y: 100 },
        endPoint: { x: 250, y: 100 },
      },
      {
        endPoint: { x: 450, y: 100 },
        id: "edce5650-8af4-4485-8816-1d97000310f8",
        sourceNodeId: "2",
        targetNodeId: "3",
        type: "line",
        startPoint: { x: 350, y: 100 },
      },
      {
        sourceNodeId: "3",
        targetNodeId: "4",
        type: "line",
        endPoint: { x: 650, y: 100 },
        startPoint: { x: 550, y: 100 },
        id: "7baaa9ae-391c-4fa2-9a6a-44e6b0e644a0",
      },
      {
        id: "af3d4e5e-3a9f-4076-bc04-56738bfc0b52",
        sourceNodeId: "4",
        targetNodeId: "5",
        type: "line",
        startPoint: { x: 750, y: 100 },
        endPoint: { x: 882, y: 100 },
      },
    ],
  };
  nodeList = [
    {
      type: "bpmn:startEvent",
      text: "开始",
      class: "bpmn-start",
    },
    {
      type: "bpmn:endEvent",
      text: "结束",
      class: "bpmn-end",
    },
    {
      type: "bpmn:exclusiveGateway",
      text: "关联",
      class: "bpmn-exclusiveGateway",
    },
    {
      type: "bpmn:userTask",
      text: "用户",
      class: "bpmn-user",
    },
    { type: "rect", text: "矩形", class: "node-rect" },
    { type: "ellipse", text: "椭圆", class: "node-ellipse" },
    { type: "polygon", text: "多边形", class: "node-polygon" },
  ];

  lf = null;
  mounted() {
    this.initLf();
  }

  initLf() {
    LogicFlow.use(BpmnAdapter);
    // 画布配置
    this.lf = new LogicFlow({
      container: this.$refs.container,
      plugins: [Group, DndPanel, BpmnElement, SelectionSelect, Snapshot],
    });
    //this.lf.register(CustomHexagon);
    this.lf.render({
      nodes: this.data.nodes,
      edges: this.data.edges,
      grid: {
        size: 20,
        visible: true,
        type: "dot",
        config: {
          color: "#ababab",
          thickness: 1,
        },
      },
    });

    // 设置主题
    this.lf.setTheme({
      snapline: {
        stroke: "#1E90FF", // 对齐线颜色
        strokeWidth: 1, // 对齐线宽度
      },
    });
    this.registerNode();
    console.log(this.lf.getGraphData().edges);
  }
  registerNode() {
    registerStart(this.lf);
    registerEnd(this.lf);
    registerUser(this.lf);
    this.LfEvent();
  }
  LfEvent() {
    this.lf.on("node:click", ({ data }) => {
      console.log("node:click", data);
      this.$data.clickNode = data;
      this.$data.dialogVisible = true;
    });
    this.lf.on("edge:click", ({ data }) => {
      console.log("edge:click", data);
      this.$data.clickNode = data;
      this.$data.dialogVisible = true;
    });

    this.lf.on("edge:add", ({ data }) => {
      console.log("edge:add", data);
    });
    this.lf.on("node:mousemove", ({ data }) => {
      console.log("node:mousemove");
      this.moveData = data;
    });

    this.lf.on("connection:not-allowed", (data) => {
      this.$message({
        type: "error",
        message: data.msg,
      });
    });
    this.lf.on("node:mousemove", () => {
      console.log("on mousemove");
    });
  }
}
</script>

<style scoped>
.logic-flow-view {
  height: 100vh;
  position: relative;
}
.demo-title {
  text-align: center;
  margin: 20px;
}
.demo-control {
  position: absolute;
  top: 50px;
  right: 50px;
  z-index: 2;
}
#LF-view {
  width: calc(100% - 100px);
  height: 90%;
  outline: none;
  margin-left: 120px;
}
.time-plus {
  cursor: pointer;
}
.add-panel {
  position: absolute;
  padding: 10px 5px;
}
.el-drawer__body {
  height: 90%;
  overflow: auto;
  margin-top: -30px;
  z-index: 3;
}
</style>
<template>
  <div class="logic-flow-view">
    <h3 class="demo-title">LogicFlow Vue demo</h3>
    <el-button @click="exportAdapterData">点击下载</el-button>
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
  BpmnElement,
  BpmnAdapter,
  Menu,
  Snapshot,
  MiniMap,
} from "@logicflow/extension";
import "@logicflow/extension/lib/style/index.css";
import Component from "vue-class-component";
import NodePanel from "./../components/AddPannel.vue";
import customEdge from "./../components/customEdge";

/*import {
  registerStart,
  registerEnd,
  registerUser,
} from "./../components/registerNode";*/
@Component({
  components: {
    NodePanel,
  },
})
export default class Home extends Vue {
  // 节点
  /*data = {
    nodes: [
      {
        id: "Event_2cn81un",
        type: "bpmn:startEvent",
        x: 100,
        y: 200,
        text: {
          value: "开始",
          x: 100,
          y: 240,
        },
      },
      {
        id: "Activity_14ui9nt",
        type: "bpmn:userTask",
        x: 300,
        y: 200,
        text: {
          value: "加班申请",
          x: 300,
          y: 200,
        },
      },
      {
        id: "Activity_1pqgup4",
        type: "bpmn:userTask",
        x: 500,
        y: 200,
        text: {
          value: "领导审批",
          x: 500,
          y: 200,
        },
      },
      {
        id: "Gateway_3j124mc",
        type: "bpmn:exclusiveGateway",
        x: 620,
        y: 200,
        properties: {
          a: "efrwe",
          b: "wewe",
          name: "网关",
        },
        text: {
          x: 620,
          y: 200,
          value: "网关",
        },
      },
      {
        id: "Activity_2tcsndc",
        type: "bpmn:userTask",
        x: 780,
        y: 200,
        text: {
          value: "HR审批",
          x: 780,
          y: 200,
        },
      },
      {
        id: "Gateway_2uicbeb",
        type: "bpmn:exclusiveGateway",
        x: 780,
        y: 320,
        properties: {
          a: "efrwe",
          b: "wewe",
          name: "网关",
        },
        text: {
          x: 780,
          y: 320,
          value: "网关",
        },
      },
      {
        id: "Event_3s20rlm",
        type: "bpmn:endEvent",
        x: 880,
        y: 320,
        text: {
          value: "结束",
          x: 880,
          y: 320,
        },
      },
    ],
    edges: [
      {
        id: "Flow_238i5fu",
        sourceNodeId: "Event_2cn81un",
        targetNodeId: "Activity_14ui9nt",
        startPoint: { x: 110, y: 200 },
        endPoint: { x: 250, y: 200 },
        type: "bpmn:sequenceFlow",
      },
      {
        id: "Flow_1pl8fs1",
        endPoint: { x: 450, y: 200 },
        sourceNodeId: "Activity_14ui9nt",
        targetNodeId: "Activity_1pqgup4",
        type: "bpmn:sequenceFlow",
        text: "提交审批",
        startPoint: { x: 350, y: 200 },
      },
      {
        id: "Flow_19q0js9",
        sourceNodeId: "Activity_1pqgup4",
        targetNodeId: "Gateway_3j124mc",
        type: "bpmn:sequenceFlow",
        text: "next",
        endPoint: { x: 600, y: 200 },
        startPoint: { x: 545, y: 200 },
      },
      {
        id: "Flow_3tho3ch",
        sourceNodeId: "Activity_2tcsndc",
        targetNodeId: "Gateway_3j124mc",
        type: "bpmn:sequenceFlow",
        text: "审批通过",
        endPoint: { x: 730, y: 200 },
        startPoint: { x: 640, y: 200 },
      },
      {
        id: "Flow_2igk9uv",
        sourceNodeId: "Activity_2tcsndc",
        targetNodeId: "Gateway_2uicbeb",
        type: "bpmn:sequenceFlow",
        endPoint: { x: 780, y: 290 },
        startPoint: { x: 780, y: 220 },
      },
      {
        id: "Flow_3o86v5b",
        sourceNodeId: "Activity_1pqgup4",
        targetNodeId: "Activity_2tcsndc",
        type: "bpmn:sequenceFlow",
        text: "审批不通过",
        pointsList: [
          { x: 620, y: 220 },
          { x: 620, y: 300 },
          { x: 300, y: 300 },
          { x: 300, y: 240 },
        ],
      },
      {
        id: "Flow_1ch711i",
        sourceNodeId: "Gateway_2uicbeb",
        targetNodeId: "Event_3s20rlm",
        type: "bpmn:sequenceFlow",
        text: "通过",
        pointsList: [
          { x: 800, y: 320 },
          { x: 860, y: 320 },
        ],
      },
      {
        id: "Flow_3rlhimt",
        sourceNodeId: "Gateway_3j124mc",
        targetNodeId: "Activity_14ui9nt",
        type: "bpmn:sequenceFlow",
        text: "审批不通过",
        pointsList: [
          { x: 780, y: 300 },
          { x: 780, y: 360 },
          { x: 280, y: 360 },
          { x: 280, y: 240 },
        ],
      },
    ],
  };*/
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
    // 画布配置
    this.lf = new LogicFlow({
      grid: true,
      plugins: [BpmnElement, BpmnAdapter, Snapshot, Menu, MiniMap],
      container: this.$refs.container,
    });
    //this.lf.extension.dndPanel.setPatternItems(this.nodeList);
    //this.lf.register(CustomHexagon);

    // 设置主题
    this.lf.setTheme({
      edgeText: {
        textWidth: 100,
        overflowMode: "autoWrap",
        fontSize: 12,
        background: {
          fill: "#FFFFFF",
        },
      },
    });
    //this.registerNode();

    this.lf.register(customEdge);
    this.lf.setDefaultEdgeType("custom-edge");
    this.lf.render();
    console.log(this.lf.getGraphData());
  }
  download(filename, text) {
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  exportAdapterData() {
    const data = this.lf.getGraphData();
    download("logic-flow.xml", data);
  }

  /*registerNode() {
    registerStart(this.lf);
    registerEnd(this.lf);
    registerUser(this.lf);
    setDndPanel(this.lf);
  }*/
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
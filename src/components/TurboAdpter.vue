<template>
  <div class="logic-flow-view">
    <div class="flex">
      <h3 class="demo-title">LogicFlow Turbo Adpter</h3>
      <el-button type="text" @click="exportAdapterData"
        >保存AdpterXML data</el-button
      >
      <el-button type="text" @click="exportAdapterDataJson"
        >保存Adpter data</el-button
      >
    </div>
    <!-- 辅助工具栏 -->

    <!-- 节点面板 -->
    <NodePanel :lf="lf" :nodeList="nodeList"></NodePanel>
    <!-- 画布 -->
    <div id="LF-Turbo" ref="container"></div>
    <!-- 数据查看面板 -->
  </div>
</template>
<script>
import LogicFlow from "@logicflow/core";
import { Snapshot, BpmnElement, BpmnAdapter, Menu } from "@logicflow/extension";
import "@logicflow/core/dist/style/index.css";
import "@logicflow/extension/lib/style/index.css";
import NodePanel from "./LFComponents/NodePanel";
import {
  registerStart,
  registerUser,
  registerEnd,
  registerPush,
  registerDownload,
  registerPolyline,
  registerTask,
  registerConnect,
} from "./registerNode";
//import { BpmnNode } from "./config";
const nodeData = require("./response.json");
export default {
  name: "LF",
  components: { NodePanel },
  data() {
    return {
      lf: null,
      dialogVisible: false,
      config: {
        grid: true,
        background: {
          color: "#f7f9ff",
        },
        keyboard: {
          enabled: true,
        },
      },
      nodeList: [
        {
          type: "start",
          text: "开始",
          class: "bpmn-start",
        },
        {
          type: "end",
          text: "结束",
          class: "bpmn-end",
        },
        {
          type: "bpmn:exclusiveGateway",
          text: "网关",
          class: "bpmn-exclusiveGateway",
        },
        {
          type: "ServiceTask",
          text: "服务",
          class: "node-rect",
        },
        {
          type: "user",
          text: "用户",
          class: "bpmn-user",
        },
      ],

      shapeConfigMap: new Map(),
    };
  },
  mounted() {
    this.$_initLf();
    this.renderClick();
  },
  methods: {
    $_initLf() {
      // 画布配置
      LogicFlow.use(Snapshot);
      // 使用bpmn插件，引入bpmn元素，这些元素可以在turbo中转换后使用
      LogicFlow.use(BpmnElement);
      LogicFlow.use(BpmnAdapter);
      //LogicFlow.use(BpmnXmlAdapter);
      LogicFlow.use(Menu);
      const lf = new LogicFlow({
        ...this.config,
        container: this.$refs.container,
      });
      this.lf = lf;
      //this.adapterIn(nodeData);
      // 设置边类型bpmn:sequenceFlow为默认类型
      //lf.setDefaultEdgeType("bpmn:sequenceFlow");
      this.registerNode();
      this.lf.render(nodeData);
      this.lf.getGraphData();
      this.lf.register(registerTask);
    },
    registerNode() {
      registerStart(this.lf);
      registerUser(this.lf);
      registerEnd(this.lf);
      registerPush(this.lf, this.clickPlus, this.mouseDownPlus);
      registerDownload(this.lf);
      registerPolyline(this.lf);
      registerConnect(this.lf);
    },
    download(filename, text) {
      var element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(text)
      );
      element.setAttribute("download", filename);

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    },
    renderClick() {
      this.lf.on("node:click", ({ data }) => {
        console.log(data);
        // const model = lf.graphModel.getElement(data.id)
        // model.fill = 'red'
        // console.log(data.id)
        // console.log(lf.getGraphData())
        // lf.changeNodeId(data.id)
      });
      this.lf.on("node:dnd-add", (data) => {
        console.log(data);
      });
    },

    exportAdapterData() {
      const data = this.lf.getGraphData();
      this.download("logic-flow.xml", data);
      //sconsole.log(data);
      console.log(this.lf.getGraphData(), "9999");
      window.sessionStorage.setItem("lf-data", data);
    },
    downloadJson(filename, text) {
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
    },

    exportAdapterDataJson() {
      const adapterData = this.lf.getGraphData();
      console.log(adapterData);
      this.downloadJson("logic-flow.json", JSON.stringify(adapterData));
    },
  },
};
</script>
<style>
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
#LF-Turbo {
  width: calc(100% - 100px);
  height: 80%;
  outline: none;
  margin-left: 50px;
}
.time-plus {
  cursor: pointer;
}
.add-panel {
  position: absolute;
  z-index: 11;
  background-color: white;
  padding: 10px 5px;
}
.flex {
  display: flex;
  justify-content: center;
}
.el-button {
  padding: 10px !important;
}
</style>


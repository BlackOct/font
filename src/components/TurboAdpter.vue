<template>
  <div class="logic-flow-view">
    <div class="flex">
      <h3 class="demo-title">LogicFlow Turbo Adpter</h3>
      <el-button type="text" @click="exportAdapterData"
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
import { Snapshot, BpmnElement, BpmnAdapter } from "@logicflow/extension";
import "@logicflow/core/dist/style/index.css";
import "@logicflow/extension/lib/style/index.css";
import NodePanel from "./LFComponents/NodePanel";
import { toLogicflowData } from "../Util/AdpterForTurbo";
import { BpmnNode } from "./config";
const demoData = require("./dataTurbo.json");

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
      nodeList: BpmnNode,
    };
  },
  mounted() {
    this.$_initLf();
  },
  methods: {
    $_initLf() {
      // 画布配置
      LogicFlow.use(Snapshot);
      // 使用bpmn插件，引入bpmn元素，这些元素可以在turbo中转换后使用
      LogicFlow.use(BpmnElement);
      LogicFlow.use(BpmnAdapter);
      const lf = new LogicFlow({
        ...this.config,
        container: this.$refs.container,
      });
      this.lf = lf;
      // 设置边类型bpmn:sequenceFlow为默认类型
      lf.setDefaultEdgeType("bpmn:sequenceFlow");
      this.$_render();
    },
    $_render() {
      // Turbo数据转换为LogicFlow内部识别的数据结构
      const lFData = toLogicflowData(demoData);
      this.lf.render(lFData);
    },
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
    },

    exportAdapterData() {
      const adapterData = this.lf.getGraphData();
      this.download("logic-flow.json", JSON.stringify(adapterData));
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


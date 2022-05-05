<template>
  <div id="app">
    <div style="">
      <el-header>Header</el-header>
      <el-container>
        <el-aside style="background-color: #545c64" width="">
          <el-menu
            :unique-opened="true"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            default-active="/principle"
          >
            <el-submenu index="">
              <template slot="title">
                <i class="el-icon-s-data"></i>
                <span>logicFlow</span>
              </template>
              <el-menu-item index="/principle"
                >TypeScript Principle</el-menu-item
              >
              <el-menu-item index="/about">LogicFlow Principle</el-menu-item>
              <el-menu-item index="/home">demo</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <keep-alive>
            <router-view :key="$route.fullPath">
              <!-- 这里是会被缓存的视图组件 -->
            </router-view>
          </keep-alive>
        </el-main>
      </el-container>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { Vue } from "vue-property-decorator";
import Component from "vue-class-component";
@Component({})
export default class App extends Vue {
  key() {
    return this.$router.name !== undefined
      ? this.$router.name + new Date()
      : this.$router + new Date();
  }
  mounted() {
    console.log(this.$router.fullPath);
  }

  handleSelect(index, key) {
    console.log(key);
    console.log(index);
    this.$router.push({
      path: index,
    });
  }
}
</script>
<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
*,
*::before,
*::after {
  box-sizing: border-box;
}
html,
body {
  font-family: PingFangSC-Light, "Microsoft YaHei", "微软雅黑", arial,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  width: 200px;
  height: calc(100vh - 112px);
  background-color: #d3dce6;
  color: #333;
}

.el-main {
  height: calc(100vh - 112px);
  padding: 15px;
  background-color: #e9eef3;
  color: #333;
}
</style>

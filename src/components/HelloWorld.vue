<template>
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
          default-active=""
        >
          <el-submenu index="">
            <template slot="title">
              <i class="el-icon-s-data"></i>
              <span>keepAlive</span>
            </template>
            <el-menu-item index="/principle">principle</el-menu-item>
            <el-menu-item index="/newHelloWorld">Example 1</el-menu-item>
            <el-menu-item index="/editHelloWorld">Example 2</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <keep-alive> <router-view :key="key"></router-view> </keep-alive
      ></el-main>
    </el-container>
  </div>
</template>
<script lang="ts">
// Component来注册组件
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Todo extends Vue {
  public currentIndex = -1;
  public lists = [
    // 声明数据列表
    {
      text: "睡觉 呼呼~~~",
      complete: false,
    },
    {
      text: "玩游戏 呼呼~~~",
      complete: false,
    },
  ];
  $route: any;
  key() {
    return this.$route.name !== undefined
      ? this.$route.name + new Date()
      : this.$route + new Date();
  }
  handleSelect(index: any) {
    this.$route.push({
      path: index,
    });
  }
}
</script>
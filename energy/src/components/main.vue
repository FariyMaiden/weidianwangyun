<template>
  <div>
    <div id="mainhead" class="mainhead" :style="{height:mainheadheight}">
      <img src="../assets/tairuijie.jpg" alt="图片" class="mainheadlogo">
      <h2 class="mainheadh2">泰瑞捷综合能源管理平台系统</h2>
      <div class="menuhead">
        <el-menu
          mode="horizontal"
          @select="handleSelect"
          background-color="#45b0e8"
          default-active="1"
          text-color="#bcedfe"
          active-text-color="#bcedfe"
        >
          <el-menu-item index="0">首页</el-menu-item>
          <el-submenu :index="String(menuindex)" v-for="(item,menuindex) in menu" :key="menuindex">
            <template slot="title">{{item.title}}</template>
            <el-menu-item
              :index="String(item.selectmenu.index)"
              v-for="(selectmenuitem,selectmenuindex) in item.selectmenu"
              :key="selectmenuindex"
              @click="getmenuname(item.title)"
            >{{selectmenuitem}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </div>

    <div>
      <router-view/>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      mainheadheight: "", //公用头部的高度
      menu: [
        { title: "档案管理", selectmenu: ["1", "2", "3", "4"] },
        { title: "系统管理", selectmenu: ["1", "2", "3", "4"] },
        { title: "能耗分析", selectmenu: ["1", "2", "3", "4"] },
        { title: "运维管理", selectmenu: ["1", "2", "3", "4"] }
      ] //主菜单的名称，由后台传输
    };
  },

  created() {
    this.mainheadheight = screen.height / 7.4 + "px";
    console.log(this.mainheadheight);
    window.localStorage.setItem(
      "sumheight",
      screen.height - screen.height / 7.4
    );
  },
  methods: {
    getmenuname(item) {
      console.log(item);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      console.log(key);
      console.log(keyPath[0]);
      if (key === "0") {
        this.$router.push({ name: "show" });
      }
    }
  }
};
</script>

<style>
* {
  list-style: none;
}
body {
  margin: 0px;
}
.mainhead {
  width: 100%;
  background-color: #45b0e8;
}
.mainheadlogo {
  margin: 2%;
  float: left;
  width: 5%;
  height: 50%;
}
.mainheadh2 {
  float: left;
  margin-top: 2%;
  color: RGB(201, 239, 254);
  text-shadow: 5px 5px 5px black;
}
.menuhead {
  margin-top: 6%;
  float: left;
  margin-left: -23%;
}
</style>

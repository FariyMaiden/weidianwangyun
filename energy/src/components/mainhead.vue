<template>
<!-- 整个楼宇系统公用头部（最大的组件） -->
  <div>
    <div id="mainhead" class="mainhead" :style="{height:mainheadheight}">
      <img src="../assets/trj.png" alt="图片" class="mainheadlogo">
      <h2 class="mainheadh2">智慧能源云平台</h2>
      <div class="menuhead">

<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"  background-color="#45b0e8"  text-color="#bcedfe" @select="handleSelect">
  <el-menu-item :index="String(menuindex)" v-for="(item,menuindex) in menu" :key="menuindex" class="el-menu-item">{{item.title}}</el-menu-item>
</el-menu>

      </div> 
    </div>
    <!-- <div> -->
      <router-view/>
    <!-- </div> -->
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {   
    return {
      activeIndex: '0',    //默认所在的位置
      mainheadheight: "", //公用头部的高度
      menu: [{ title: '首页'},
      // {title:'安防系统'},
      {title:'配电房安全系统监控'},
      // { title: "楼控系统"},
      { title: "能耗监测"},{ title: "系统管理"}] //主菜单的名称，由后台传输
    };
  },
  created() {
    this.mainheadheight = screen.height / 13 + "px";
    console.log(this.mainheadheight);
    window.localStorage.setItem(
      "sumheight",
      screen.height - screen.height / 7.4 + 'px'
    );
  },
  methods: {  
        handleSelect(key, keyPath) {
            console.log(keyPath[0]);   
            if(keyPath[0] === '0'){
                this.$router.push('/mainhead/zhanshishouye')
            }else if(keyPath[0] === '2'){
                this.$router.push('/mainhead/nengyuanguanlimain')
            }else if(keyPath[0] === '3'){
              this.$router.push('/mainhead/sysxitongguanlimain')
            }
        }
    }, 
};

</script>

<style>
body {
  margin: 0px;
}
.mainhead {
  width: 100%;
  background-color: #45b0e8;
}
.mainheadlogo {
  float: left;
  width: 5%;
  height: 100%;
}
.mainheadh2 {
  float: left;
  margin-top: 1%;
  color: RGB(201, 239, 254);
  text-shadow: 5px 5px 5px black;
}
 .menuhead {
  
    /* float: left; */
    margin-left:50%;
   
}
 .el-menu--horizontal>.el-menu-item{
   height: 10px;
 }
 .el-menu.el-menu--horizontal {
    border-bottom: solid 0px #e6e6e6;
}
.el-menu-item{
    font-size: 16px;
    font-weight: bolder;
}

</style>

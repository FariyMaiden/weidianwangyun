<template>
<!-- 系统管理树形菜单公用父组件 -->
    <div>
        <div class="xitongguanli-leftbox" :style="{height:addheight}">
        <el-tree :data="caidantree" :props="defaultProps" @node-click="handleNodeClick" class="eltree" default-expand-all></el-tree>

        </div>
        <div><router-view /></div>

    </div>
</template>

<script>
    export default {

        data(){
            return{
        addheight:'',
        caidantree: [{
            label: '权限管理'
        }, 
        {
            label: '角色管理'
          }, 
          {
            label: '用户管理'
        }, 
        {
            label: '数据字典'
         },
         {
            label: '登录日志'      
        },
          {
            label: '操作日志'
        },
      ],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        caidanname:['权限管理','角色管理','用户管理','数据字典','登录日志','操作日志'],
        routername:['/XTGLquanxianguanli','/XTGLjueseguanli',
        '/XTGLyonghuguanli','/XTGLshujuzidian',
        '/XTGLloginrizhi','/XTGLcaozuorizhi']
            }
        },

         created() {
    console.log(window.localStorage.getItem("sumheight"));
     this.addheight = screen.height - screen.height / 5.57 + "px";
    console.log( this.addheight)
  },
  methods:{
      handleNodeClick(data) {
        console.log(data.label);
        console.log(data.$treeNodeId);
        for(let i = 0; i < this.caidanname.length; i++){
          if(data.label ===  this.caidanname[i]){
            this.$router.push('/mainhead/sysxitongguanlimain'+this.routername[i])
          }
        }      
      } 
  }
        
    }
</script>

<style>
.xitongguanli-leftbox{
    /* background-color:rgb(73, 137, 167); */
    width:13%;
    /* border-right: 1px solid rgb(73, 137, 167); */
    float: left;

  

}
.eltree{
    /* background-color: rgb(73, 137, 167); */
    color: rgb(3, 3, 12);  
    margin-left: 20%; 
}

</style>
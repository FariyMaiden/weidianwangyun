<template>
<!-- 能源管理树形菜单公用父组件 -->
    <div>
        <div class="nengyuanguanli-leftbox" :style="{height:addheight}">
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
          label: '能源看板',      
          children: [{
            label: '能源看板'          
          }]
        }, {
          label: '实时监控',
          children: [
          //   {
          //   label: '实时数据'
          // },
                {
            label: '用电查询'
          },
                {
            label: '用水查询'
          },
          {
            label: '历史数据',
            children: [{
              label: '冻结数据'
            },
            {
              label: '告警事件'
            },
            {
              label: '费用参数'
            }]
          }
          // {
          //   label: '数据曲线',
          // }
          ]
        }, {
          label: '能耗分析',
           children: [{
            label: '能耗分析'          
          }
         ]
         },
         {
          label: '设备管理',
          children: [{
            label: '表计控制'          
          },
          {
            label: '表计参数'          
          },
            {
            label: '网关控制'          
          },
            {
            label: '报警管理'          
          },
          ]
          
        },
          {
          label: '结算管理',
          children: [{
            label: '充值退费'          
          },
          {
            label: '远程充值'          
          },
            {
            label: '结算报表'          
          },
            {
            label: '财务对账'          
          },
          ]        
        },
        // {
        //   label: '报表服务',
        //    children: [{
        //     label: '报表服务'          
        //   }]
        //  },
          {
          label: '档案管理',
          children: [
          //   {
          //   label: '用能单位'          
          // },
          // {
          //   label: '用能结构'          
          // },
           {
             label: '设备型号' 
          },
            {
            label: '计量设备'          
          },
           {
            label: '网关设备'          
          },
            {
            label: '客户档案'          
          },
           {
            label: '区域档案'          
          }
         
          ]        
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        caidanname:['能源看板',
        // '实时数据',    
         '用电查询',
         '用水查询',
        '冻结数据','告警事件','费用参数',
        // '数据曲线',
        '能耗分析',
        '表计控制','表计参数','网关控制','报警管理','充值退费','远程充值','结算报表','财务对账',//'报表服务',
        //  '用能单位',
        //  '用能结构',
         '设备型号','计量设备','网关设备','客户档案', '区域档案'],
        routername:['/zhanshishouye',
        // '/NYNHTJshishishuju',    
        '/NYNHTJdianbiaochaobiaoshuju',
         '/NYNHTJshuibiaochaobiaoshuju',
        '/NYNHTJLSdongjieshuju',
        '/NYNHTJLSgaojingshijian','/NYNHTJLSfeiyongcanshu',
        // '/NYNHTJLSshujuquxian',
        '/NYNHFXnenghaofenxi','/NYSBGLbiaojikongzhi','/NYSBGLbiaojicanshu','/NYSBGLwangguankongzhi',
        '/NYSBGLbaojinguanli','/NYJSGLchongzhituifei','/NYJSGLyuanchengchongzhi','/NYJSGLjiesuanbaobiao',
        '/NYJSGLcaiwuduizhang',//'/NYBBFWbaobiaofuwu',
        // '/NYDAGLyongnengdanwei',
        // '/NYDAGLyongnengjiegou',
       '/NYDAGLshebeijichuxinxi','/NYDAGLjiliangshebei','/NYDAGLwangguanshebei','/NYDAGLkehudangan','/NYDAGLquyudangan']
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
          if(data.label ===  this.caidanname[0]){
            this.$router.push('/mainhead'+this.routername[0])
          }else if(data.label ===  this.caidanname[i]){
            this.$router.push('/mainhead/nengyuanguanlimain'+this.routername[i])
          }
        }      
      } 
  }
        
    }
</script>

<style>
.nengyuanguanli-leftbox{
    /* background-color:rgb(73, 137, 167); */
    width:200px;
    /* border-right: 1px solid rgb(73, 137, 167); */
    float: left;
   
   

   
}
.eltree{
    /* background-color: rgb(73, 137, 167); */
    color: rgb(3, 3, 12);  
    margin-left: 20%; 
}

</style>
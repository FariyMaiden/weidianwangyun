<template>
<!-- 表计参数 -->
    <div>
        <div class="biaojicanshubigbox">
            <div >        
            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" default-expand-all class="treebiaoji" :style="{height:addheight}"></el-tree>                
            </div>
            <!-- 表计参数的查询以及设置 -->
            <div v-if="showbiaojicanshu">
            <h2>所需操作表计：{{suoxuanbiaojibianhao}}</h2>
            <h3>变比信息</h3>
                <el-button type="primary" plain icon="el-icon-edit-outline" size="medium">抄读变比</el-button>
                <el-button type="success" plain icon="el-icon-s-tools" size="medium">设置变比</el-button>
                <ul>   
                    <li>CT：<el-input v-model="CT"  style="width:300px"></el-input></li>
                    <li>PT：<el-input v-model="PT"  style="width:300px"></el-input></li>                  
                </ul>
            <h3>电价信息</h3>
            <el-button type="primary" plain icon="el-icon-edit-outline" size="medium">抄读电价</el-button>
            <el-button type="success" plain icon="el-icon-s-tools" size="medium">设置电价</el-button>
            <ul>
                <li> 电价费率1：<el-input v-model="dianjiafeilv1"  style="width:300px"></el-input></li>
                <li> 电价费率2：<el-input v-model="dianjiafeilv2"  style="width:300px"></el-input></li>
                <li> 电价费率3：<el-input v-model="dianjiafeilv3"  style="width:300px"></el-input></li>
                <li> 电价费率4：<el-input v-model="dianjiafeilv4"  style="width:300px"></el-input></li>
            </ul>         
            </div>
        </div>


    </div>
</template>

<script>
    export default {
          data() {
      return {
        addheight:'',
        CT:'',
        PT:'',
        dianjiafeilv1:'',
        dianjiafeilv2:'',
        dianjiafeilv3:'',
        dianjiafeilv4:'',
        showbiaojicanshu:true,//展现表计参数
        suoxuanbiaojibianhao:'',//选择的表计编号
        data: [{
          label: '一级区域名称1',
          children: [{
            label: '二级区域名称1',
            children: [{
              label: 1223234
            }]
          }]
        }, {
          label: '一级区域名称2',
          children: [{
            label: '二级区域名称2',
            children: [{
              label:222222
            }]
          }]
        }, {
          label: '一级区域名称3',
          children: [{
            label: '二级区域名称3',
            children: [{
              label: '三级区域名称+电表个体标识号3'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
     created() {
    console.log(window.localStorage.getItem("sumheight"));
     this.addheight = screen.height - screen.height / 4 + "px";
    console.log( this.addheight)},
    methods: {
      handleNodeClick(data) {
      
        if(typeof data.label  === 'number'){
            console.log('这是电表号')
            this.showbiaojicanshu = true;
            this.suoxuanbiaojibianhao = data.label
        }     
      }
    }
        
    }
</script>

<style>
.biaojicanshubigbox{
    float: left;
    width: 100%;

}
*{
    list-style: none;
}
li{
    margin-top: 1%;
}
.treebiaoji{
    
    width:25%;
    float: left;
}

</style>
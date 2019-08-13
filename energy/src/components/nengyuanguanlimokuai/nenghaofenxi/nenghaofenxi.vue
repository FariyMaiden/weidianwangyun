<template>
<!-- 能耗分析 -->
    <div>
        <div class="nenghaofenxibox">
              <div class="blockleftcost1">
 
        <el-date-picker
          v-model="startDate"
          type="datetime"
          placeholder="开始日期"
          format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>

        <span>至</span>

        <el-date-picker
          v-model="endDate"
          type="datetime"
          placeholder="结束日期"
          format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>
         <el-button type="primary" @click="querynenghaofenxi(code)">查询</el-button>

           <div class="right1">
        <el-select v-model.lazy="name1" placeholder="用能区域" clearable @change="selectChange">
          <el-option
            v-for="item in tradeStyle"
            v-if="tradeStyle.length > 0 && item!=''"
            :label="item"
            :value="item"
            :key="item.index"
          ></el-option>
        </el-select>
        <el-select v-model.lazy="name2" placeholder="对比用能区域" clearable @change="selectChange">
          <el-option
            v-for="item in AuditState"
            v-if="AuditState.length > 0 && item!='' "
            :label="item"
            :value="item"
            :key="item.index"
          ></el-option>-->
        </el-select>    
        <el-date-picker
          v-model="startDate"
          type="datetime"
          placeholder="开始日期"
          format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>

        <span>至</span>

        <el-date-picker
          v-model="endDate"
          type="datetime"
          placeholder="结束日期"
          format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>
         <el-button type="primary" @click="querynenghaofenxi(code)">查询</el-button>

      </div>
    </div>
      <!-- 图表 -->
      <div class='echartbox'>
        <el-button size="mini" round>日</el-button>
        <el-button size="mini" round>月</el-button>
        <el-button size="mini" round>年</el-button>
        <div id='yongdianlianfenxi' class='yongdianlianfenxi'></div>
        <el-button size="mini" round>日</el-button>
        <el-button size="mini" round>月</el-button>
        <el-button size="mini" round>年</el-button>
        <div id='bingzhuangtu' class='bingzhuangtu'></div>
        </div>
        <!-- 表格 -->
      <div class="nenghaofenxiTable">
          <div class="tablebtn">
                <el-button size="medium" round>电</el-button>
                <el-button size="medium" round>水</el-button>
                <el-button size="medium" round>气</el-button>
                <el-button size="medium" round>热</el-button>

          </div>
         
           <el-table
                :data="getnenghaofenxiTabledata"
                style="width: 100%"
               
                :header-cell-style="getRowClass"
                >
                <el-table-column
                fixed
                :prop="item.id"
                :label="item.label"
                v-for='(item,index) in nenghaofenxitablehead' :key="index">
                </el-table-column>
               
            </el-table>
             <!-- 分页按钮 -->
               <div class='fengyeanniu'>
               <el-button-group>
                  <el-button type="primary" icon="el-icon-arrow-left"
                >上一页</el-button>
                  <el-button type="primary"      
                  >下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
                </el-button-group>
              </div>
        
      </div> 
  </div>

    </div>
</template>

<script>
import echarts from "echarts";
import "../../../resources/echartTheme";
    export default {
        data(){
            return{
              endDate:'',
              startDate:'',
              AuditState:{},
              tradeStyle:{},
              name1:'',
              name2:'' ,
              
              nenghaofenxitablehead:[{
                  label:'用能区域名称',
                  id:'name'
              },
              {
                  label:'表号',
                  id:'biaohao'
              },
              {
                  label:'用电量（/kw）',
                  id:'dianliang'
              },
              {
                  label:'开始时间',
                  id:'kaishitime'
              },
              {
                  label:'结束时间',
                  id:'endtime'
              }
             ],
             getnenghaofenxiTabledata:[
                 {
                     name:'会议室',
                     biaohao:'3232312',
                     dianliang:'312',
                     kaishitime:'2019-06-01',
                     endtime:'2019-07-01'
                 },
                   {
                     name:'会议室',
                     biaohao:'3232312',
                     dianliang:'312',
                     kaishitime:'2019-06-01',
                     endtime:'2019-07-01'
                 },
                   {
                     name:'走廊',
                     biaohao:'3232312',
                     dianliang:'312',
                     kaishitime:'2019-06-01',
                     endtime:'2019-07-01'
                 },
                   {
                     name:'洗手间',
                     biaohao:'3232312',
                     dianliang:'312',
                     kaishitime:'2019-06-01',
                     endtime:'2019-07-01'
                 },
                   {
                     name:'前台大厅',
                     biaohao:'3232312',
                     dianliang:'312',
                     kaishitime:'2019-06-01',
                     endtime:'2019-07-01'
                 },
                   {
                     name:'云机房',
                     biaohao:'3232312',
                     dianliang:'312',
                     kaishitime:'2019-06-01',
                     endtime:'2019-07-01'
                 },
                   {
                     name:'办公区',
                     biaohao:'3232312',
                     dianliang:'312',
                     kaishitime:'2019-06-01',
                     endtime:'2019-07-01'
                 },
                  {
                     name:'办公区',
                     biaohao:'3232312',
                     dianliang:'312',
                     kaishitime:'2019-06-01',
                     endtime:'2019-07-01'
                 },
                  {
                     name:'办公区',
                     biaohao:'3232312',
                     dianliang:'312',
                     kaishitime:'2019-06-01',
                     endtime:'2019-07-01'
                 },
                  {
                     name:'办公区',
                     biaohao:'3232312',
                     dianliang:'312',
                     kaishitime:'2019-06-01',
                     endtime:'2019-07-01'
                 },
             ]

             
            
            }
        },
        created(){
          
        },
        mounted(){
         this.nenghaofenxiEchart();
         this.bingzhuangtu();
        },
        methods:{
            //更改表头颜色
            getRowClass({ row, column, rowIndex, columnIndex }) {
                if (rowIndex == 0) {
                        return 'background:#EFEFEF'
                } else {
                        return ''
                }
            },
          //能耗分析饼状图
          bingzhuangtu(){

            let bingzhuangtudom = document.getElementById("bingzhuangtu");
            let myChart = this.$echarts.init(bingzhuangtudom, "westeros");    
            let itemStyle = {
                normal: {
                    opacity: 0.7,
                    color: {                  
                        repeat: 'repeat'
                    },
                    borderWidth: 3,
                    borderColor: '#235894'
                }
            };
                 myChart.setOption({         
               
                tooltip: {},
                series: [{
                    name: 'pie',
                    type: 'pie',
                    selectedMode: 'single',
                    selectedOffset: 30,
                    clockwise: true,
                    label: {
                        normal: {
                            textStyle: {
                                fontSize: 18,
                                color: '#235894'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: '#235894'
                            }
                        }
                    },
                    data:[
                        {value:335, name:'水'},
                        {value:310, name:'电'},
                        {value:234, name:'气'},
                        {value:135, name:'热'},
                       
                    ],
                }]
                            })

          },
            //能耗分析柱形图
          nenghaofenxiEchart(){
             let yongdianlianfenxidom = document.getElementById("yongdianlianfenxi");
             let myChart = this.$echarts.init(yongdianlianfenxidom, "westeros");
           myChart.setOption({
  
    tooltip : {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data:['三楼','外贸集团','集团总部','云机房（大）','云机房（小）']
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : ['周一','周二','周三','周四','周五','周六','周日']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'三楼',
            type:'line',
            stack: '总量',
            areaStyle: {},
            data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
            name:'外贸集团',
            type:'line',
            stack: '总量',
            areaStyle: {},
            data:[220, 182, 191, 234, 290, 330, 310]
        },
        {
            name:'集团总部',
            type:'line',
            stack: '总量',
            areaStyle: {},
            data:[150, 232, 201, 154, 190, 330, 410]
        },
        {
            name:'云机房（大）',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data:[320, 332, 301, 334, 390, 330, 320]
        },
        {
            name:'云机房（小）',
            type:'line',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            areaStyle: {normal: {}},
            data:[820, 932, 901, 934, 1290, 1330, 1320]
        }
    ]
})
          },
         
            //获取能耗分析数据
            querynenghaofenxi(index){
 

            },
            selectChange(){

            }
             
        } 
    }
</script>

<style>
.nenghaofenxibox{
    float: left;
    margin-left: 1%;
    width: 100%;
}
.blockleftcost1{
    margin-top:1%;
}
.right1 {
  display: inline-block;
}
.echartbox{
  margin-top:1%;
  width:30%;
  height:800px;
  float: left;
 
}
.yongdianlianfenxi{
  width:100%;
  height:40%;
  margin-top:1%;
}
.bingzhuangtu{
  width:100%;
  height:35%;
  margin-top:1%;

}
.nenghaofenxiTable{
    width: 60%;
    float: left;
    margin-left: 5%;
    margin-top: 1%;
}
.fengyeanniu{
     margin-top:1%;
     margin-left:35%;
}
.tablebtn{
    margin-bottom:1%; 
}

</style>
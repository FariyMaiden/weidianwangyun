
<!-- <template> -->
<!-- 能源看板 -->
  <!-- <div class="bigbigbox">
    <div class="bigbox1" :style="{height:addheight}">
    
      <div class="leftbox1" :style="{height:addheight}">
        <div id="fuheecharts"></div>
        <div class="zhijiao1"></div>
        <div id="jianfengecharts"></div>
        <div id="xiansunecharts"></div>
      </div>

      <div id="centerbox" :style="{height:addheight}">
    
<div class="linebox">
          <div class="line"></div>

          <h1 class="dianadd">当前总电量</h1>
          <div class="dianaddnum"><h2>8598.83</h2></div>
          <div class="dianadddan">kWh</div>
          <div class="line"></div>

          <div>
            <img src="../assets/centermap.png" alt="这是一张图片" id="centermap">
          </div>

          <div class="yunweibox">
            <h1>运行预警:</h1>
            <h2>抄表成功数：</h2>
            <h3>电表：49/50 水表：29/30</h3>
            <h2>故障设备：2台;</h2>
            <h3>电表编号：B-53847;水表编号：#846543</h3>
          </div>
        </div>
      </div>

      <div id="rightbox" :style="{height:addheight}">
        <div id="quyudianliangecharts"></div>
        <div class="shuidianbi">
          <div class="dianbi" id="dianbi"></div>
          <div class="shuibi" id="shuibi"></div>
        </div>

        <div class="haoshuiliang" id="haoshuiliang"></div>
      </div>
    </div>
  </div> -->
<!-- </template> -->

<!-- <script>
import echarts from "echarts";
import "../resources/echartTheme";
export default {
  data() {
    return {
      addheight: '',//屏幕的高度

      quyudianliangechartdata:{
        quyuname:[],
        quyuriqi:[]
      },//区域用电能耗统计（用能结构能耗统计）
      series:[

      ],//区域用电能耗统计表格数据

      loucengyongdianshujuname:[],
      loucengyongdianshuju:[],//楼层用电能耗对比

      loucengyongShuiLiangshuju:[],//楼层用水量占比

      jianfengeChartsDate:{
        date:[],
        zong:[],
        jian:[],
        feng:[],
        ping:[],
        gu:[]
      },//尖峰平谷图的数据

      shuiData:{
        date:[],
        yongshuiliang:[]
      }

    };
  },
  created() {
    console.log(window.localStorage.getItem("sumheight"));
    //  this.addheight = screen.height - screen.height / 3.57 + "px";
    //  this.addheight = screen.height - screen.height / 5.57 + "px";
    this.addheight = screen.height - screen.height / 8.57 + "px";
    //  this.addheight = screen.height + "px";


  },
  mounted() {
    
  //   //用水量对比饼状图
    this.$axios({
      method:'GET',
      url:this.api.baseUrl + this.api.reportpreMonthWater,
      type:'json'
    }).then(response=>{
      if(response.data.success === true){
        console.log(response);  
        
        for(let key in response.data.data){
           let loucengyongShuishujuObj = {}        
            loucengyongShuishujuObj.name = key;
            loucengyongShuishujuObj.value = response.data.data[key];
            this.loucengyongShuiLiangshuju.push(loucengyongShuishujuObj);
        }
 
        console.log(this.loucengyongShuiLiangshuju);
         this.shuibi();
      }
    }).catch(err=>{
      console.log(err)
    })

  

  //     //用电量饼状图
    this.$axios({
      method:'GET',
      url:this.api.baseUrl +this.api.reportpreMonthEnergy,
      type:'json'
    }).then(response=>{
      if(response.data.success === true){
        console.log(response);
       
        for(let key in response.data.data){
           let loucengyongdianshujuObj = {}
            this.loucengyongdianshujuname.push(key);
            loucengyongdianshujuObj.name = key;
            loucengyongdianshujuObj.value = response.data.data[key];
            this.loucengyongdianshuju.push(loucengyongdianshujuObj);
        }
        console.log(this.loucengyongdianshuju);
         this.dianbi();

      }
    }).catch(err=>{
      console.log(err)
    })
    
    //获取最近七天用水量
       this.$axios({
      method:'GET',
      url:this.api.baseUrl +this.api.reportCompanyWater,
      type:'json'
    }).then(response=>{
      console.log(response)
      if(response.data.success === true){
        for(let i = 0; i<response.data.data.length;i++){
          this.shuiData.date.push(response.data.data[i].reportDate);
          this.shuiData.yongshuiliang.push(response.data.data[i].dayData)
        }
         this.haoshuiliang();
      }
    }).catch(err=>{
      console.log(err)
    })

      //获取尖峰平谷总用电量最近七天
      this.$axios({
      method:'GET',
      url:this.api.baseUrl +this.api.reportEnergy,
      type:'json'
    }).then(response=>{
      console.log(response)
      if(response.data.success === true){
      let jianfengObj = response.data.data 
    
         for(let i = 0 ; i < jianfengObj.总.length; i++){
            this.jianfengeChartsDate.date.push(jianfengObj.总[i].reportDate)
            this.jianfengeChartsDate.zong.push(jianfengObj.总[i].reportData)      
            this.jianfengeChartsDate.jian.push(jianfengObj.尖[i].reportData)
            this.jianfengeChartsDate.feng.push(jianfengObj.峰[i].reportData)
            this.jianfengeChartsDate.ping.push(jianfengObj.平[i].reportData)
            this.jianfengeChartsDate.gu.push(jianfengObj.谷[i].reportData)
         }
         console.log(this.jianfengeChartsDate)
          this.jianfengecharts();
  
      }
    }).catch(err=>{
      console.log(err)
    });

    
  //获取最近七天用能结构用电量
  this.$axios({
    methodL:'GET',
    url:this.api.baseUrl + this.api.reportorgEnergy,
    type:'json'
  }).then(response=>{
    console.log(response)
    if(response.data.success === true){

    for(let key in response.data.data){   
      this.quyudianliangechartdata.quyuname.push(key)     
      let series = {
      name:'',
       type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: false,
                position: "insideRight"
              }
            },
        data :[]
    };
    series.name = key;
    series.data = [];
    this.quyudianliangechartdata.quyuriqi = []
    for(let i = 0; i < response.data.data[key].length; i++){
       this.quyudianliangechartdata.quyuriqi.push(response.data.data[key][i].reportDate)
      series.data.push(response.data.data[key][i].reportData)
      
    }
    this.series.push(series) ;
      
    }
     console.log(this.series)
     console.log(this.quyudianliangechartdata.quyuriqi)
     console.log(this.quyudianliangechartdata.quyuname)

      this.quyudianliangecharts();
    }
  }).catch(err=>{
    console.log(err)
  });

    this.fuheecharts();
    this.xiansunecharts();   
   
  },
  methods: {
    haoshuiliang() {
      let haoshuiliangdom = document.getElementById("haoshuiliang");
      let myChart = this.$echarts.init(haoshuiliangdom, "westeros");
      window.addEventListener("resize", () => {
        myChart.resize();
})
      var category = [];
      var dottedBase = +new Date();
      var lineData = [];
      var barData = [];

      for (var i = 0; i < 7; i++) {
        var date = new Date((dottedBase += 3600 * 24 * 1000));
        category.push(
          [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("-")
        );
        var b = Math.random() * 200;
        var d = Math.random() * 200;
        barData.push(b);
        lineData.push(d + b);
      }

      myChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: ["耗水量"],
          textStyle: {
            color: "#ccc"
          }
        },
        xAxis: {
           data: this.shuiData.date,
          axisLine: {
            lineStyle: {
              color: "#ccc"
            }
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          name:'/吨',
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              color: "#ccc"
            }
          },
          splitLine: {
            show: false
          }
        },
        series: [
        
          {
            name: "耗水量",
            type: "bar",
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#14c8d4" },
                  { offset: 1, color: "#43eec6" }
                ])
              }
            },
             data:  this.shuiData.yongshuiliang
           
          },
      
        ]
      });
   
    },
    shuibi() {
      let shuibidom = document.getElementById("shuibi");
      let myChart = this.$echarts.init(shuibidom, "westeros");
      window.addEventListener("resize", () => {
        myChart.resize();
})
      
      myChart.setOption({
        title: {
          text: "12月用水量占比",
          left: "center",
          top: 20,
          textStyle: {
            color: "#60a3c3",
            fontSize: "70px"
          }
        },

        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: "用水量占比",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],

            data: this.loucengyongShuiLiangshuju.sort(function(a, b) {
              return a.value - b.value;
            }),
             

            roseType: "radius",
            label: {
              normal: {
                textStyle: {
                  color: "rgba(255, 255, 255, 0.3)",
                  fontSize: "40px"
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: "rgba(255, 255, 255, 0.3)"
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              }
            },
            itemStyle: {
              normal: {
                color: "#45b0e8",
                shadowBlur: 400,
                shadowColor: "rgba(0,0,0, 0.5)"
              }
            },

            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function(idx) {
              return Math.random() * 200;
            }
          }
        ]
      });
 
    },
    dianbi() {
      let dianbidom = document.getElementById("dianbi");
      let myChart = this.$echarts.init(dianbidom, "westeros");
      window.addEventListener("resize", () => {
        myChart.resize();
})
     
      myChart.setOption({
        title: {
          text: "电费占比",
          left: "60px",
          top: 20,
          textStyle: {
            color: "#60a3c3",
            fontSize: "70px"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "left",
          data: this.loucengyongdianshujuname,
          textStyle: {
            color: "#60a3c3",
            fontSize: "70px"
          }
        },
        series: [
          {
            name: "电费占比",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "10",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
             data: this.loucengyongdianshuju,
            axisLine: {
              lineStyle: {
                color: "#60a3c3"
              }
            }
          }
        ]
      });
       
    },
    quyudianliangecharts() {
      let quyudianliangechartsdom = document.getElementById(
        "quyudianliangecharts"
      );
      let myChart = this.$echarts.init(quyudianliangechartsdom, "westeros");
      window.addEventListener("resize", () => {
        myChart.resize();
})
    
      myChart.setOption({
       
        title: {
          text: "区域用电",
           top: "20px",
           left: "center",
          textStyle: {
            color: "#60a3c3",
            fontSize: "100px",

          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
           data: this.quyudianliangechartdata.quyuname,
          textStyle: {
            color: "#60a3c3"
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          // name: "/kw",
           name:'/kWh',
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#60a3c3"
            }
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          
          // name: "时间",
          top: "10px",
          type: "category",
           data: this.quyudianliangechartdata.quyuriqi,
          axisLine: {
            lineStyle: {
              color: "#60a3c3"
            }
          },
          splitLine: {
            show: false
          }
        },
         series:this.series
        
      });
  
    },
    xiansunecharts() {
      var base = +new Date(1968, 9, 3);
      var oneDay = 24 * 3600 * 1000;
      var date = [];

      var data = [Math.random() * 300];

      for (var i = 1; i < 20000; i++) {
        var now = new Date((base += oneDay));
        date.push(
          [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/")
        );
        data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
      }
      let xiansundom = document.getElementById("xiansunecharts");
      let myChart = this.$echarts.init(xiansundom, "westeros");
      window.addEventListener("resize", () => {
        myChart.resize();
})
     
      myChart.setOption({
        tooltip: {
          trigger: "axis",
          position: function(pt) {
            return [pt[0], "10%"];
          }
        },
        title: {
          top: "20px",
          left: "center",
          text: "线损",
          textStyle: {
            color: "#60a3c3",
            fontSize: "100px"
          }
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: "none"
            },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
           data:['07-12','07-13','07-14','07-15','07-16','07-17','07-18'],
          axisLine: {
            lineStyle: {
              color: "#60a3c3"
            }
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"],
          axisLine: {
            lineStyle: {
              color: "#60a3c3"
            }
          },
          splitLine: {
            show: false
          }
        },
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 10
          },
          {
            start: 0,
            end: 10,
            handleIcon:
              "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
            handleSize: "80%",
            handleStyle: {
              color: "#fff",
              shadowBlur: 3,
              shadowColor: "rgba(0, 0, 0, 0.6)",
              shadowOffsetX: 2,
              shadowOffsetY: 2
            }
          }
        ],
        series: [
          {
            name: "线损",
            type: "line",
            smooth: true,
            symbol: "none",
            sampling: "average",
            itemStyle: {
              color: "rgb(255, 70, 131)"
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(255, 158, 68)"
                },
                {
                  offset: 1,
                  color: "rgb(255, 70, 131)"
                }
              ])
            },
            //  data: data
            data:['424','234','534','654','633','534','654']          
          }
        ]
      });
      
    },
    jianfengecharts() {

      
      let jianfengdom = document.getElementById("jianfengecharts");
      let myChart = this.$echarts.init(jianfengdom, "westeros");
      window.addEventListener("resize", () => {
        myChart.resize();
})
     
      myChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        title: {
          top: "20px",
          left: "center",
          text: "电量统计",
          textStyle: {
            color: "#60a3c3",
            fontSize: "100px"
          }
        },
        legend: {
          data: ['总电量',"尖电量", "峰电量", "平电量", "谷电量"],
          textStyle: {
            color: "#60a3c3"
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
             data: this.jianfengeChartsDate.date,
            axisLine: {
              lineStyle: {
                color: "#60a3c3"
              }
            },
            splitLine: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            name:'/kWh',
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#60a3c3"
              }
            },
            splitLine: {
              show: false
            }
          }
        ],
        series: [
            {
            name: "总电量",
            type: "bar",
             data: this.jianfengeChartsDate.zong
      
          },

          {
            name: "尖电量",
            type: "bar",
             data: this.jianfengeChartsDate.jian
           
          },
          {
            name: "峰电量",
            type: "bar",
          
             data:  this.jianfengeChartsDate.feng
          },
          {
            name: "平电量",
            type: "bar",
           
             data: this.jianfengeChartsDate.ping
          },
          {
            name: "谷电量",
            type: "bar",
           
             data: this.jianfengeChartsDate.gu
          }
         

        ]
      });
   
      
    },
    fuheecharts() {
      let fuhedom = document.getElementById("fuheecharts");
      let myChart = this.$echarts.init(fuhedom, "westeros");
      window.addEventListener("resize", () => {
        myChart.resize();
})
      // 绘制图表
      myChart.setOption({
        title: {
          text: "5月功率",
          top: "20px",
          left: "center",
          textStyle: {
            color: "#60a3c3",
            fontSize: "100px"
          }
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["电压","电流",'功率'],
          textStyle: {
            color: "#60a3c3"
          }
        },
        grid: {
          left: "1%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          // name: "天",
          type: "category",
          boundaryGap: false,
          data:['07-12','07-13','07-14','07-15','07-16','07-17','07-18'],
          axisLine: {
            lineStyle: {
              color: "#60a3c3"
            }
          }
        },
        yAxis: {
          name: "V/A/kW",
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#60a3c3"
            }
          },
          splitLine: {
            show: false
          }
        },

        series: [
          {
            name: "电压",
            type: "line",
            stack: "总量",
            data: ['220','222','226','229','222','220','226']
          },

          {
            name: "电流",
            type: "line",
            stack: "总量",
            data: ['8','6','5','8','4','5','8']
          },
          {
            name: "功率",
            type: "line",
            stack: "总量",
            data: ['1.76','1.332','1.13','1.832','0.88','1.1','1.808']
          }
        ]
      });
              
    }
  }
};
</script> -->

<!-- <style scope>

.bigbox1 {
 
  background-color: #0c2039;
  float: left;
  width: 100%;
 
}
.leftbox1 {
  width: 30%;
  float: left;
}

#fuheecharts {
  width: 100%;
  height: 30%;
  margin-top: 2%;
  margin-left: 1%;
  background-color: #1c3e6144;
  border-radius: 5%;
}
#jianfengecharts {
  width: 100%;
  height: 30%;
  margin-left: 1%;
}
#xiansunecharts {
  width: 100%;
  height: 30%;
  margin-left: 1%;
  top: 8%;
  background-color: #1c3e6144;
  border-radius: 5%;
}

.zhijiao1 {
  width: 5px;
  height: 5px;
  border-top: 1px solid #4adefa;
  float: left;
  border-right: 1px solid #4adefa;
  margin-top: 7%;
  margin-left: 100%;
}
#centerbox {
  width: 38%;
  float: left; 
}
.center1 {
  color: #7d6257;
  float: left;
  margin-left: 10%;
}
.centerp {
  color: #5492b3;
  float: left;
  margin-left: 20%;
  margin-right: 20%;
  text-align: center;
  text-shadow: 5px 5px 5px black;
}
.center4 {
  color: #7d6257;
  float: left;
  margin-right: 10%;
 
}
.linebox{
  float: left;
  margin-left: 16%;
  margin-top: 3%;
}
.line {

  height: 2px;
  width: 100%;
  float: left;
  background: -webkit-linear-gradient(
    left,
    rgba(255, 255, 255, 0),
    #84c5c0,
    rgba(255, 255, 255, 0)
  );
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0),
    #5dddd3,
    rgba(255, 255, 255, 0)
  );
}
.dianadd {
  color: #5492b3;
  text-align: center;
}
.dianaddnum {
  color: #eda477;
  text-align: center;
}
.dianadddan {
  color: #5492b3;
  text-align: center;
  font-size: 10px;
}
#centermap {
  margin-left: 1%;
}
.yunweibox {
  width: 100%;
  height: 10%;
  background-color: #1c3e6144;
  border: 1px solid #1c3e6144;
  border-radius: 5%;
  color: #eca675;
  font-size: 10px;
  margin-top: 6%;
}

#rightbox {
  width: 30%;
  float: left;
}
#quyudianliangecharts {
  width: 100%;
  height: 30%;
  margin-left: 5%;
  margin-top: 2%;
}
.shuidianbi {
  width: 100%;
  height: 30%;
  margin-left: 5%;
}
.dianbi {
  width: 47%;
  height: 100%;
  background-color: #1c3e6144;
  border-radius: 5%;
  float: left;
  margin-right: 1%;
}
.shuibi {
  width: 52%;
  height: 100%;
  background-color: #1c3e6144;
  border-radius: 5%;
  float: left;
}
.haoshuiliang {
  width: 100%;
  height: 35%;
  margin-left: 5%;
  margin-top: 2%;
}
</style> -->










<!-- 能源看板展示 -->
<template>
  <div class="bigbox">

    <!-- 总耗能、总费用展示盒子 -->
    <div class="zonghaoneng">
      <!-- 绿头（总耗能上半部分） -->
        <div class="zonghaonengHeade" >
          <div style="width:50px;height:50px;backgroundColor:orange;float:left;marginTop: 5px;
    marginLeft: 40px;borderRadius:5%;">
            <h1 style=" float: left;color:white;marginLeft:5px;marginTop:5px">{{zonghaonengData.month}}</h1>
            <h3 style=" float: left;color:white;marginTop:10px">月</h3>
           
          </div>
          <div style="marginLeft:150px;">
              <h3 style=" float: left;color:white;marginTop:30px;">总能耗：</h3>
              <h1 style=" float: left;color:white;marginTop:25px;">{{zonghaonengData.type}}</h1>
              <ul style="marginTop:20px;float:left;marginLeft:10px;color:white">
              <li>较上月{{zonghaonengData.typeRatio}}</li><li>吨标准煤</li></ul>
          </div>
          <div>
              <h3 style=" float: left;color:white;marginTop:30px;marginLeft:50px">总费用：</h3>
              <h1 style=" float: left;color:white;marginTop:25px;">{{zonghaonengData.fee}}</h1>
              <h3 style=" float: left;color:white;marginTop:30px;">元</h3>
              <ul style="marginTop:20px;float:left;marginLeft:10px;color:white"><li>较上月{{zonghaonengData.feeRatio}}</li><li>吨标准煤</li></ul>
          </div>
        
        </div>
        <!-- 总耗能下半部分 -->
        <div class="zonghaonengWei" style="background-color:white;height:120px;">
          <div style=" float:left; marginRight:100px;marginLeft:50px;color:gray;">
             <img src="../assets/电.png"><span style="color:#50c550">较上月{{zonghaonengData.typeRatio1}}</span>
              <div>电：{{zonghaonengData.type1}}kWh</div>
              <div>电费：{{zonghaonengData.fee1}}元</div>
          </div>
           <div style=" float:left; marginRight:100px;color:gray;">
             <img src="../assets/水.png"><span style="color:#50c550">较上月{{zonghaonengData.typeRatio2}}</span>
              <div>水：{{zonghaonengData.type2}}吨</div>
              <div>水费：{{zonghaonengData.fee2}}元</div>
          </div>
           <div style=" float:left;color:gray;">
             <img src="../assets/气.png"><span style="color:#50c550">较上月{{zonghaonengData.typeRatio3}}</span>
              <div >气：{{zonghaonengData.type3}}m<sup>3</sup></div>
              <div>燃气费：{{zonghaonengData.fee3}}元</div>
          </div>
          <div style=" float:left;marginLeft:100px;color:gray;">
              <img src="../assets/总碳排放.png" ><span style="color:#50c550"></span>
               <div>总碳排放：{{zonghaonengData.type4}}t</div>
          </div>
        </div>
    </div>

    <!-- 登录账号信息详情盒子 -->
      <div class="denglvxinxibox">
        
        <h3 style="marginLeft:200px;">{{zhanghaoxinxi.companyName}}</h3>
        
        <ul>
          <li>邮箱：{{zhanghaoxinxi.accNo}}</li>
          <li>地址：{{zhanghaoxinxi.address}}</li>
          <li>电表：{{zhanghaoxinxi.type1}}台</li>
          <li>水表：{{zhanghaoxinxi.type2}}台</li>
          <li>气表：{{zhanghaoxinxi.type3}}台</li>
        </ul>        
      </div>

      
      <!-- 第二行的大盒子（第一行没有大盒子） -->
      <div style="float:left;width:100%;height:350px;">
      <!-- 每月用能情况 -->
      <div class="yongnengqingkuang">
          <h3 style="color:gray;">{{date11}}年每月用能情况</h3>
            <div style="marginLeft:240px;">
              <el-button  circle>电</el-button>
              <el-button  circle>水</el-button>
              <el-button  circle>气</el-button>
            </div>      
          <div id="yongnengqingkuangID"></div>
      </div>

      <!-- 每月用能费用情况 -->
      <div class="yongnengfeiyong">
         <h3 style="color:gray;">{{date11}}年每月用能费用</h3>
         <div id="yongnengfeiyongID"></div>

      </div>

      <!-- 告警事件 -->
      <div class="gaojingshijian">
        <!-- 红头 -->
        <div style="height:70px;width:100%;background-color:red;color:white; float:left">
            <img src="../assets/红灯.png" style="marginTop:17px">
            <h2 style="marginLeft:40px;marginTop: -38px;">1级告警/总告警：1/6</h2>
        </div>
        <!-- 警告详情 -->
          <ul style="float:left;width:70%;float:left">
              <li style="marginTop:7px"><img src="../assets/程序错误灯.png"><span style="color:red">内部程序错误！</span></li>
              <li style="marginTop:7px"><img src="../assets/警告感叹号.png"><span style="color:orange">时钟电池电压低！</span></li>
              <li style="marginTop:7px"><img src="../assets/警告感叹号.png"><span style="color:orange">电流不平衡！</span></li>
              <li style="marginTop:7px"><img src="../assets/警告感叹号.png"><span style="color:orange">辅助电源失电！</span></li>
              <li style="marginTop:7px"><img src="../assets/警告感叹号.png"><span style="color:orange">电压不平衡！</span></li>
          </ul>
          <ul style="float:left;width:28%;float:left">
              <li style="marginTop:20px">7-10&nbsp;13:55</li>
              <li style="marginTop:20px">7-10&nbsp;13:55</li>
              <li style="marginTop:20px">7-10&nbsp;13:55</li>
              <li style="marginTop:20px">7-10&nbsp;13:55</li>
              <li style="marginTop:20px">7-10&nbsp;13:55</li>
          </ul>
      </div>
   </div>

   <!-- 第三行的大盒子 -->
    <div style="float:left;width:100%;height:280px;">
    <!-- 各区域用电情况 -->
      <div class="quyuyongdain">
           <h3 style="color:gray;">{{month}}月各区域用电情况</h3>
           <div id="quyuyongdainID"></div>

      </div>
      <!-- 各时间段用电占比 -->
      <div class="shijianzhanbi">
           <h3 style="color:gray;">{{month}}月各时段用电占比</h3>
           <div id="shijianzhanbiID"></div>

      </div>

      <!-- 电能用途情况 -->
      <div class="diannengyongtu">
           <h3 style="color:gray;">{{month}}月用能用途情况</h3>
           <div id="diannengyongtuID"></div>


      </div>

      <!-- 线损率 -->
      <div class="xiansunlv"> 
           <h3 style="color:gray;">{{month}}月线损率</h3>
           <div id="xiansunlvID"></div>

      </div>

    </div>



  </div>
</template>

<script>
import echarts from "echarts";
import "../resources/echartTheme";

  export default {

    data(){
      return{
        date11:'',//当前年份
        month:'',//上月月份
        yearMonth:'',//当前年份以及上月月份
        //总耗能上半部分
        zonghaonengData:{},//获取到的总耗能数据（15个属性）
       
        // 登录账号详情页面
        zhanghaoxinxi:{},

        // 图表数据
        // 获取当年每月电能能耗统计
        consumption:[],//电量
        reportMonth:[],//日期月份

        // 获取上月尖峰平谷的各自总的数据
        jianfengpinggu:[],

        //  区域用电每月图表数据
        quyuname:[],
        quyuvalue:[],

      }
    },
    created(){
      // 获取绿头和尾数据
      this.getnenghaobiao();
        // 获取当年每月电能能耗统计
        let date1 = new Date;
        this.date11 = String(date1.getFullYear())
        console.log(String(date1.getFullYear()))

        this.month = date1.getMonth();
     

        let date=new Date;
        let year=date.getFullYear(); 
        let month=date.getMonth();
        month =(month<10 ? "-0"+month:'-'+month); 
        let yearMonth = (year.toString()+month.toString());
        console.log(yearMonth)
        this.yearMonth = yearMonth

        // 获取账号信息
        this.$axios({
          method:'GET',
          url:this.api.baseUrl + this.api.reportcompany,
          type:'json'
        }).then(response=>{
          if(response.data.success === true){
            console.log(response.data.data)
            this.zhanghaoxinxi = response.data.data

          }
        }).catch(err=>{
          console.log(err)
        })
        
       
    },
    mounted(){


        //  区域用电每月图表
        this.$axios({
          method:'GET',
          url:this.api.baseUrl + this.api.reportMonthRegion,
          type:'json'
        }).then(response=>{
          if(response.data.success === true){
            console.log(response.data.data);
        for(let key in response.data.data){
            this.quyuname.push(key)
            this.quyuvalue.push(response.data.data[key])
        }

         // 区域用电每月图表
         this.quyuyongdain();

          }
        }).catch(err=>{
          console.log(err)
        })

        // 获取上月尖峰平谷的各自总的数据
           this.$axios({
          method:'GET',
          url:this.api.baseUrl + this.api.reportMonthTypemonth + '/' + this.yearMonth,
          type:'json'
        }).then(response=>{
          if(response.data.success === true){
              console.log(response.data.data)
              console.log(response)
              for(let i = 0; i < response.data.data.length; i++){
                let obj = {}
                obj.value = response.data.data[i].consumption;
                obj.name = response.data.data[i].flag;
                if( obj.name === '1' ){
                  obj.name = '尖'
                }else if(obj.name === '2' ){
                  obj.name = '峰'
                }else if(obj.name === '3' ){
                  obj.name = '平'
                }else if(obj.name === '4' ){
                  obj.name = '谷'
                }
                this.jianfengpinggu.push(obj)
              }
              console.log(this.jianfengpinggu)
              //  时间段用电每月占比图表（尖峰平谷）
              this.shijianzhanbi();
          }
        }).catch(err=>{
        this.$message('获取数据失败~可重新刷新')
        })
    
     
        //  获取用能当年每月情况图表
        this.$axios({
          method:'GET',
          url:this.api.baseUrl + this.api.reportMonthTotalyear +'/'+ this.date11,
          type:'json'
        }).then(response=>{
          if(response.data.success === true){
            console.log(`获取当年每月电能能耗统计：：`+response.data.data)
            console.log(response.data.data)
            for(let i = 0; i < response.data.data.length;i++){
                    this.consumption.push(response.data.data[i].consumption);
                    this.reportMonth.push(response.data.data[i].reportMonth);
            }
             //  用能当年每月情况图表
              this.yongnengqingkuang();
           
          }
        }).catch(err=>{
          this.$message('暂无数据哦~')
        })

     
      //  用能费用当年每月图表
       this.yongnengfeiyong();
     
  
      //  电能用途每月图表
       this.diannengyongtu();
      //  线损率图表
       this.xiansunlv();
    },
    methods:{
      // 绿头和尾数据
      getnenghaobiao(){

        this.$axios({
          method:'GET',
          url:this.api.baseUrl + this.api.reporttotal,
          type:'json'
        }).then(response=>{
          if(response.data.success === true){
               console.log(response)
               this.zonghaonengData = response.data.data
               console.log(response.data.data)
          }
         
        }).catch(err=>{
          console.log(err)
        })

      },
        //  线损率图表
      xiansunlv(){
          let xiansunlvIDdom = document.getElementById("xiansunlvID");
          let myChart = this.$echarts.init(xiansunlvIDdom, "westeros");
         window.addEventListener("resize", () => {
        myChart.resize();
})
           myChart.setOption({
              color:['#516b91'],
              xAxis: {
                  type: 'category',
                  boundaryGap: false,
                  splitLine: {
                    show: false
                  },
                  data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月']
              },
              yAxis: {
                name:'/kWh',
                type: 'value',
                splitLine: {
                    show: false
                  },
              },
              series: [{
                  data: [0.5, 0.6, 0.4, 0.5, 0.2, 0.8, 0.7],
                  type: 'line',
                  areaStyle: {}
              }]
           })
      },
       //  电能用途每月图表
      diannengyongtu(){
          let diannengyongtuIDdom = document.getElementById("diannengyongtuID");
          let myChart = this.$echarts.init(diannengyongtuIDdom, "westeros");
           window.addEventListener("resize", () => {
        myChart.resize();
})
           myChart.setOption({
              color: ['#59c4e6'],
              tooltip : {
                  trigger: 'axis',
                  axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                      type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
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
                      data : ['空调', '电梯', '公共照明'],
                      axisTick: {
                          alignWithLabel: true
                      },
                      splitLine: {
                        show: false
                      },
                  }
              ],
              yAxis : [
               
                  {   
                      name: "/kWh",
                      type : 'value'
              
                  }
              ],
              series : [
                  {
                      name:'区域用电量',
                      type:'bar',
                      barWidth: '60%',
                      data:[ 156, 172, 93]
                  }
              ]

           })


      },
        //  时间段用电每月占比图表(尖峰平谷)
      shijianzhanbi(){
         let shijianzhanbiIDdom = document.getElementById("shijianzhanbiID");
         let myChart = this.$echarts.init(shijianzhanbiIDdom, "westeros");
           window.addEventListener("resize", () => {
        myChart.resize();
})
         myChart.setOption({
            tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'right',
            data: ['尖','峰','平','谷']
        },
        series : [
            {
                name: '时段用电量',
                type: 'pie',
                radius : '55%',
                center: ['50%', '55%'],
                // data:[
                //     {value:335, name:'尖'},
                //     {value:310, name:'峰'},
                //     {value:234, name:'平'},
                //     {value:135, name:'谷'},
                // ],
                data:this.jianfengpinggu,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]

         })


      },

       //  区域用电每月图表
      quyuyongdain(){
          let quyuyongdainIDdom = document.getElementById("quyuyongdainID");
          let myChart = this.$echarts.init(quyuyongdainIDdom, "westeros");
             window.addEventListener("resize", () => {
        myChart.resize();
})
           myChart.setOption({
              color: ['#516b91'],
              tooltip : {
                  trigger: 'axis',
                  axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                      type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
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
                      // data : ['三层', '四层', '五层'],
                      data:this.quyuname,
                      axisTick: {
                          alignWithLabel: true
                      },
                      splitLine: {
                        show: false
                      },
                  }
              ],
              yAxis : [
               
                  {   
                      name: "/kWh",
                      type : 'value'
              
                  }
              ],
              series : [
                  {
                      name:'区域用电量',
                      type:'bar',
                      barWidth: '60%',
                      // data:[ 200, 334, 390]
                      data:this.quyuvalue
                  }
              ]

           })


        },
       //  用能当年每月情况图表
    yongnengqingkuang() {
      let yongnengqingkuangdom = document.getElementById("yongnengqingkuangID");
      let myChart = this.$echarts.init(yongnengqingkuangdom, "westeros");
        window.addEventListener("resize", () => {
        myChart.resize();
})
      myChart.setOption({
    
              color: ['#93b7e3'],
              tooltip : {
                  trigger: 'axis',
                  axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                      type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
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
                     //  data:['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
                      data:this.reportMonth,
                      axisTick: {
                          alignWithLabel: true
                      },
                      splitLine: {
                        show: false
                      },
                  }
              ],
              yAxis : [
               
                  {   
                      name: "/kWh",
                      type : 'value'
              
                  }
              ],
              series : [
                  {
                      name:'每月用能情况',
                      type:'bar',
                      barWidth: '60%',
                       //data:[ 200, 334, 390,478,354,459,456]
                      data:this.consumption
                  }
              ]

           
      });
   
    },
     //  用能费用当年每月图表
    yongnengfeiyong() {
      let yongnengfeiyongIDdom = document.getElementById("yongnengfeiyongID");
      let myChart = this.$echarts.init(yongnengfeiyongIDdom, "westeros");
       window.addEventListener("resize", () => {
        myChart.resize();
})
      // 绘制图表
      myChart.setOption({
        title: {

          top: "20px",
          left: "center",
          textStyle: {
            color: "#60a3c3",
            fontSize: "100px"
          }
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["电","水",'气'],
          textStyle: {
            color: "#60a3c3"
          }
        },
        grid: {
          left: "1%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
       
        xAxis: {
          type: "category",
          boundaryGap: false,
          data:['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
          axisLine: {
            lineStyle: {
              color: "#60a3c3"
            }
          }
        },
        yAxis: {
          name: "/元",
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#60a3c3"
            }
          },
          splitLine: {
            show: false
          }
        },

        series: [
          {
            name: "电",
            type: "line",
            stack: "总量",
            data: ['220','222','226','229','222','220','226']
          },

          {
            name: "水",
            type: "line",
            stack: "总量",
            data: ['86','64','54','84','78','54','85']
          },
          {
            name: "气",
            type: "line",
            stack: "总量",
            data: ['122','145','167','178','167','197','143']
          }
        ]
      });
    }

    }
    
  }
</script>

<style >
.bigbox{
 min-width: 1400px;
 width: 100%;
 margin-left: 10px;
}
.zonghaoneng{
  height: 200px;
  width: 55%;
  /* border:2px solid #50c550;  */
  border: 2px solid #59c4e6;
  float: left;

}
.zonghaonengHeade{
  height: 80px;
  /* background-color: #50c550; */
  background-color: #59c4e6;
}
.denglvxinxibox{
  float: left;
  width: 35%;
  height: 202px;
  background: white;
  border-radius:2%; 
  margin-left: 30px;

}
ul{
  list-style: none;
}
.denglvxinxibox>ul>li{
  margin:7px;
  margin-left:20px
}
.yongnengqingkuang{
  height: 86%;
  width: 35%;
  background-color: white;
  border-radius:2%;
   margin-top:15px;
  float: left;
}
#yongnengqingkuangID {
  width: 90%;
  height: 75%;
  margin-left: 5%;
  margin-top: 2%;
}
.yongnengfeiyong{
  height: 300px;
  width: 35%;
  background-color: white;
  border-radius:2%;
  margin-top:15px;
  float: left;
  margin-left:20px; 
}
#yongnengfeiyongID{
  width: 90%;
  height: 250px;
  margin-left: 5%;
  margin-top: 2%;
}
.gaojingshijian{
  height: 300px;
  width: 20%;
  background-color: white;
  border-radius:2%;
  margin-top:15px;
  float: left;
  margin-left:20px; 
}
.quyuyongdain,.shijianzhanbi,.diannengyongtu,.xiansunlv{
  height: 300px;
  width: 22%;
  background-color: white;
  border-radius:2%;
  margin-top:-15px;
  float: left;
  margin-right: 25px;
}
#quyuyongdainID,#shijianzhanbiID,#diannengyongtuID,#xiansunlvID{
  width: 90%;
  height: 250px;
  margin-left: 5%;
  margin-top: 2%;
}



</style>

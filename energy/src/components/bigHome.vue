
<template>
<!-- 首页数据展示 -->
  <div class="bigbigbox" style="min-width: 1500px;">
    <div class="bigbox1" :style="{height:addheight}">
    
      <div class="leftbox1" :style="{height:addheight}">
        <span style="color:white" @click="backWord()">&nbsp;&nbsp;《《个人工作台</span>
        <div id="fuheecharts"></div>
        <div class="zhijiao1"></div>
        <div id="jianfengecharts"></div>
         <div class="shuidianbi">
          <div class="dianbi" id="dianbi"></div>
          <div class="shuibi" id="shuibi"></div>
        </div>

        <!-- <div id="xiansunecharts"></div> -->
      </div>

      <div id="centerbox" :style="{height:addheight}">
        <!-- <div class="centerboxtime">时间：2019/6/4&nbsp;18:50 &nbsp;温度：27</div> -->
        <!-- <div class="centerheadbox"> -->
          <!-- <h1 class="center1">《</h1> -->
          <!-- <h2 class="centerp">安全运行:1289天</h2> -->
          <!-- <h1 class="center4">》</h1> -->
<!-- </div> -->
    <div class="linebox">
          <div class="line"></div>

          <h1 class="dianadd">当前总电量</h1>
          <div class="dianaddnum"><h2>8598.83</h2></div>
          <div class="dianadddan">kWh</div>
          <div class="line"></div>

          <div>
            <img src="../assets/中国地图2.png" alt="这是一张图片" id="centermap" style="height:500px;marginTop:30px">
          </div>

        
          <!-- <div class="yunweibox"> -->
             
            <!-- <h1>运行预警:</h1>
            <h2>抄表成功数：</h2>
            <h3>电表：49/50 水表：29/30</h3>
            <h2>故障设备：2台;</h2>
            <h3>电表编号：B-53847;水表编号：#846543</h3> -->
          <!-- </div> -->         
        </div>

        <div  class="haoshuiliang" id="haoshuiliang"></div>

      </div>

      <div id="rightbox" :style="{height:addheight}">
      
        <div id="quyudianliangecharts"> </div>
        <!-- <div class="shuidianbi">
          <div class="dianbi" id="dianbi"></div>
          <div class="shuibi" id="shuibi"></div>
        </div> -->
        <div id="xiansunecharts"></div>
        <!-- <div class="haoshuiliang" id="haoshuiliang"></div> -->
        <div class="yunweibox">
             <h1>运行预警:</h1>
            <h2>抄表成功数：</h2>
            <h3>电表：49/50 水表：29/30</h3>
            <h2>故障设备：2台;</h2>
            <h3>电表编号：B-53847;水表编号：#846543</h3>
        </div>
       
      </div>
    </div>
  </div>
</template>

<script>
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
    this.addheight = screen.height - screen.height / 9.7 + "px";
    //  this.addheight = screen.height + "px";


  },
  mounted() {
        let loucengyongShuishujuObj1 = {name:'三楼',value:'300'}  ;
        let loucengyongShuishujuObj2 = {name:'四楼',value:'250'}   
        let loucengyongShuishujuObj3 = {name:'五楼',value:'200'}  
        this.loucengyongShuiLiangshuju.push(loucengyongShuishujuObj1);
        this.loucengyongShuiLiangshuju.push(loucengyongShuishujuObj2);
        this.loucengyongShuiLiangshuju.push(loucengyongShuishujuObj3);
       

    
  //   //用水量对比饼状图
  //   this.$axios({
  //     method:'GET',
  //     url:this.api.baseUrl + this.api.reportpreMonthWater,
  //     type:'json'
  //   }).then(response=>{
  //     if(response.data.success === true){
  //       console.log(response);  
        
  //       // for(let key in response.data.data){
  //       //    let loucengyongShuishujuObj = {}        
  //       //     loucengyongShuishujuObj.name = key2;
  //       //     loucengyongShuishujuObj.value = response.data.data[key];
  //       //     this.loucengyongShuiLiangshuju.push(loucengyongShuishujuObj);
  //       // }
  //       let loucengyongShuishujuObj1 = {name:'三楼',value:'300'}  ;
  //       let loucengyongShuishujuObj2 = {name:'四楼',value:'250'}   
  //       let loucengyongShuishujuObj3 = {name:'五楼',value:'200'}  
  //       this.loucengyongShuiLiangshuju.push(loucengyongShuishujuObj1);
  //       this.loucengyongShuiLiangshuju.push(loucengyongShuishujuObj2);
  //       this.loucengyongShuiLiangshuju.push(loucengyongShuishujuObj3);
       
 
  //       console.log(this.loucengyongShuiLiangshuju);
  //        this.shuibi();
  //     }
  //   }).catch(err=>{
  //     console.log(err)
  //   })

  

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
    
  //   //获取最近七天用水量
  //   this.$axios({
  //     method:'GET',
  //     url:this.api.baseUrl +this.api.reportCompanyWater,
  //     type:'json'
  //   }).then(response=>{
  //     console.log(response)
  //     if(response.data.success === true){
  //       for(let i = 0; i<response.data.data.length;i++){
  //         this.shuiData.date.push(response.data.data[i].reportDate);
  //         this.shuiData.yongshuiliang.push(response.data.data[i].dayData)
  //       }
  //        this.haoshuiliang();
  //     }
  //   }).catch(err=>{
  //     console.log(err)
  //   })

  //     //获取尖峰平谷总用电量最近七天
  //     this.$axios({
  //     method:'GET',
  //     url:this.api.baseUrl +this.api.reportEnergy,
  //     type:'json'
  //   }).then(response=>{
  //     console.log(response)
  //     if(response.data.success === true){
  //     let jianfengObj = response.data.data 
    
  //        for(let i = 0 ; i < jianfengObj.总.length; i++){
  //           this.jianfengeChartsDate.date.push(jianfengObj.总[i].reportDate)
  //           this.jianfengeChartsDate.zong.push(jianfengObj.总[i].reportData)      
  //           this.jianfengeChartsDate.jian.push(jianfengObj.尖[i].reportData)
  //           this.jianfengeChartsDate.feng.push(jianfengObj.峰[i].reportData)
  //           this.jianfengeChartsDate.ping.push(jianfengObj.平[i].reportData)
  //           this.jianfengeChartsDate.gu.push(jianfengObj.谷[i].reportData)
  //        }
  //        console.log(this.jianfengeChartsDate)
  //         this.jianfengecharts();
  
  //     }
  //   }).catch(err=>{
  //     console.log(err)
  //   });

    
  // //获取最近七天用能结构用电量
  // this.$axios({
  //   methodL:'GET',
  //   url:this.api.baseUrl + this.api.reportorgEnergy,
  //   type:'json'
  // }).then(response=>{
  //   console.log(response)
  //   if(response.data.success === true){

  //   for(let key in response.data.data){   
  //     this.quyudianliangechartdata.quyuname.push(key)     
  //     let series = {
  //     name:'',
  //      type: "bar",
  //           stack: "总量",
  //           label: {
  //             normal: {
  //               show: false,
  //               position: "insideRight"
  //             }
  //           },
  //       data :[]
  //   };
  //   series.name = key;
  //   series.data = [];
  //   this.quyudianliangechartdata.quyuriqi = []
  //   for(let i = 0; i < response.data.data[key].length; i++){
  //      this.quyudianliangechartdata.quyuriqi.push(response.data.data[key][i].reportDate)
  //     series.data.push(response.data.data[key][i].reportData)
      
  //   }
  //   this.series.push(series) ;
      
  //   }
  //    console.log(this.series)
  //    console.log(this.quyudianliangechartdata.quyuriqi)
  //    console.log(this.quyudianliangechartdata.quyuname)

  //     this.quyudianliangecharts();
  //   }
  // }).catch(err=>{
  //   console.log(err)
  // });

    this.fuheecharts();
    this.xiansunecharts();

    this.quyudianliangecharts();
    this.jianfengecharts();
    this.haoshuiliang();
    this.dianbi();
    this.shuibi();

   
   

  },
  methods: {
      //返回个人工作台
      backWord(){
          this.$router.push('/nengyuanxitong')

      },
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
          // data: this.shuiData.date,
          data:['07-12','07-13','07-14','07-15','07-16','07-17','07-18'],
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
            // data:  this.shuiData.yongshuiliang
            data:['58','45','50','67','59','56','76']
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
          text: "重要能耗",
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
          // data: this.quyudianliangechartdata.quyuname,
            data:['电梯','空调','公共照明'],
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
          // data: this.quyudianliangechartdata.quyuriqi,
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
         //series:this.series
         series: [
        {
            name: '电梯',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: [320, 302, 301, 334, 390, 330, 320]
        },
        {
            name: '空调',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: '公共照明',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: [220, 182, 191, 234, 290, 330, 310]
        },
      
    ]
        
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
          // data: date,
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
            // data: this.jianfengeChartsDate.date,
            data:['07-12','07-13','07-14','07-15','07-16','07-17','07-18'],
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
            // data: this.jianfengeChartsDate.zong
           data:['600','550','500','467','578','566','590']
          },

          {
            name: "尖电量",
            type: "bar",
            // data: this.jianfengeChartsDate.jian
            data:['340','390','378','290','367','320','343']
          },
          {
            name: "峰电量",
            type: "bar",
            data:['123','134','145','147','167','189','122']
            // data:  this.jianfengeChartsDate.feng
          },
          {
            name: "平电量",
            type: "bar",
            data:['80','50','60','70','90','66','77']
            // data: this.jianfengeChartsDate.ping
          },
          {
            name: "谷电量",
            type: "bar",
            data:['23','33','22','33','22','44','37']
            // data: this.jianfengeChartsDate.gu
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
</script>

<style scope>

.bigbox1 {
  /* background-color: #112d45; */
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
  margin-left: 5%;
  /* top: 8%; */
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
  margin-right: 4%;
  margin-left: -5%;
  
  /* margin-left: 2%; */
}
/* .centerboxtime {
  color: #eca675;
  text-align: center;
  margin-top: 1%;
  text-shadow: 5px 5px 5px black;
} */

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
  margin-left: 5%;
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
  margin-top: 8%;
  margin-left: 1%;

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
  margin-left: 15%;
  margin-top: 2%;
}
</style>

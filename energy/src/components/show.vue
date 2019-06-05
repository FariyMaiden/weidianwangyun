<template>
  <div>
    <div class="bigbox" :style="{height:addheight}">
      <div class="leftbox" :style="{height:addheight}">
        <div id="fuheecharts"></div>
        <div class="zhijiao1"></div>
        <div id="jianfengecharts"></div>
        <div id="xiansunecharts"></div>
      </div>

      <div id="centerbox" :style="{height:addheight}">
        <div class="centerboxtime">时间：2019/6/4&nbsp;18:50 &nbsp;温度：27</div>
        <div class="centerheadbox">
          <h1 class="center1">《</h1>
          <h2 class="centerp">安全运行:1289天</h2>
          <h1 class="center4">》</h1>

          <div class="line"></div>

          <div class="dianadd">年度电源消耗总量</div>
          <h2 class="dianaddnum">1234_56</h2>
          <div class="dianadddan">万kWh</div>
          <div class="line"></div>

          <div>
            <img src="../assets/centermap.png" alt="这是一张图片" id="centermap">
          </div>

          <div class="yunweibox">
            <p>运行预警:</p>
            <p>抄表成功数：电表：49/50 水表：29/30</p>
            <p>故障设备：2 电表：id1234;水表：id2345;</p>
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
  </div>
</template>

<script>
import echarts from "echarts";
import "../Resources/EchartTheme";
export default {
  data() {
    return {
      addheight: ""
    };
  },
  created() {
    console.log(window.localStorage.getItem("sumheight"));
    this.addheight = screen.height - screen.height / 3.57 + "px";
  },
  mounted() {
    this.fuheecharts();
    this.jianfengecharts();
    this.xiansunecharts();
    this.quyudianliangecharts();
    this.dianbi();
    this.shuibi();
    this.haoshuiliang();
  },
  methods: {
    haoshuiliang() {
      let haoshuiliangdom = document.getElementById("haoshuiliang");
      let myChart = this.$echarts.init(haoshuiliangdom, "westeros");
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
          data: ["耗水量", "天然气"],
          textStyle: {
            color: "#ccc"
          }
        },
        xAxis: {
          data: ["05-29", "05-28", "05-27", "05-26", "05-25", "05-24", "05-23"],
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
            name: "line",
            type: "line",
            smooth: true,
            showAllSymbol: true,
            symbol: "emptyCircle",
            symbolSize: 15,
            data: lineData
          },
          {
            name: "bar",
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
            data: barData
          },
          {
            name: "耗水量",
            type: "bar",
            barGap: "-100%",
            barWidth: 10,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "rgba(20,200,212,0.5)" },
                  { offset: 0.2, color: "rgba(20,200,212,0.2)" },
                  { offset: 1, color: "rgba(20,200,212,0)" }
                ])
              }
            },
            z: -12,
            data: lineData
          },
          {
            name: "天然气",
            type: "pictorialBar",
            symbol: "rect",
            itemStyle: {
              normal: {
                color: "#0f375f"
              }
            },
            symbolRepeat: true,
            symbolSize: [12, 4],
            symbolMargin: 1,
            z: -10,
            data: lineData
          }
        ]
      });
    },
    shuibi() {
      let shuibidom = document.getElementById("shuibi");
      let myChart = this.$echarts.init(shuibidom, "westeros");
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

            data: [
              { value: 335, name: "三楼" },
              { value: 310, name: "四楼" },
              { value: 274, name: "五楼" }
            ].sort(function(a, b) {
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
      myChart.setOption({
        title: {
          text: "用电占比&电费占比",
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
          data: ["三楼", "四楼", "五楼"],
          textStyle: {
            color: "#60a3c3",
            fontSize: "70px"
          }
        },
        series: [
          {
            name: "用电占比&电费占比",
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
            data: [
              { value: 845, name: "三楼" },
              { value: 594, name: "四楼" },
              { value: 234, name: "五楼" }
            ],
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

      myChart.setOption({
        title: {
          text: "能耗统计",
          textStyle: {
            color: "#60a3c3",
            fontSize: "100px"
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
          data: ["走廊", "办公室", "会议室", "其它"],
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
          name: "/kw",

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
          name: "时间",
          top: "10px",
          type: "category",
          data: ["05-23", "05-24", "05-25", "05-26", "05-27", "05-28", "05-29"],
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
            name: "走廊",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "insideRight"
              }
            },
            data: [320, 302, 301, 334, 390, 330, 367]
          },
          {
            name: "办公室",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "insideRight"
              }
            },
            data: [120, 132, 101, 134, 90, 230, 343]
          },
          {
            name: "会议室",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "insideRight"
              }
            },
            data: [220, 182, 191, 234, 290, 330, 436]
          },
          {
            name: "其它",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "insideRight"
              }
            },
            data: [150, 212, 201, 154, 190, 330, 142]
          }
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
          data: date,
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
            data: data
          }
        ]
      });
    },
    jianfengecharts() {
      let jianfengdom = document.getElementById("jianfengecharts");
      let myChart = this.$echarts.init(jianfengdom, "westeros");
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
          data: ["尖电量", "峰电量", "平电量", "谷电量"],
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
            data: [
              "05-23",
              "05-24",
              "05-25",
              "05-26",
              "05-27",
              "05-28",
              "05-29"
            ],
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
            name: "尖电量",
            type: "bar",
            data: [320, 332, 301, 334, 304, 345, 389]
          },
          {
            name: "峰电量",
            type: "bar",

            data: [245, 256, 278, 234, 298, 289, 277]
          },
          {
            name: "平电量",
            type: "bar",

            data: [178, 182, 191, 124, 145, 178, 194]
          },
          {
            name: "谷电量",
            type: "bar",

            data: [45, 67, 89, 34, 23, 54, 68]
          }
        ]
      });
    },
    fuheecharts() {
      let fuhedom = document.getElementById("fuheecharts");
      let myChart = this.$echarts.init(fuhedom, "westeros");
      // 绘制图表
      myChart.setOption({
        title: {
          text: "5月负荷",
          textStyle: {
            color: "#60a3c3",
            fontSize: "100px"
          }
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["电压", "电流", "负荷"],
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
          name: "近七天",
          type: "category",
          boundaryGap: false,
          data: ["23", "24", "25", "26", "27", "28", "29"],
          axisLine: {
            lineStyle: {
              color: "#60a3c3"
            }
          }
        },
        yAxis: {
          name: "/kw",
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
            data: [120, 132, 101, 134, 90, 230, 210]
          },

          {
            name: "电流",
            type: "line",
            stack: "总量",
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "负荷",
            type: "line",
            stack: "总量",
            data: [500, 760, 680, 902, 609, 750, 630]
          }
        ]
      });
    }
  }
};
</script>

<style scoped>
.bigbox {
  /* background-color: #112d45; */
  background-color: #0c2039;
  float: left;
  width: 100%;
}
.leftbox {
  width: 30%;
  float: left;
}

#fuheecharts {
  width: 100%;
  height: 30%;
  margin-top: 1%;
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
  width: 35%;
  float: left;
  margin-left: 2%;
}
.centerboxtime {
  color: #eca675;
  text-align: center;
  margin-top: 1%;
  text-shadow: 5px 5px 5px black;
}

.center1 {
  color: #7d6257;
  float: left;
  margin-left: 2%;
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
  margin-left: 2%;
}
.yunweibox {
  width: 100%;
  height: 10%;
  background-color: #1c3e6144;
  border: 1px solid #1c3e6144;
  border-radius: 5%;
  color: #eca675;
  font-size: 10px;
}

#rightbox {
  width: 30%;
  float: left;
}
#quyudianliangecharts {
  width: 100%;
  height: 30%;
  margin-left: 5%;
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
</style>

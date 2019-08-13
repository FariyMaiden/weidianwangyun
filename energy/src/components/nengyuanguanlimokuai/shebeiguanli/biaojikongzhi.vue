<!-- 表计抄读 -->
<template>
	<div>
		<!-- 表计标签选择 -->
		<el-tabs v-model="activeName" @tab-click="meterSelect">
		    <el-tab-pane label="电表" name="first"></el-tab-pane>
		    <el-tab-pane label="水表" name="second"></el-tab-pane>
		    <el-tab-pane label="气表" name="third"></el-tab-pane>
		    <el-tab-pane label="热表" name="fourth"></el-tab-pane>
		</el-tabs>
		 <div>
    <div class="condition">
      <div class="right">
        <div @click="CtrlEMRelayStatu('1')">
          <i class="el-icon-edit-outline"></i>
          <span>拉闸</span>
        </div>
        <div @click="CtrlEMRelayStatu('2')">
          <i class="el-icon-edit-outline"></i>
          <span>合闸</span>
        </div>
        <div @click="CtrlEMRelayStatu('3')">
          <i class="el-icon-edit-outline"></i>
          <span>报警</span>
        </div>
        <div @click="CtrlEMRelayStatu('4')">
          <i class="el-icon-edit-outline"></i>
          <span>取消报警</span>
        </div>
        <div @click="CtrlEMRelayStatu('5')">
          <i class="el-icon-edit-outline"></i>
          <span>保电</span>
        </div>
        <div @click="CtrlEMRelayStatu('6')">
          <i class="el-icon-edit-outline"></i>
          <span>取消保电</span>
        </div>
        <!-- 			<div @click="ReadEMCurrentPara('1')">
					<i class="el-icon-edit-outline"></i>
					<span>读电量</span>
				</div>
				<div @click="ReadEMCurrentPara('2')">
					<i class="el-icon-edit-outline"></i>
					<span>读金额</span>
        </div>-->
        <div @click="ReadEMCurrentPara('3')">
          <i class="el-icon-edit-outline"></i>
          <span>读状态</span>
        </div>
      </div>
    </div>
    <el-table
   
      ref="multipleTable"
      :data="showTableData"
      :header-cell-class-name="tableheaderClassName"
      :cell-class-name="tableCellName"
      :header-cell-style="getRowClass"
      stripe
     
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="30"></el-table-column>

      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item
              v-for="(item,index) in tableHead"
              v-if="index > 8"
              :label="item.label"
              :key="index"
            >
              <span>{{ props.row[item.id] }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        v-for="(item,index) in tableHead"
        v-if='index <= 8'
        :label="item.label"
        :prop="item.id"
        :key="index"
      ></el-table-column>
    </el-table>

    <div class="block pagination">
      <!-- <span class="demonstration">显示总数</span> -->
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="total, prev, pager, next,jumper"
        :total="partOfTableData.length"
      ></el-pagination>
    </div>
  </div>

	</div>
</template>
<script>
export default{
	data(){
		return{
			showIf:true,//隐藏页面
            activeName:'first',
             showIf: true, //隐藏页面

      loading: false, //菊花

      tableHead: [
        {
          label: "序号",
          id: "index"
          // width:50
        },
        {
          label: "表地址",
          id: "MeterAddr"
        },
        {
          label: "房间信息",
          id: "HouseName"
        },
        {
          label: "安装地址",
          id: "InstallAddr"
        },
        {
          label: "倍率",
          id: "CT"
        },
        {
          label: "当前电量",
          id: "CurrentPower"
        },
        {
          label: "剩余金额",
          id: "RemainMoney"
        },
        {
          label: "余额状态",
          id: "BalanceStatu"
        },
        {
          label: "阀控状态",
          id: "RelayStatu"
        },
        {
          label: "读取电量时间",
          id: "CurrentPowerTime"
        },
        {
          label: "读取金额时间",
          id: "RemainMoneyTime"
        },
        {
          label: "读取金额状态时间",
          id: "BalanceStatuTime"
        },
        {
          label: "读取阀控状态时间",
          id: "RunStatusTime"
        },
        {
          label: "费率1电价",
          id: "R1"
        },
        {
          label: "费率2电价",
          id: "R2"
        },
        {
          label: "费率3电价",
          id: "R3"
        },
        {
          label: "费率4电价",
          id: "R4"
        },
        {
          label: "网关地址",
          id: "LogicAddr"
        }
      ],
      tableData: [],

      partOfTableData: [],

      showTableData: [{
          index:'1',
          MeterAddr:'010000000248',
          HouseName:'会议室',
          InstallAddr:'',
          CT:'1',
          CurrentPower:'3233',
          RemainMoney:'344',
          BalanceStatu:'正常',
          RelayStatu:'保电',
          CurrentPowerTime:'2019-06-24 00:22:00',
          RemainMoneyTime:'2019-06-24 00:22:00',
          BalanceStatuTime:'2019-06-24 00:22:00',
          RunStatusTime:'2019-06-24 00:22:00',
          R1:'1.3100',
          R2:'1.3100',
          R3:'1.3100',
          R4:'1.3100',
          LogicAddr:'90400483'

      },
     
       {
            BalanceStatu: "报警",
            BalanceStatuTime: "2019-06-24 18:38:02",
            CT: "1",
            CurrentPower: "3913.36",
            CurrentPowerTime: "2019-06-24 00:23:00",
            FifthRegionCode: "0301001001005",
            FifthRegionName: "",
            HouseName: "航天大厦",
            HouseRegionCode: "0301001001005025",
            HouseRegionName: "四楼",
            InstallAddr: "",
            LogicAddr: "90400483",
            MeterAddr: "010000000368",
            R1: "0.0000",
            R2: "0.0000",
            R3: "0.0000",
            R4: "0.0000",
            RelayStatu: "保电",
            RemainMoney: "0.00",
            RemainMoneyTime: "2019-06-24 00:23:00",
            RunStatusTime: "2019-06-14 17:12:19",
            index: "2"
      },
       {
            BalanceStatu: "报警",
            BalanceStatuTime: "2019-06-24 18:38:02",
            CT: "1",
            CurrentPower: "3913.36",
            CurrentPowerTime: "2019-06-24 00:23:00",
            FifthRegionCode: "0301001001005",
            FifthRegionName: "",
            HouseName: "航天大厦",
            HouseRegionCode: "0301001001005025",
            HouseRegionName: "四楼",
            InstallAddr: "",
            LogicAddr: "90400483",
            MeterAddr: "010000000368",
            R1: "0.0000",
            R2: "0.0000",
            R3: "0.0000",
            R4: "0.0000",
            RelayStatu: "保电",
            RemainMoney: "0.00",
            RemainMoneyTime: "2019-06-24 00:23:00",
            RunStatusTime: "2019-06-14 17:12:19",
            index: "2"
      },],


      currentPage: 1, //当前页数

      selectionData: [],

      requestCount: 0 //多个表读状态的时候进行的计数
		}
  },


	methods:{
		  /**
     *为表格的各部分命名
     */
    tableheaderClassName({ row, rowIndex }) {
      return "table-head-th";
    },

    tableCellName({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 7) {
        var money = this.showTableData[rowIndex][column.property];
        if (parseFloat(money) < 0) {
          return "error";
        } else {
          return "normal";
        }
      }

      if (columnIndex == 8) {
        var status = this.showTableData[rowIndex][column.property];
        if (status == "报警") {
          return "warning";
        } else if (status == "透支") {
          return "error";
        } else {
          return "normal";
        }
      }
      if (columnIndex == 9) {
        var status = this.showTableData[rowIndex][column.property];
        if (status == "跳闸") {
          return "error";
        } else {
          return "normal";
        }
      }
    },

    /**
     *分页控制器的方法
     */
    handleCurrentChange(val) {
      this.showTableData = this.partOfTableData.slice((val - 1) * 10, val * 10);
    },

    /**
     *表格选中的行发生改变
     */
    handleSelectionChange(val) {
      this.selectionData = val;

      // if (val.length > 2 || (val.length == 2 && this.tableData.length ==2)) {
      // 	alert('不能全选')
      // 	this.$refs.multipleTable.clearSelection();
      // 	return
      // }

      // if (val.length == 2 && this.tableData.length !=2) {
      // 	this.$refs.multipleTable.clearSelection();
      // 	this.$refs.multipleTable.toggleRowSelection(val[1]);

      // 	this.selectionData = val[1]

      // 	return
      // }

      // this.selectionData = val[0]
    },
    //更改表头颜色
            getRowClass({ row, column, rowIndex, columnIndex }) {
                if (rowIndex == 0) {
                        return 'background:#EFEFEF'
                } else {
                        return ''
                }
            },

    /**
     *查询表计状态（非实时，实时操作需要点抄）
     *全部
     */
    qureyMeterCurrentStatusByRegionCode() {
      this.loading = true;

      var params = {
        UserId: window.sessionStorage.getItem("id"),
        RegionCode: window.sessionStorage.getItem("RegionCode"),
        MeterKindId: "1",
        time: this.dataUtil.formatTime1(new Date())
      };

      var encryptParams = {
        evalue: this.$encrypt(JSON.stringify(params))
      };

      // console.log(this.$encrypt(JSON.stringify(params)))

      this.http
        .post(
          this.api.baseUrl + this.api.QureyMeterCurrentStatusByRegionCode,
          encryptParams
        )
        .then(result => {
          this.loading = false;
          // var result= JSON.parse(res.data.replace(/<[^>]+>/g, "").replace(/[' '\r\n]/g, ""))
          // console.log('表计信息')
          //  console.log(result)
          if (result.status == "成功") {
            this.tableData = result.data;
            this.partOfTableData = this.tableData;
            //	console.log(this.partOfTableData)
            this.showTableData = this.tableData.slice(0, 10);
            this.currentPage = 1;
          } else {
            this.$message({
              showClose: true,
              message: result.data,
              type: "error"
            });
          }
        });
    },

    /**
     *读取当前值
     *UserId             微信openid
     *HouseRegionCode    房间编号
     *ctrlType           指令类型：1当前电量，2剩余金额，3当前状态
     */
    ReadEMCurrentPara(type) {
      var that = this;
      if (this.selectionData.length == 0) {
        this.$message({
          type: "warning",
          message: "请选择表!"
        });
        return;
      }

      // var count = 0 //计数器

      // var timer = setInterval(function(){
      // 	if (count < that.selectionData.length) {
      // 		that.readEM(that.selectionData[count],type)
      // 		count ++
      // 	}else {
      // 		clearInterval(timer)
      // 	}
      // },500)

      this.loading = true;

      var selectData = this.selectionData[this.requestCount];
      //	console.log(selectData)
      var housename = selectData.HouseName;

      var params = {
        UserId: window.sessionStorage.getItem("id"),

        HouseRegionCode: JSON.stringify(selectData),
        ctrlType: type,
        time: this.dataUtil.formatTime1(new Date())
      };

      //  console.log(params);

      var encryptParams = {
        evalue: this.$encrypt(JSON.stringify(params))
      };

      // console.log(this.$encrypt(JSON.stringify(params)))

      this.http
        .post(this.api.baseUrl + this.api.ReadEMCurrentPara, encryptParams)
        .then(result => {
          // 	console.log(result)

          if (this.requestCount < this.selectionData.length - 1) {
            this.requestCount++;
            this.ReadEMCurrentPara(3);
          } else {
            this.loading = false;
          }
          if (result.status == "成功") {
            this.resetData(this.tableData, result.data);
            this.resetData(this.showTableData, result.data);
            this.resetData(this.partOfTableData, result.data);

            this.$notify({
              title: housename,
              message: "读取成功",
              type: "success"
            });
          } else {
            this.$notify({
              title: housename,
              message: result.data,
              type: "error"
            });
          }
        });
    },

    /**
     *读取当前值
     *UserId             微信openid
     *HouseRegionCode    房间编号
     *ctrlType           指令类型：1当前电量，2剩余金额，3当前状态
     */
    //   	readEM(selectData,type){
    //   		this.loading = true
    //   		var housename =  selectData.HouseName
    //   		var params = {
    //             UserId :window.sessionStorage.getItem('id'),
    //        		// HouseRegionCode:this.selectionData.HouseRegionCode,
    //        		HouseRegionCode:JSON.stringify(selectData),
    //        		ctrlType:type,
    //        		time:this.dataUtil.formatTime1(new Date())
    //           }

    //           console.log(params);

    //           var encryptParams = {
    //             evalue:this.$encrypt(JSON.stringify(params))
    //           }

    //           console.log(this.$encrypt(JSON.stringify(params)))

    //           this.http.post(this.api.baseUrl+this.api.ReadEMCurrentPara,encryptParams)
    //           .then(result=>{
    //             this.loading = false
    //             console.log(result)
    //             if (result.status == '成功') {

    //             	this.resetData(this.tableData,result.data)
    //    				this.resetData(this.showTableData,result.data)
    //    				this.resetData(this.partOfTableData,result.data)

    //                  this.$notify({
    // 		          	title: housename,
    // 		          	message: '读取成功',
    // 		          	type: 'success'
    // 		          })

    //             }else{

    //               	this.$notify({
    // 		          title: housename,
    // 		          message: result.data,
    // 		          type: 'error'
    // 		       })
    //             }

    //           })
    // },
    /**
     *费控接口 用于电表拉合闸、报警、保电
     *UserId             用户号
     *HouseRegionCode    房间编号
     *ctrlType           指令类型：1拉闸，2合闸，3报警，4报警解除，5保电，6保电解除
     */
    CtrlEMRelayStatu(code) {
      if (this.selectionData.length != 1) {
        this.$message({
          type: "warning",
          message: "该操作只能选择有且只有一个选项"
        });
        return;
      }

      this.loading = true;

      // this.selectionData.HouseRegionCode = '0101001002004005'

      var params = {
        UserId: window.sessionStorage.getItem("id"),
        // HouseRegionCode:this.selectionData.HouseRegionCode,
        HouseRegionCode: JSON.stringify(this.selectionData[0]),
        ctrlType: code,
        time: this.dataUtil.formatTime1(new Date())
      };

      console.log(params);

      var encryptParams = {
        evalue: this.$encrypt(JSON.stringify(params))
      };

      console.log(this.$encrypt(JSON.stringify(params)));

      this.http
        .post(this.api.baseUrl + this.api.CtrlEMRelayStatu, encryptParams)
        .then(result => {
          this.loading = false;
          console.log(result);
          if (result.status == "成功") {
            this.resetData(this.tableData, result.data);
            this.resetData(this.showTableData, result.data);
            this.resetData(this.partOfTableData, result.data);
            this.$message({
              type: "success",
              message: "操作成功!"
            });
          } else {
            this.$message({
              type: "error",
              message: result.data
            });
          }
        });
    },

    /**
     *数据源条件筛选
     */
    filterTableData(node) {
      if (window.sessionStorage.getItem("menuName") == "MeterReadAndSet") {
        if (node.level == "4") {
          //	console.log(node.code)
          this.partOfTableData = this.tableData;
        } else if (node.level == "5") {
          this.partOfTableData = this.tableData.filter(element => {
            return element.FifthRegionCode == node.code;
          });
        } else if (node.level == "6") {
          this.partOfTableData = this.tableData.filter(element => {
            return element.HouseRegionCode == node.code;
          });
        } else if (node.level == "GW") {
          this.partOfTableData = this.tableData.filter(element => {
            return element.LogicAddr == node.label;
          });
        }

        for (var i = 0; i < this.partOfTableData.length; i++) {
          this.partOfTableData[i].index = (i + 1).toString();
        }

        this.showTableData = this.partOfTableData.slice(0, 10);
      }
    },

    /**
     *读完状态之后修改某一条记录
     */
    resetData(arr, obj) {
      arr.forEach((element, index) => {
        if (element.MeterAddr == obj.MeterAddr) {
          arr[index].CurrentPower = obj.CurrentPower;
          arr[index].RemainMoney = obj.RemainMoney;
          arr[index].BalanceStatu = obj.BalanceStatu;
          arr[index].RelayStatu = obj.RelayStatu;
          arr[index].CurrentPowerTime = obj.CurrentPowerTime;
          arr[index].RemainMoneyTime = obj.RemainMoneyTime;
          arr[index].BalanceStatuTime = obj.BalanceStatuTime;
          arr[index].RunStatusTime = obj.RunStatusTime;

          return;
        }
      });
    }
  },

  computed: {
    treeNode() {
      return this.$store.state.clickTreeData;
    }
  },
  watch: {
    treeNode(newVal) {
      this.filterTableData(newVal);
    }
  },

  mounted() {
    var that = this;
    this.loading = true;
    setTimeout(function() {
      that.qureyMeterCurrentStatusByRegionCode();
    }, 2000);
  
	}
}
</script>
<style>
.right {
  float: right;
  
}

.right div {
  /* margin-left: 20px; */
  font-size: 14px;
  cursor: pointer;
  display: inline-block;
 
}

.condition {
  overflow: hidden;
}

.el-table {
  margin-top: 10px;
 
}
.el-table eltable el-table--fit el-table--striped el-table--enable-row-hover{
    width:100%;
}


</style>


<!--财务对账  -->
<template>
  <div class="caiwuduizhangbigbox">
    <div class="condition">
      <div class="block left cost">
        <!-- <el-date-picker
          v-model="startDate"
          type="date"
          placeholder="开始日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>-->
        <!-- <span>至</span> -->
        <!-- <el-date-picker v-model="endDate" type="date" placeholder="结束日期" value-format="yyyy-MM-dd"></el-date-picker> -->
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
      </div>
      <el-button type="primary" @click="QureyTransactionFile(code)">查询</el-button>

      <div class="right">
        <el-select v-model.lazy="name1" placeholder="交易方式" clearable @change="selectChange">
          <el-option
            v-for="item in tradeStyle"
            v-if="tradeStyle.length > 0 && item!=''"
            :label="item"
            :value="item"
            :key="item.index"
          ></el-option>
        </el-select>
        <el-select v-model.lazy="name2" placeholder="审核状态" clearable @change="selectChange">
          <el-option
            v-for="item in AuditState"
            v-if="AuditState.length > 0 && item!='' "
            :label="item"
            :value="item"
            :key="item.index"
          ></el-option>-->
        </el-select>
        <el-select v-model.lazy="name3" placeholder="交易类型" clearable @change="selectChange">
          <el-option
            v-for="item in tradeType"
            v-if="tradeType.length > 0 && item!='' "
            :label="item"
            :value="item"
            :key="item.index"
          ></el-option>
        </el-select>
        <el-button type="primary" @click="tableToExcel()">导出表格</el-button>
      </div>
    </div>
    <el-table
      :data="showTableData"
      :header-cell-class-name="tableheaderClassName"
      :cell-class-name="tableCellName"
      style="width: 100%;margin-left:1%"
    >
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
        v-if="index <= 8"
        :label="item.label"
        :prop="item.id"
        :width="item.width"
        :key="index"
      ></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.AuditState == '未审核' "
            @click="AuditTransaction(scope.row)"
            type="text"
            size="small"
          >审核</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align:center;font-size:16px;margin-top:20px">
      <span style="margin-right:60px">实收：{{this.totalMoney}}元</span>
      <span style="margin-right:60px">充值/开户：{{this.predictMoney}}元</span>
      <span style="margin-right:60px">退费：{{this.moveMoney}}元</span>
      <span style="margin-right:20px">补助：{{this.helpMoney}}元</span>
    </div>
    <div class="block pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="total, prev, pager, next,jumper"
        :total="partOfTableData.length"
      ></el-pagination>
    </div>
  </div>
</template>
 <script>
export default {
  data() {
    return {
     
     
      startDate: null,
      endDate: null,
      currentPage: 1,
      code: window.sessionStorage.getItem("RegionCode"),
      name1: "", //交易方式
      name2: "", //审核状态
      name3: "", //交易类型

      tableData: [], //所有数据源
      areaTableData: [], //通过楼层筛选过后的数据
      partOfTableData: [], //通过条件筛选过后的数据
      showTableData: [], //显示的数据
      tableHead: [
        // {
        //   label: "序号",
        //   id: "index",
        //   width: 50
        // },
        {
          label: "房间信息",
          id: "FifthHouseRegionName",
          width: 150
        },
        {
          label: "交易类型",
          id: "TransactionType"
        },
        {
          label: "交易金额",
          id: "TransactionAmount"
        },
        {
          label: "交易路径",
          id: "TransactionMode"
        },
        {
          label: "交易方式",
          id: "TransactionMethod"
        },
        {
          label: "交易时间",
          id: "TransactionTime",
          width: 180
        },
        {
          label: "交易状态",
          id: "OprtState"
        },
        {
          label: "审核状态",
          id: "AuditState"
        },
        {
          label: "表地址",
          id: "MeterAddr"
        },
        {
          label: "备注信息",
          id: "Memo"
        },
        {
          label: "交易单号",
          id: "TransactionOrder"
        },
        {
          label: "第三方订单号",
          id: "OtherTransactionOrder"
        },
        {
          label: "审核人",
          id: "AuditorName"
        },
        {
          label: "审核时间",
          id: "AuditTime"
        }
      ]
    };
  },


  methods: {
    tableToExcel() {
      //列标题
      let str =
        "<tr><td>表地址</td><td>五级区域代码</td><td>六级区域代码</td><td>房间信息</td><td>交易订单号</td><td>四级区域代码</td><td>交易类型</td><td>交易金额</td><td>交易路径</td><td>交易方式</td><td>区域名称</td><td>交易时间</td><td> </td><td>交易状态</td><td>审核状态</td></tr>";
      //循环遍历，每行加入tr标签，每个单元格加td标签
      for (let i = 0; i < this.tableData.length; i++) {
        str += "<tr>";
        for (let item in this.tableData[i]) {
          //增加\t为了不让表格显示科学计数法或者其他格式
          str += `<td>${this.tableData[i][item] + "\t"}</td>`;
        }
        str += "</tr>";
      }
      //Worksheet名
      let worksheet = "Sheet1";
      let uri = "data:application/vnd.ms-excel;base64,";

      //下载的表格模板数据
      let template = `<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:x="urn:schemas-microsoft-com:office:excel"
      xmlns="http://www.w3.org/TR/REC-html40">
      <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
        <x:Name>${worksheet}</x:Name>
        <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
        </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
        </head><body><table>${str}</table></body></html>`;
      //下载模板
      window.location.href = uri + this.base64(template);
    },
    //输出base64编码
    base64(s) {
      return window.btoa(unescape(encodeURIComponent(s)));
    },

    /**
     *为表格的各部分命名
     */
    tableheaderClassName({ row, rowIndex }) {
      return "table-head-th";
    },

    tableCellName({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 9) {
        var status = this.showTableData[rowIndex][column.property];
        if (status == "未审核") {
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
      //	console.log(`当前页: ${val}`);
      this.showTableData = this.partOfTableData.slice((val - 1) * 10, val * 10);
    },

    /**
     *查询财务信息
     */
    QureyTransactionFile(code) {
      // 将选择事项置空
      this.name1 = "";
      this.name2 = "";
      this.name3 = "";

      if (this.startDate > this.endDate) {
        this.$message({
          type: "warning",
          message: "请确保时间范围的正确"
        });
        return;
      }

      this.loading = true;
      var params = {
        RegionCode: code,
        UserId: window.sessionStorage.getItem("id"),
        TimeStart: this.dataUtil.formatTime1(this.startDate),
        TimeEnd: this.dataUtil.formatTime1(this.endDate),
        time: this.dataUtil.formatTime1(new Date())
      };

      console.log(params);

      var encryptParams = {
        evalue: this.$encrypt(JSON.stringify(params))
      };

      console.log(this.$encrypt(JSON.stringify(params)));

      this.http
        .post(this.api.baseUrl + this.api.QureyTransactionFile, encryptParams)
        .then(result => {
          this.loading = false;
          console.log(result);
          if (result.status == "成功") {
            this.$message({
              type: "success",
              message: "查询成功!"
            });

            this.tableData = result.data;
            for (let j = 0; j < this.tableData.length; j++) {
              delete this.tableData[j].index;
            }
            this.areaTableData = this.tableData.slice(0);
            this.partOfTableData = this.areaTableData.slice(0);
            this.showTableData = this.partOfTableData.slice(0, 10);

            //console.log(this.showTableData);
          } else {
            this.$message({
              type: "error",
              message: result.data
            });
          }
        });
    },

    //       	/**
    //       	*审核订单
    //       	*/
    AuditTransaction(row) {
      //	console.log(row)

      // this.loading = true

      var params = {
        TransactionOrder: row.TransactionOrder,
        UserId: window.sessionStorage.getItem("id"),
        time: this.dataUtil.formatTime1(new Date())
      };

      //  console.log(params);

      var encryptParams = {
        evalue: this.$encrypt(JSON.stringify(params))
      };

      //  console.log(this.$encrypt(JSON.stringify(params)))

      this.http
        .post(this.api.baseUrl + this.api.AuditTransaction, encryptParams)
        .then(result => {
          this.loading = false;
          //  console.log(result)
          if (result.status == "成功") {
            this.$message({
              type: "success",
              message: "审核成功!"
            });

            this.resetData(this.showTableData, row.TransactionOrder);
            this.resetData(this.partOfTableData, row.TransactionOrder);
            this.resetData(this.areaTableData, row.TransactionOrder);
            this.resetData(this.tableData, row.TransactionOrder);
          } else {
            this.$message({
              type: "error",
              message: result.data
            });
          }
        });
    },

    selectChange() {
      console.log("change");
      // 深赋值一个数组
      var temp = this.areaTableData.slice(0);

      if (this.name1 != "") {
        temp = temp.filter(element => {
          return element.TransactionMethod == this.name1;
        });
      }

      if (this.name2 != "") {
        temp = temp.filter(element => {
          return element.AuditState == this.name2;
        });
      }

      if (this.name3 != "") {
        temp = temp.filter(element => {
          return element.TransactionType == this.name3;
        });
      }

      this.partOfTableData = temp.slice(0);

      for (var i = 0; i < this.partOfTableData.length; i++) {
        this.partOfTableData[i].index = (i + 1).toString();
      }

      this.showTableData = this.partOfTableData.slice(0, 10);
    },

    // 筛选数据
    filterTableData(node) {
      if (
        window.sessionStorage.getItem("menuName") == "AccoundReconciliation"
      ) {
        if (node.level == "4") {
          this.areaTableData = this.tableData;
        } else if (node.level == "5") {
          this.areaTableData = this.tableData.filter(element => {
            return element.FifthRegionCode == node.code;
          });
        } else if (node.level == "6") {
          this.areaTableData = this.tableData.filter(element => {
            return element.HouseRegionCode == node.code;
          });
        }

        this.partOfTableData = this.areaTableData.slice(0);

        for (var i = 0; i < this.partOfTableData.length; i++) {
          this.partOfTableData[i].index = (i + 1).toString();
        }

        this.showTableData = this.partOfTableData.slice(0, 10);
      }
    },

    // 审核成功后，改变数据源
    resetData(arr, TransactionOrder) {
      arr.forEach((element, index) => {
        if (element.TransactionOrder == TransactionOrder) {
          arr[index].AuditState = "已审核";
          return;
        }
      });
    }
  },

  computed: {
    treeNode() {
      return this.$store.state.clickTreeData;
    },

    // 合计的
    totalMoney() {
      return this.predictMoney - this.moveMoney - this.helpMoney;
    },
    // 预存
    predictMoney() {
      var money = 0;
      this.partOfTableData.forEach(element => {
        if (
          element.TransactionType == "充值" ||
          element.TransactionType == "开户"
        ) {
          money += parseInt(element.TransactionAmount);
        }
      });

      return money;
    },
    // 退费的
    moveMoney() {
      var money = 0;
      this.partOfTableData.forEach(element => {
        if (
          element.TransactionType == "异常退费" ||
          element.TransactionType == "销户退费"
        ) {
          money += parseInt(element.TransactionAmount);
        }
      });

      return money;
    },
    // 补助
    helpMoney() {
      var money = 0;
      this.partOfTableData.forEach(element => {
        if (element.TransactionMethod == "补助") {
          money += parseInt(element.TransactionAmount);
        }
      });

      return money;
    },
    // 交易类型
    tradeType() {
      var result = [];
      for (var i = 0; i < this.areaTableData.length; i++) {
        if (result.indexOf(this.areaTableData[i].TransactionType) == -1) {
          result.push(this.areaTableData[i].TransactionType);
        }
      }
      return result;
    },
    // 交易方式
    tradeStyle() {
      var result = [];
      for (var i = 0; i < this.areaTableData.length; i++) {
        if (result.indexOf(this.areaTableData[i].TransactionMethod) == -1) {
          result.push(this.areaTableData[i].TransactionMethod);
        }
      }
      return result;
    },
    // 审核状态
    AuditState() {
      var result = [];
      for (var i = 0; i < this.areaTableData.length; i++) {
        if (result.indexOf(this.areaTableData[i].AuditState) == -1) {
          result.push(this.areaTableData[i].AuditState);
        }
      }
      return result;
    }
  },
  watch: {
    treeNode(newVal) {
      this.filterTableData(newVal);
    }
  },
  mounted() {
    var date = new Date();

    this.startDate = new Date(date.getTime() - 2 * 24 * 60 * 60 * 1000);

    this.endDate = new Date();

    this.loading = true;
    setTimeout(() => {
      this.QureyTransactionFile(this.code);
    }, 2000);
  }
};
</script>
<style scoped>
.caiwuduizhangbigbox{
    float: left;
    width: 100%;
}
.right {
  display: inline-block;
}

.left {
  float: left;
  margin-right: 20px;
}
.el-table {
  margin-top: 10px;
}
.condition {
  overflow: hidden;
  margin-top: 1%;
  margin-left: 1%;
} 
.el-select {
  width: 130px;
}
</style>



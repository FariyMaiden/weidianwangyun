<!-- 月度结算报表 -->
<template>
  <div class="jiesuanbaobiaobigbox">
    <div class="condition">
      <!-- <el-button type="primary" class="right">导出表格</el-button> -->
      <el-button type="primary" class="right" v-print="'#printTest'">导出表格</el-button>
    </div>

    <div id="printTest">
      <el-table
        id="table"
        :data="showTableData"
        :header-cell-class-name="tableheaderClassName"
        :cell-class-name="tableCellName"
        style="width: 100%;margin-left:1%"
      >
        <!-- 		    <el-table-column type="expand">
		      <template slot-scope="props">
		        <el-form label-position="left" inline class="demo-table-expand" >
		          <el-form-item  v-for="(item,index) in tableHead" v-if="index > 8" :label="item.label" >
		            <span>{{ props.row[item.id] }}</span>
		          </el-form-item>

		        </el-form>
		      </template>
        </el-table-column>-->
        <el-table-column
          v-for="(item,index) in tableHead"
          :label="item.label"
          :prop="item.id"
          :width="item.width"
          :key="index"
        ></el-table-column>
      </el-table>
    </div>

    <div class="block pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="total, prev, pager, next,jumper"
        :total="tableData.length"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showIf: true, //隐藏页面
      loading: false, //转圈
      currentPage: 1, //当前页面
      tableData: [
        {
          index: "1",
          room: 'B104',
          name: "云机房",
          phone: "15627285171",
          fee: "123",
          last: "21",
          now: "12"
        }
      ], //数据源
      partOfTableData: [], //部分数据源
      showTableData: [], //显示数据
      tableHead: [
        {
          label: "序号",
          id: "index",
         
        },
        {
          label: "房间",
          id: "room"
        },
        {
          label: "用户名",
          id: "name"
        },
        {
          label: "电话",
          id: "phone"
        },
        {
          label: "上月电量",
          id: "last"
        },
        {
          label: "本月电量",
          id: "now"
        },
        {
          label: "电费(元)",
          id: "fee"
        }
      ]
    };
  },
  // 提示用户没有操作此权限的功能，不显示页面
  created() {
    if (window.sessionStorage.getItem("id") === "中塔大中") {
      this.showIf = false;
      window.alert("您没有操作此功能的权限~");
    }
  },

  methods: {
    /**
     *为表格的各部分命名
     */
    tableheaderClassName({ row, rowIndex }) {
      return "table-head-th";
    },

    tableCellName({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 6) {
        return "normal";
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
     *打印
     */
    doPrint() {
      var table_print = document.getElementById("table");
      var newstr = table_print.innerHTML;
      var oldstr = document.body.innerHTML;
      document.body.innerHTML = newstr;
      window.print();
      // document.body.innerHTML = oldstr
      window.location.reload();

      // return false
    }
  },
  mounted() {
    this.partOfTableData = this.tableData;
    this.showTableData = this.partOfTableData.slice(0, 10);
  }
};
</script>

<style scoped>
.jiesuanbaobiaobigbox{
    float: left;
    width: 100%;
}
.right {
  display: inline-block;

  /* float: right; */
}
.el-table {
  margin-top: 10px;
}
.condition {
  overflow: hidden;
 
  margin-top: 1%;
}
</style>















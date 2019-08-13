<!-- 系统管理=》用户登陆日志查看 -->
<template>
	<div class="denglvrizhibigbox">

		<div class="condition">

			<div class="block left ">
			    <el-date-picker
			      v-model="startDate"
			      type="datetime"
			      placeholder="开始日期"
			      format='yyyy-MM-dd HH:mm:ss'>
			    </el-date-picker>

			    <span>至</span>

			    <el-date-picker
			      v-model="endDate"
			      type="datetime"
			      placeholder="结束日期"
			      format='yyyy-MM-dd HH:mm:ss'>
			    </el-date-picker>
	  		</div>
			<el-button type="primary" @click='QueryLoginInfo()'>查询</el-button>
		</div>

		<el-table
	    :data="showTableData"
	    :header-cell-class-name="tableheaderClassName"
		:cell-class-name='tableCellName'
		:header-cell-style="getRowClass"
	    style="width: 100%;margin-left:1%">

	    <el-table-column
	      v-for="(item,index) in tableHead"
	      :label="item.label"
	      :prop="item.id"
	      :width="item.width"
	     :key="index" >
	    </el-table-column>


	  </el-table>

	  <div class="block pagination">
	    <el-pagination
	      @current-change="handleCurrentChange"
	      :current-page.sync="currentPage"
	      :page-size="10"
	      layout="total, prev, pager, next,jumper"
	      :total="partOfTableData.length">
	    </el-pagination>
  	  </div>
	</div>
</template>
<script>
export default{
	data(){
		return{

    
		
			currentPage:1,
			startDate:'',
			endDate:'',
			tableHead:[
			{
				label:'序号',
				id:'index',
				
			},
			{
				label:'用户号',
				id:'UserId'
			},
			{
				label:'登录时间',
				id:'LoginTime'
			},
			{
				label:'IP地址',
				id:'Memo'
			}],
			tableData:[],
			partOfTableData:[],
			showTableData:[{
                index:'1',
                UserId:'212',
                LoginTime:'2019-6-25',
                Memo:'1442343'

            },
            {
                index:'2',
                UserId:'43464',
                LoginTime:'2019-6-25',
                Memo:'13664643'

            }],

		}
  },

	methods:{
		/**
		*为表格的各部分命名
		*/
		 tableheaderClassName({ row, rowIndex }) {
          return "table-head-th";
        },

        tableCellName({row, column, rowIndex, columnIndex}){
			if (columnIndex == 4) {
				return 'normal'
			}else if (columnIndex == 5) {
				return 'error'
			}
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
		*分页控制器的方法
		*/
      	handleCurrentChange(val) {
        //	console.log(`当前页: ${val}`);
        	this.showTableData = this.partOfTableData.slice((val-1)*10, val *10)
      	},

      	/**
      	*查询登录日志
      	*/
      	QueryLoginInfo(){
      		if (this.startDate > this.endDate) {
				this.$message({
                  type: 'warning',
                  message: '请确保时间范围的正确'
               });
				return
			}

      		this.loading = true
      		var params = {
      			UserId:window.sessionStorage.getItem('id'),
      			TimeStart:this.dataUtil.formatTime1(this.startDate),
      			TimeEnd:this.dataUtil.formatTime1(this.endDate),
      			time:this.dataUtil.formatTime1(new Date())
      		}

      		 // console.log(params);

	          var encryptParams = {
	            evalue:this.$encrypt(JSON.stringify(params))
	          }

	         // console.log(this.$encrypt(JSON.stringify(params)))

	          this.http.post(this.api.baseUrl+this.api.QueryLoginInfo,encryptParams)
	          .then(result=>{
	            this.loading = false
	          //  console.log(result)
	            if (result.status == '成功') {

	                this.$message({
	                  type: 'success',
	                  message: '查询成功!'
	               });

	                this.tableData = result.data
	                this.partOfTableData = this.tableData.slice(0)
	                this.showTableData = this.partOfTableData.slice(0, 10)

	            }else{

	              this.$message({
	                  type: 'error',
	                  message: result.data
	               });

	            }



	          })
      	}



	},
	mounted(){
		var date = new Date()

		this.startDate = new Date(date.getTime()-2*24*60*60*1000)

		this.endDate = new Date()

		this.loading = true
		setTimeout(()=>{
			this.QueryLoginInfo()
		},2000)
	}
}
</script>
<style scoped>
.denglvrizhibigbox{
    float: left;
    width: 85%;
}
.left{
	float: left;
	margin-right: 20px;
}
.el-table{
	margin-top: 10px;
}
.condition{
	overflow: hidden;
    margin-top: 1%;
}
</style>

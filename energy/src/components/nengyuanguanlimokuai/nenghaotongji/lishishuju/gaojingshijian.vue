<!-- 电表告警事件查看 -->
<template>
	<div class="gaojingshijianbigbox">
		<div class="condition">
			<div class="block left">

				<div class="block left">
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
	  		</div>

	  		<el-button type="primary" style="margin-left:20px;" @click='QureyERStatus'>查询</el-button>
	  		<el-button type="primary" style="margin-left:20px;" @click='QueryERStatusLast'>查询最近一次</el-button>
		</div>


			<el-table
		    :data="showTableData"
		    :header-cell-class-name="tableheaderClassName"
		    :cell-class-name="tableCellName"
		    stripe
		    style="width: 100%;margin-left:1%">


		    <el-table-column type="expand">
		      <template slot-scope="props">
		        <el-form label-position="left" inline class="demo-table-expand" >
		          <el-form-item  v-for="(item,index) in tableHead" v-if="index > 3" :label="item.label" :key="index">
		            <span>{{ props.row[item.id] }};</span>
		          </el-form-item>

		        </el-form>
		      </template>
		    </el-table-column>

		    <el-table-column
		    v-for="(item,index) in tableHead"
		    v-if="index <= 3"
		      :label="item.label"
		      :prop="item.id"
		      :width="item.width"

		      :key="index">
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
			startDate:null,
			endDate:null,
			tableHead:[
			{
				label:'序号',
				id:'index',
				
			},
			{
				label:'房间信息',
				id:'FifthHouseRegionName',
			},
			{
				label:'运行状态',
				id:'ShowStatus'
			},
			{
				label:'抄读时间',
				id:'ReadDataTime'
			},
			{
				label:'表计地址:',
				id:'MeterAddr'
			},
			{
				label:'更新时间:',
				id:'UpdateTime'
			},
			{
				label:'运行状态字:',
				id:'RunStatus'
			}],

			tableData:[],
			partOfTableData:[],
			showTableData:[{
                index:'1',
                FifthHouseRegionName:'走廊',
                ShowStatus:'正常运行',
                ReadDataTime:'2019-06-26',
                MeterAddr:'CB345',
                UpdateTime:'2019-06-28',
                RunStatus:'1'
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
			if (columnIndex == 3) {
				return 'content-left'
			}

		},

        /**
		*分页控制器的方法
		*/
      	handleCurrentChange(val) {
        	this.showTableData = this.partOfTableData.slice((val-1)*10, val *10)
      	},

      	// 查询警告事件
		QureyERStatus(){

			if (this.startDate > this.endDate) {
				this.$message({
                  type: 'warning',
                  message: '请确保时间范围的正确'
               });
				return
			}

			this.loading = true

          var params = {
       		FourthRegionCode:window.sessionStorage.getItem('RegionCode'),
       		TimeStart:this.dataUtil.formatTime1(this.startDate),
       		TimeEnd:this.dataUtil.formatTime1(this.endDate),
       		time:this.dataUtil.formatTime1(new Date())
          }

         // console.log(params);

          var encryptParams = {
            evalue:this.$encrypt(JSON.stringify(params))
          }

         // console.log(this.$encrypt(JSON.stringify(params)))

          this.http.post(this.api.baseUrl+this.api.QureyERStatus,encryptParams)
          .then(result=>{
            this.loading = false
           // console.log(result)
            if (result.status == '成功') {

                this.$message({
                  type: 'success',
                  message: '查询成功!'
               });
                this.tableData = result.data
                this.partOfTableData = this.tableData
                this.showTableData = this.partOfTableData.slice(0, 10)
             //   console.log(this.showTableData[0])

            }else{

              this.$message({
                  type: 'error',
                  message: result.data
               });

            }



          })
		},


		// 查询最近一次
		QueryERStatusLast(){


		this.loading = true

          var params = {
       		FourthRegionCode:window.sessionStorage.getItem('RegionCode'),
       		time:this.dataUtil.formatTime1(new Date())
          }

         // console.log(params);

          var encryptParams = {
            evalue:this.$encrypt(JSON.stringify(params))
          }

         // console.log(this.$encrypt(JSON.stringify(params)))

          this.http.post(this.api.baseUrl+this.api.QueryERStatusLast,encryptParams)
          .then(result=>{
            this.loading = false
          //  console.log(result)
            if (result.status == '成功') {

                this.$message({
                  type: 'success',
                  message: '查询成功!'
               });
                this.tableData = result.data
                this.partOfTableData = this.tableData
                this.showTableData = this.partOfTableData.slice(0, 10)
             //   console.log(this.showTableData[0])

            }else{

              this.$message({
                  type: 'error',
                  message: result.data
               });

            }



          })
		},

		// 筛选数据
		filterTableData(node){
      		if (window.sessionStorage.getItem('menuName') == 'QueryMeterAlarmEvent') {

      			if(node.level == "4"){
      				this.partOfTableData = this.tableData;
      			}else if(node.level == "5"){

      				this.partOfTableData = this.tableData.filter(element=>{
      					return (element.FifthRegionCode == node.code)
      				})
      			}else if(node.level == "6"){
      				this.partOfTableData = this.tableData.filter(element=>{
      					return (element.HouseRegionCode == node.code)
      				})
      			}

      			for (var i = 0; i < this.partOfTableData.length; i++) {
      				this.partOfTableData[i].index = (i+1).toString()
      			}
      			this.showTableData = this.partOfTableData.slice(0, 10)

      		}
      	},

	},

	computed:{
		treeNode(){
			return this.$store.state.clickTreeData
		}
	},
	watch:{
		treeNode(newVal){
			this.filterTableData(newVal)
		}
	},
	mounted(){

		// 记录此页面是日冻结
		window.sessionStorage.setItem('freezingData','day')

		var date = new Date()

		this.startDate = new Date(date.getTime()-2*24*60*60*1000)

		this.endDate = new Date()

		this.loading = true
		setTimeout(()=>{
			this.QureyERStatus()
		}, 2000)


	}
}
</script>
<style>
.gaojingshijianbigbox{
    width: 100%;
    float: left;
}
.condition{
	overflow: hidden;
    margin-top: 1%;
    margin-left:1%
   
}

.left{
	float: left
}

.el-table{
	margin-top: 10px;
}



</style>

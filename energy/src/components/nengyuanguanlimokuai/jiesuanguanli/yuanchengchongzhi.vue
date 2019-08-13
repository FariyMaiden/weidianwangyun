<!-- 远程充值 -->
<template>
	<div class="yuanchengchonghzibigbox">
      <object id="MWRFATL" style="width:0px;height:0px" classid="CLSID:856964B5-F42F-447B-A37D-ED07E8973ED2" codebase="trjCab.CAB#version=1,0,0,1">
     </object>
		<div>
            <el-button type="primary" @click="btn0Click">查询状态</el-button>
            <el-button type="warning" :disabled = "disabled1" @click="btn1Click" >远程开户</el-button>
            <el-button type="warning" :disabled = 'disabled2' @click="btn2Click">远程充值</el-button>
            <el-button type="warning" :disabled = 'disabled3' @click="ReOprtByHouseCode">重写</el-button>
        </div>
        <!-- 读取状态 -->
		<div v-if='show0'>
            <div style="width:500px;margin:30px 0 0 60px">



              <el-form label-width="100px" class="demo-ruleForm" >
                  <div class="title">*用户基本信息</div>
				          <el-form-item label='区域：'>
                    <el-input v-model='FifthRegionName' disabled placeholder='请选择栋数'></el-input>
                  </el-form-item>

                  <el-form-item label='房间：'>

                    <el-input v-model='HouseRegionName' disabled placeholder='请选择房间'></el-input>
                  </el-form-item>
                  <el-form-item label='表号：'>
                    {{CustomerInfo.MeterAddr}}
                  </el-form-item>
                  <el-form-item label='用户：'>
                    {{CustomerInfo.CurrentUser}}
                  </el-form-item>

                   <div class="title">*最近一次操作</div>

					          <el-form-item label='操作：' >
                    	{{LastRecord.Name}}
                  	</el-form-item>

                  	<el-form-item label="金额：">
                      <b style="color:blue">
                        {{LastRecord.Money}}
                      </b>

                  	</el-form-item>

                  	<el-form-item label="时间：">
                    	{{LastRecord.Time}}
                  	</el-form-item>

                    <div class="title">*电表当前数据</div>

                    <div style="display: flex;">
                        <el-form-item label='剩余金额：'>
                          <span :style='style1'>
                            {{CurrentPara.RemainMoney}}
                          </span>

                        </el-form-item>

                        <el-form-item label="余额状态：" >
                          <span :style='style2'>
                            {{CurrentPara.BalanceStatu}}
                          </span>

                        </el-form-item>
                    </div>

                    <div style="display: flex;">
                      <el-form-item label="阀控状态：">
                        <span :style='style3'>
                          {{CurrentPara.RelayStatu}}
                        </span>

                      </el-form-item>
                      <el-form-item label="抄读时间：">
                        {{CurrentPara.RemainMoneyTime}}
                      </el-form-item>
                    </div>


              </el-form>
            <div style="text-align:center">
            	<!-- <el-button type="primary" style="width:120px" @click='QueryEMSTSStatus'>确定</el-button>  -->
            </div>


            </div>
        </div>

         <!-- 远程开户 -->
		<div v-if='show1'>
            <div style="width:500px;margin:100px 0 0 120px">

              <el-form label-width="100px" class="demo-ruleForm" >

				  <el-form-item label='栋数：'>

                    <el-input v-model='FifthRegionName' disabled placeholder='请选择栋数'></el-input>
                  </el-form-item>

                  <el-form-item label='房间：'>

                    <el-input v-model='HouseRegionName' disabled placeholder='请选择房间'></el-input>
                  </el-form-item>

				 <el-form-item label="类型：" >
                    <el-select v-model="type" placeholder="请选择交易类型" clearable style="width:400px;">
                        <el-option v-for="item in TransactionMethod"
                        :label="item.label" :value="item.value" :key="item.index">
                        </el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="金额：" >
                    <el-input  v-model.trim="Amount"></el-input>
                  </el-form-item>

              </el-form>
            <div style="text-align:center">
            	<el-button type="primary" style="width:120px" @click='GetFrameOpenAccountyByHouseCode'>确定开户</el-button>
            </div>


            </div>
        </div>

        <!-- 远程充值 -->
        <div v-if='show2'>
            <div style="width:500px;margin:100px 0 0 120px">

              <el-form label-width="100px" class="demo-ruleForm" >

				  <el-form-item label='栋数：'>

                    <el-input v-model='FifthRegionName' disabled placeholder='请选择栋数'></el-input>
                  </el-form-item>

                  <el-form-item label='房间：'>

                    <el-input v-model='HouseRegionName' disabled placeholder='请选择房间'></el-input>
                  </el-form-item>

				 <el-form-item label="类型：" >
                    <el-select v-model="type" placeholder="请选择交易类型" clearable style="width:400px;">
                        <el-option v-for="item in TransactionMethod"
                        :label="item.label" :value="item.value" :key="item.index">
                        </el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="金额：" >
                    <el-input  v-model.trim="Amount"></el-input>
                  </el-form-item>

              </el-form>
            <div style="text-align:center">
            	<el-button type="primary" style="width:120px" @click='GetFrameRechargeByHouseCode'>确定充值</el-button>
            </div>


            </div>
        </div>

	</div>
</template>

<script>
export default{
	data(){
		return{
			
			FifthRegionName:'',//栋数名
			HouseRegionName:'',//选择的房间名
			HouseRegionCode:'',//选择的房间编号
			CustomerInfo:{
                MeterAddr:'',//表号地址
                CurrentUser:'',//当前用户
            },//请求回来的房间表号信息



		 CurrentPara:{
        RemainMoney:'',//剩余金额
        BalanceStatu:'',//余额状态
        RelayStatu:'',//阀控状态
        RemainMoneyTime:'',//抄读时间
     },//电表当前数据

			LastRecord:{
				Name:'',
				Money:'',
				Time:'',
			},//最后的操作数据

			disabled1:true,//开户按钮
			disabled2:true,//充值按钮
			disabled3:true,//重写按钮


			show0:true,//读取状态界面
			show1:false,//开户界面
			show2:false,//充值界面

      style1:'',//样式
      style2:'',
      style3:'',


			// 交易方式
			TransactionMethod:[
            {
                label:'现金',
                value:'0'
            },
            {
                label:'微信',
                value:'1'
            },
            {
                label:'支付宝',
                value:'2'
            },
            {
                label:'银联',
                value:'3'
            },
            {
                label:'补助',
                value:'4'
            },
            {
                label:'支票',
                value:'5'
            },
            {
                label:'其他',
                value:'9'
            },],//交易方式

            type:'',//交易方式的值
            Amount:0,//充值金额

		}
	},
	methods:{

		// 查看用户状态（类似卡验证）
		QueryEMSTSStatus(){

      if (!this.linkMachine()) {
        this.$message({
          type: 'warning',
          message: '没有连接读卡机'
        });

        return
      }


			 // 网络请求
        this.loading = true

        var params = {
            UserId:window.sessionStorage.getItem('id'),
            RegionCode:window.sessionStorage.getItem('RegionCode'),
            HouseRegionCode:this.HouseRegionCode,
            time:this.dataUtil.formatTime1(new Date())
        }

         // console.log(JSON.stringify(params));

          var encryptParams = {
            evalue:this.$encrypt(JSON.stringify(params))
          }

        //  console.log(this.$encrypt(JSON.stringify(params)))

          this.http.post(this.api.baseUrl+this.api.QueryEMSTSStatus,encryptParams)
          .then(result=>{
          	this.loading = false
         // 	console.log(JSON.stringify(result))


          	if (result.status == '成功') {

              if (result.LastRecord != '') {
                this.LastRecord = result.LastRecord[0]
              }


          		this.CustomerInfo = result.CustomerInfo[0]

              this.CurrentPara = result.CurrentPara[0]

          		if (result.CardType == '充值卡') {

          			this.disabled1 = true
          			this.disabled2 = false
          			this.disabled3 = true

          		}else if (result.CardType == '开户卡') {

          			this.disabled1 = false
          			this.disabled2 = true
          			this.disabled3 = true

          		}else if (result.CardType == '重写卡') {
          			this.disabled1 = true
          			this.disabled2 = true
          			this.disabled3 = false
          		}
          	}else{

          		this.$message({
                  type: 'error',
                  message: result.data
            	});
          	}

          })
		},

		// 开户
		GetFrameOpenAccountyByHouseCode(){

       if (!this.linkMachine()) {
          this.$message({
            type: 'warning',
            message: '没有连接读卡机'
          })

          retur
        }

  			if (this.type.length == 0 || this.Amount.length == 0) {
                  this.$message({
                    type: 'warning',
                    message: '请选择好信息'
                 });
                  return
              }else if (isNaN(this.Amount) || this.Amount < 0 || this.Amount.toString().indexOf('.') != -1) {
                  this.$message({
                    type: 'warning',
                    message: '金额必须不能为负数'
                 });
                  return
              }else if (this.Amount > 16000) {
                  this.$message({
                    type: 'warning',
                    message: '一次开户金额不能大于16000'
                 });
                  return
              }

            this.$confirm(`确定要开户${this.Amount}元吗？`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(()=>{
            	 // 网络请求
              this.loading = true

                var params = {
                    UserId:window.sessionStorage.getItem('id'),
                    RegionCode:window.sessionStorage.getItem('RegionCode'),
                    HouseRegionCode:this.HouseRegionCode,
                    Amount:this.Amount,
                    TransactionType:'0',//充值
                    TransactionMode:'2',//远程
                    TransactionMethod:this.type,
                    time:this.dataUtil.formatTime1(new Date())
                }

                //  console.log(JSON.stringify(params));

                  var encryptParams = {
                    evalue:this.$encrypt(JSON.stringify(params))
                  }

                //  console.log(this.$encrypt(JSON.stringify(params)))

                  this.http.post(this.api.baseUrl+this.api.GetFrameOpenAccountyByHouseCode,encryptParams)
                  .then(result=>{
                  	this.loading = false
                //  	console.log(result)
                  	if (result.status == '成功') {

                  		if (result.LastRecord != '') {
                        this.LastRecord = result.LastRecord[0]
                      }
                      this.CurrentPara = result.CurrentPara[0]

                  		this.$message({
	                        type: 'success',
	                        message: '开户成功'
                    	});



                  	}else{
                  		this.$message({
	                        type: 'error',
	                        message: result.data
                    	});
                  	}

                  	this.resetShow()
                  	this.resetDisabled()
					          this.show0 = true


                  })
            }).catch(()=>{

            })

		},

		// 充值
		GetFrameRechargeByHouseCode(){

       if (!this.linkMachine()) {
          this.$message({
            type: 'warning',
            message: '没有连接读卡机'
          });

          return
        }
  			if (this.type.length == 0 || this.Amount.length == 0) {
                  this.$message({
                    type: 'warning',
                    message: '请选择好信息'
                 });
                  return
              }else if (isNaN(this.Amount) || this.Amount < 0 || this.Amount.toString().indexOf('.') != -1) {
                  this.$message({
                    type: 'warning',
                    message: '金额必须不能为负数'
                 });
                  return
              }else if (this.Amount > 16000) {
                  this.$message({
                    type: 'warning',
                    message: '一次开户金额不能大于16000'
                 });
                  return
              }

            this.$confirm(`确定要充值${this.Amount}元吗？`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(()=>{

            	// 网络请求
              this.loading = true

                var params = {
                    UserId:window.sessionStorage.getItem('id'),
                    RegionCode:window.sessionStorage.getItem('RegionCode'),
                    HouseRegionCode:this.HouseRegionCode,
                    Amount:this.Amount,
                    TransactionType:'0',//充值
                    TransactionMode:'2',//远程
                    TransactionMethod:this.type,
                    time:this.dataUtil.formatTime1(new Date())
                }

                 // console.log(JSON.stringify(params));

                  var encryptParams = {
                    evalue:this.$encrypt(JSON.stringify(params))
                  }

                //  console.log(this.$encrypt(JSON.stringify(params)))

                  this.http.post(this.api.baseUrl+this.api.GetFrameRechargeByHouseCode,encryptParams)
                  .then(result=>{
                  	this.loading = false
                  //	console.log(result)
                  	if (result.status == '成功') {

                  		if (result.LastRecord != '') {
                        this.LastRecord = result.LastRecord[0]
                      }
                      this.CurrentPara = result.CurrentPara[0]

                  		this.$message({
	                        type: 'success',
	                        message: '充值成功'
                    	});



                  	}else{
                  		this.$message({
	                        type: 'error',
	                        message: result.data
                    	});
                  	}
                  	// this.LastRecord = result.LastRecord
                 	this.resetShow()
                  	this.resetDisabled()
					this.show0 = true
                  })

            }).catch(()=>{

            })


		},

		// 重写卡
		 ReOprtByHouseCode(){

       if (!this.linkMachine()) {
          this.$message({
            type: 'warning',
            message: '没有连接读卡机'
          });

          return
        }

		 	      this.loading = true

            var params = {
                UserId:window.sessionStorage.getItem('id'),
                RegionCode:window.sessionStorage.getItem('RegionCode'),
                HouseRegionCode:this.HouseRegionCode,
                time:this.dataUtil.formatTime1(new Date())
            }

           //  console.log(JSON.stringify(params));

              var encryptParams = {
                evalue:this.$encrypt(JSON.stringify(params))
              }

             // console.log(this.$encrypt(JSON.stringify(params)))

              this.http.post(this.api.baseUrl+this.api.ReOprtByHouseCode,encryptParams)
              .then(result=>{
              		this.loading = false
                  //	console.log(result)
                  	if (result.status == '成功') {

                  		if (result.LastRecord != '') {
                        this.LastRecord = result.LastRecord[0]
                      }
                      this.CurrentPara = result.CurrentPara[0]

                  		this.$message({
	                        type: 'success',
	                        message: '重写成功'
                    	});



                  	}else{
                  		this.$message({
	                        type: 'error',
	                        message: result.data
                    	});
                  	}


                  	this.resetShow()
                  	this.resetDisabled()
					this.show0 = true
                    // this.btn0Click()
              })
		 },




     // 连接读卡机
     linkMachine(){
          // 连接读卡器
          if (!this.ICCard.readerOpen()) {
              this.$message({
                  type: 'error',
                  message: "连接读卡器失败"
              });

              this.ICCard.readerClose()
              return false
          }else{
              this.ICCard.readerClose()
             // console.log('读卡器连接成功')
              return true
          }
      },

		// 还原所有状态
		resetAllStatus(){
			// this.showRecord = false

			this.disabled1 = true
			this.disabled2 = true
			this.disabled3 = true

			this.show0 = false
			this.show1 = false
			this.show2 = false

      this.CustomerInfo.MeterAddr = ''
      this.CustomerInfo.CurrentUser = ''

      this.CurrentPara.RemainMoney = ''
      this.CurrentPara.BalanceStatu = ''
      this.CurrentPara.RelayStatu = ''
      this.CurrentPara.RemainMoneyTime = ''

      this.LastRecord.Name = ''
      this.LastRecord.Money = ''
      this.LastRecord.Time = ''

		},


		resetShow(){
			this.show0 = false
			this.show1 = false
			this.show2 = false
		},
		resetDisabled(){
			this.disabled1 = true
			this.disabled2 = true
			this.disabled3 = true
		},
		// 点击查询状态按钮
		btn0Click(){
			this.resetShow()
			this.show0 = true
			this.QueryEMSTSStatus()

		},

		// 点击远程开户按钮
		btn1Click(){
			this.resetShow()
			this.show1 = true
		},

		// 点击远程充值按钮
		btn2Click(){
			this.resetShow()
			this.show2 = true
		},


		 // 根据6级名寻找五级名
        findFifthRegionNameByHouseName(){
            var obj = this.$store.state.treeData.Commmunity
            for (var i = 0; i < obj.length; i++) {
                // console.log('一级循环')
                var fifthNames = obj[i].children
                for (var j = 0; j < fifthNames.length; j++) {
                    // console.log('二级循环')
                    var houses = fifthNames[j].children
                    for (var k = 0; k < houses.length; k++) {
                        // console.log('遍历'+houses[K].code)
                        if (houses[k].code == this.HouseRegionCode) {
                           // console.log('匹配到')
                            return fifthNames[j].label
                        }

                    }
                }
            }
        },

        /**
        *选择房间
        */
        selectHouse(node){
            if (window.sessionStorage.getItem('menuName') == 'RemoteRecharge'){
                if (node.level == "6") {
                    this.HouseRegionName = node.label
                    this.HouseRegionCode = node.code
                }

            }
        },
	},
	 computed:{
        treeNode(){
            return this.$store.state.clickTreeData
        }
    },
     watch:{
        // 观察点击的树的内容发生改变
        treeNode(newVal){
            this.selectHouse(newVal)
        },

        HouseRegionCode(newVal){
        	this.resetAllStatus()
        	this.show0 = true
            this.FifthRegionName = this.findFifthRegionNameByHouseName()
           // console.log(this.FifthRegionName)
        },

        CurrentPara(newVal){
          if (parseFloat(newVal.RemainMoney)<0) {
            this.style1 = 'color:red'
          }else{
            this.style1 = 'color:green'
          }

          if (newVal.BalanceStatu == '透支' ) {
            this.style2 = 'color:red'
          }else{
            this.style2 = 'color:green'
          }

          if (newVal.RelayStatu == '合闸') {
            this.style3 = 'color:green'
          }else{
            this.style3 = 'color:red'
          }


        }


    }

}
</script>

<style scoped>
.title{
  color:#409EFF;
  font-size: 16px;
  margin-bottom: 20px;
  justify-content: space-between;
 
}
.el-input .is-disabled .el-input__inner{
  color: #000 !important
}

.yuanchengchonghzibigbox{
    float: left;
    width: 100%
}

</style>




















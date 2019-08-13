<!-- 充值退费 -->
<template>
    <div style="height:700px" >
         <object id="MWRFATL" style="width:0px;height:0px" classid="CLSID:856964B5-F42F-447B-A37D-ED07E8973ED2" codebase="trjCab.CAB#version=1,0,0,1">
         </object>
        <div>
            <el-button type="primary" @click='initAndJudge'>读卡</el-button>

            <el-button type="warning" @click='button1Click' :disabled='disabled1'>开户</el-button>
            <el-button type="warning" @click='button2Click' :disabled='disabled2'>售电</el-button>
            <el-button type="warning" @click='GetFrameCancelAccountByPANForRF' :disabled='disabled3'>销户</el-button>
            <el-button type="warning" @click='SettlementAndCancelAccountByPANForRF' :disabled='disabled4'>销户退费</el-button>
            <el-button type="warning" @click="ReWriteRFCodeByPAN" :disabled='disabled6'>重写卡</el-button>
            <el-button type="primary" @click="button7Click">补卡</el-button>

        </div>

        <!-- 操作记录 -->
        <div v-if="show0">
            <div style="width:500px;margin:100px 0 0 120px">

              <el-form label-width="100px" class="demo-ruleForm" >


                  <el-form-item label='房间：'>
                    {{CustomerInfo}}
                  </el-form-item>

                  <el-form-item label='操作：'>
                    {{LastRecord.Name}}
                  </el-form-item>

                  <el-form-item label="金额：" >
                    {{LastRecord.Money}}
                  </el-form-item>

                  <el-form-item label="时间：" >
                    {{LastRecord.Time}}
                  </el-form-item>
              </el-form>


            </div>
        </div>

       <!-- 开户 -->
        <div v-if="show1">
            <div style="width:500px;margin:100px 0 0 120px">

              <el-form label-width="100px" class="demo-ruleForm" >

                  <el-form-item label="栋">
                    <el-input v-model.trim="FifthRegionName"  disabled></el-input>
                  </el-form-item>

                  <el-form-item label="房间" >
                    <el-input  v-model.trim="HouseName" disabled></el-input>
                  </el-form-item>

                  <el-form-item label="类型" >
                    <el-select v-model="type" placeholder="请选择交易类型" clearable style="width:400px;">
                        <el-option v-for="item in TransactionMethod"
                        :label="item.label" :value="item.value"  :key="item.index">
                        </el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="金额" >
                    <el-input  v-model.trim="Amount"></el-input>
                  </el-form-item>

              </el-form>
              <div style="text-align:center">
                  <el-button type="primary" style="width:200px;" @click="GetFrameOpenAccountByPANForRF">确定开户</el-button>
              </div>

            </div>
        </div>

        <!-- 充值 -->
        <div v-if="show2">
            <div style="width:500px;margin:100px 0 0 120px">
              <div style="text-align:center;margin-bottom:20px">{{this.CustomerInfo}}</div>
              <el-form :model="topUpForm"  label-width="100px" class="demo-ruleForm" >

                  <el-form-item label="类型" prop="type">
                    <el-select v-model="topUpForm.type" placeholder="请选择交易类型" clearable style="width:400px;">
                        <el-option v-for="item in TransactionMethod"
                        :label="item.label" :value="item.value" :key="item.index">
                        </el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="金额" prop="Amount">
                    <el-input  v-model.trim="topUpForm.Amount"></el-input>
                  </el-form-item>

              </el-form>
              <div style="text-align:center">
                  <el-button type="primary" style="width:200px;" @click="GetFrameRechargeByPANForRF">充值</el-button>
              </div>

            </div>
        </div>
        <!-- 补卡 -->
        <div v-if="show7">
            <div style="width:500px;margin:100px 0 0 120px">

              <el-form  label-width="100px" class="demo-ruleForm" >

                  <el-form-item label="栋">
                    <el-input v-model.trim="FifthRegionName"  disabled></el-input>
                  </el-form-item>

                  <el-form-item label="房间" >
                    <el-input  v-model.trim="HouseName" disabled></el-input>
                  </el-form-item>

              </el-form>
              <div style="text-align:center">
                  <el-button type="primary" style="width:200px;" @click="NewRFCardByHouseRegionCode">确定</el-button>
              </div>

            </div>
        </div>
    </div>


</template>
<script>
export default{
    data(){
        return{

         

            disabled1:true,//开户按钮

            disabled2:true,//售电按钮

            disabled3:true,//销户按钮

            disabled4:true,//销户退费按钮

            disabled6:true,//重写卡按钮

            show1:false,//显示开户界面

            show2:false,//显示售电界面

            show7:false,//补卡界面

            show0:false,//操作记录界面

            CardID:'',//IC卡卡号

            blockData:[],//存储IC卡块的数据

            CustomerInfo:'',//IC卡绑定的房间与用户的信息

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


            FifthRegionName:'',
            HouseName:'',
            HouseCode:'',
            type:'',
            Amount:0,//金额


            topUpForm:{
                type:'',
                Amount:0,//金额
            },

            LastRecord:{
                Name:'',//操作名
                Money:'',//金额
                Time:'',//时间
            },//最后一次操作

            oldReadCardTime:'',//上一次读卡时间
            readCardTimes:0,//读卡次数， 0 1 2

        }
    },

     

	methods:{
        // 右补0方法
        rightPadding(str){
            while (str.length < 64) {
                // statement
                str += "0"
            }

            return str
        },

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
                console.log('读卡器连接成功')
                return true
            }
        },

        findCard(){
            var result = this.ICCard.openCard()
             if (!result) {
                this.$alert('找不到IC卡','提示')
                // this.ICCard.readerBeep()
               this.ICCard.readerClose()
                return false
            }else{

                console.log('打开IC卡,卡号'+result)
                this.CardID = result
                return true
            }
        },

        /**
        *清空数据区
        */
        clearDataBlock(block){
            if (this.ICCard.cardDirVerifyPassword(0,block,"201803191500")) {
                this.ICCard.cardWriteHex(block,"0000000000000000"+"0000000000000000")
                return true

            }else{
               // console.log('验证密码错误')
                return false
            }

        },
        // 判断指定块有无data
        hasData(index){
            var originData = '0000000000000000'+'0000000000000000'
            if (this.blockData[index] == originData) {
                return false
            }else{
                return true
            }
        },

        // 重置disable
        resetDisabled(){
            this.disabled1 = true
            this.disabled2 = true
            this.disabled3 = true
            this.disabled4 = true
            this.disabled6 = true

        },

        resetShow(){
            this.show1 = false
            this.show2 = false
            this.show7 = false
            this.show0 = false
        },

        /**
        *点击开户按钮，显示开户界面
        */
        button1Click(){
            this.resetShow()
            this.show1 = true
        },
        button2Click(){
            this.resetShow()
            this.show2 = true
        },

        button7Click(){
            this.resetShow()
            this.show7 = true
        },

		// 初始化卡
        initCard(){
            // 连接读卡器
            if (!this.linkMachine()) {
                return false
            }
            // 寻卡
           if(!this.findCard()){
                return false
           }
            //初始化
            for (var i = 0; i <= 4; i++) {
                var block = 3 + 4*i
               // console.log(block)
                if (this.ICCard.cardDirVerifyPassword(0,block,"ffffffffffff")) {
                    console.log('正在初始密码')
                    this.ICCard.cardWriteHex(block,"201803191500ff078069ffffffffffff")

                }else {
                    // 不需要初始化
                  //  console.log('IC卡已经初始过密码')
                    this.ICCard.readerClose()
                    return false
                }
            }

            return true


        },

        /**
        *卡验证
        *isFirstOperation 是否是充值操作的验证卡
        *返回值
        *1 只能开户
        *2 售电与销户
        *3 中途换卡操作
        *4 销户退费卡
        *5 异常卡
        *6 重写卡
        *7 返回卡的种类未能识别
        *8 坏卡
        *9 失效卡
        *10不处理
        *11 清回写
        */
        async readCard(deliver,isFirstOperation=false){

            // 防止连续两次操作，导致读卡机连接失败
            this.readCardTimes ++
            if(this.readCardTimes == 1){

              this.oldReadCardTime = new Date()

            }else if (this.readCardTimes == 2) {

                var newtime = new Date()
              //  console.log(newtime - this.oldReadCardTime)
                if (newtime - this.oldReadCardTime < 1500) {
                  // 进行修改
                  this.readCardTimes = 0
                  return false

                }else{
                  this.readCardTimes = 1
                  this.oldReadCardTime = new Date()
                }

              }




           this.resetShow()
           this.resetDisabled()

           this.LastRecord.Name = ''
           this.LastRecord.Money = ''
           this.LastRecord.Time = ''
           this.CustomerInfo = ''


            try {
            //已经初始过密码，读卡机会点开，需要重连
            if (!this.initCard()) {

                if (!this.linkMachine()) {
                    deliver(false)
                    return
                }

                if(!this.findCard()){
                    deliver(false)
                    return
                }

            }



            // 非读卡操作，需要额外判断前后两次验卡是否是同一张卡
            if (!isFirstOperation) {

                if (this.ICCard.cardDirVerifyPassword(0,1,"201803191500")) {
                    var block = this.ICCard.cardReadHex(1)

                    if (block != this.blockData[0]) {
                        deliver(3)
                        return
                    }

                }else{
                   // console.log('验证密码错误')
                    this.ICCard.readerClose()
                    deliver(false)

                }

               // console.log('hell0')
            }

            var blockArr = [1,4,5,8,9,12,13,16,17]
            // 清空数组
            this.blockData.splice(0, this.blockData.length)



            for (var i = 0; i < blockArr.length; i++) {

               if (this.ICCard.cardDirVerifyPassword(0,blockArr[i],"201803191500")) {
                    var block = this.ICCard.cardReadHex(blockArr[i])
                    this.blockData.push(block)
                    console.log("block"+blockArr[i]+":" +block)
                }else{
                  //  console.log('验证密码错误')
                    this.ICCard.readerClose()
                    deliver(false)

                }
            }

            // 判断PAN
            if (this.hasData(0)) {
                // 有PAN
                // 网络请求验证卡
                var PAN = this.blockData[0]
                var FrameRF = this.blockData[1]+this.blockData[2]+','+this.blockData[3]+this.blockData[4]+','+this.blockData[5]+this.blockData[6]+','+this.blockData[7]+this.blockData[8]

                // 同步请求等待访问结果


                var result = await new Promise((resolve) => {
                  this.QueryRFCodeStatus(PAN,FrameRF,resolve)
                })

                // 记录最后一次操作的数据
                if (result.LastRecord != '') {
                    this.LastRecord = result.LastRecord[0]
                }

              //  console.log(JSON.stringify(result) )
               // console.log('完成验证卡');
                if (result.status == '成功') {

                    this.CustomerInfo = result.CustomerInfo

                    if (result.CardType == '充值卡') {
                        // this.$alert('可进行充值或者销户','充值卡')
                        // 清空数据区
                        this.clearDataBlock(4)
                        this.clearDataBlock(5)
                        this.clearDataBlock(8)
                        this.clearDataBlock(9)
                        this.clearDataBlock(12)
                        this.clearDataBlock(13)
                        this.clearDataBlock(16)
                        this.clearDataBlock(17)

                        this.disabled2 = false
                        this.disabled3 = false
                        deliver(2)

                    }else if (result.CardType == '销户退费卡') {
                        // this.$alert('可进行销户退费','销户退费卡')
                        this.disabled4 = false
                        deliver(4)

                    }else if (result.CardType == '未交易卡' || result.CardType == '异常卡') {

                        // 判断是否可以异常结算

                        var opera = await new Promise(resolve=>{
                             this.$confirm(`${result.CardInfo}，需要进行异常结算吗？`, result.CardType, {
                              confirmButtonText: '确定',
                              cancelButtonText: '取消',
                              type: 'warning'
                            }).then(() => {
                              // 网络请求
                              resolve(true)
                            }).catch(()=>{
                               resolve(false)
                            })
                        })

                        if (opera) {
                            // 进行异常结算
                            await this.SettlementAndClearCard()
                            deliver(5)

                        }else{
                            this.ICCard.readerClose()
                            deliver(false)

                        }

                    }else if (result.CardType == '重写卡') {
                        // this.$alert('可进行重写','重写卡')
                        this.disabled6 = false
                        deliver(6)
                    }else if (result.CardType == '失效卡') {
                        this.$alert('请将此卡回收','失效卡')
                        deliver(8)
                    }else if (result.CardType == '不处理') {
                        this.$alert('此卡是补卡后的未执行卡,请执行刷卡','不处理')
                        deliver(9)
                    }else if (result.CardType == '清回写') {
                        this.$alert('上次刷卡操作无效','请重新刷卡！')
                        this.clearDataBlock(8)
                        this.clearDataBlock(9)
                        this.clearDataBlock(16)
                        this.clearDataBlock(17)
                        deliver(11)
                    }
                    else{
                        // 未识别卡的种类
                        this.$alert('不可进行任何操作','未识别卡')
                        deliver(7)
                    }

                }else{
                    this.CustomerInfo = ''

                    this.$message({
                        type: 'error',
                        message: result.data
                    });
                    this.ICCard.readerClose()
                    deliver(false)

                }



            }else{

                // 无PAN
                 if (this.hasData(1)||this.hasData(2)||this.hasData(3)||this.hasData(4)||this.hasData(5)||this.hasData(6)||this.hasData(7)||this.hasData(8)) {
                    // 存在数据，异常卡
                    this.$alert('不能操作','这是一张坏卡')

                    deliver(8)


                }else{
                    // 不存在数据,没开户，新卡
                    // this.$alert('可进行开户或者补卡操作','新卡')
                    this.disabled1 = false
                    deliver(1)

                }

            }
            } catch(e) {
                // statements
                this.ICCard.readerClose()
            }


        },


        // 点击读卡按钮
        async initAndJudge(){
          var result =  await new Promise(resolve=>{
                this.readCard(resolve,true)
            })
            if(result){
                // 断开读卡器
                console.log('********')
                this.resetShow()
                this.show0 = true

                this.ICCard.readerClose()
            }

        },


        /**
        *开户
        */
        async GetFrameOpenAccountByPANForRF(){
            // 判断是否填写信息
            if (this.FifthRegionName.length == 0 || this.HouseName.length == 0 || this.type.length == 0 || this.Amount.length == 0) {
                this.$message({
                  type: 'warning',
                  message: '请选择好信息'
               });
                return
            }else if (isNaN(this.Amount) || this.Amount <= 0 || this.Amount.toString().indexOf('.') != -1) {
                this.$message({
                  type: 'warning',
                  message: '金额必须为大于0的整数'
               });
                return
            }else if (this.topUpForm.Amount > 16000) {
                this.$message({
                  type: 'warning',
                  message: '一次开户金额不能大于16000'
               });
                return
            }

            // 判断该卡是否有开户功能

            var num = await new Promise(resolve=>{
                this.readCard(resolve)
            })
          //  console.log(num)

            if ( num != 1  || num == 3) {
                this.$alert('此卡没有该功能，请确保中途没有换卡','提示')
                this.resetShow()
                this.resetDisabled()
                this.ICCard.readerClose()
                return
            }


            this.loading = true
            var params = {
                CardID:this.CardID,
                HouseRegionCode:this.HouseCode,
                Amount:this.Amount,
                UserId:window.sessionStorage.getItem('id'),
                RegionCode:window.sessionStorage.getItem('RegionCode'),

                TransactionType:'0',//充值
                TransactionMode:'0',//视频卡
                TransactionMethod:this.type,
                time:this.dataUtil.formatTime1(new Date())
            }

             // console.log(JSON.stringify(params));

              var encryptParams = {
                evalue:this.$encrypt(JSON.stringify(params))
              }

             // console.log(this.$encrypt(JSON.stringify(params)))

              this.http.post(this.api.baseUrl+this.api.GetFrameOpenAccountByPANForRF,encryptParams)
              .then(result=>{
                this.loading = false
              //  console.log(JSON.stringify(result))
                if (result.status == '成功') {

                    // 秘钥报文
                    var EK = this.rightPadding(result.EK)
                    // 开户
                    var OAF = this.rightPadding(result.OAF)
                    // PAN值
                    var PAN = this.rightPadding(result.PAN)



                   var fontEK = EK.substring(0,32)
                   var afterEK = EK.substring(32,64)


                   var fontOAF = OAF.substring(0,32)
                   var afterOAF = OAF.substring(32,64)


                    // 把数据写进ICCard
                    var writeBlock = [1,4,5,12,13]
                    var writeBlockData = [PAN,fontEK,afterEK,fontOAF,afterOAF]
                    for (var i = 0; i < writeBlock.length; i++) {
                        //  验卡
                        if (this.ICCard.cardDirVerifyPassword(0,writeBlock[i],"201803191500")) {
                            // 写卡
                            if( !this.ICCard.cardWriteHex(writeBlock[i],writeBlockData[i]) ){

                                this.$alert('写卡失败，请重新操作','失败')

                                this.ICCard.readerClose()
                                this.resetDisabled()
                                this.resetShow()
                                return
                            }

                        }else{
                            console.log('验证密码错误')
                            this.ICCard.readerClose()
                            this.resetDisabled()
                            this.resetShow()
                            return
                        }
                    }
                    this.$message({
                      type: 'success',
                      message: '开户成功!'
                   });

                }else{

                  this.$message({
                      type: 'error',
                      message: result.data
                   });

                }
                // 无论成功失败都关闭读卡器
                this.ICCard.readerClose()
                this.resetDisabled()
                this.resetShow()

              })
        },

        /**
        *网络请求卡验证
        *PAN PAN值
        *FrameRF 数据区的值
        */
       QueryRFCodeStatus(PAN,FrameRF,resolve){

            this.loading = true

            var params = {
                CardID:this.CardID,
                UserId:window.sessionStorage.getItem('id'),
                RegionCode:window.sessionStorage.getItem('RegionCode'),
                PAN:PAN,
                FrameRF:FrameRF,
                time:this.dataUtil.formatTime1(new Date())
            }

             // console.log(JSON.stringify(params));

              var encryptParams = {
                evalue:this.$encrypt(JSON.stringify(params))
              }

             // console.log(this.$encrypt(JSON.stringify(params)))


            this.http.post(this.api.baseUrl+this.api.QueryRFCodeStatus,encryptParams)
            .then(result=>{
                console.log('读卡完成')
                this.loading = false
                resolve(result)
            })


        },

        /**
        *充值
        */
        async GetFrameRechargeByPANForRF(){
            console.log(this.topUpForm.Amount)
            // 判断是否填写信息
            if ( this.topUpForm.type.length == 0 || this.topUpForm.Amountlength == 0) {
                this.$message({
                  type: 'warning',
                  message: '请选择好信息'
               });
                return
            }else if (isNaN(this.topUpForm.Amount) || this.topUpForm.Amount <= 0 || this.topUpForm.Amount.toString().indexOf('.') != -1) {
                this.$message({
                  type: 'warning',
                  message: '金额必须为大于0数字'
               });
                return
            }else if (this.topUpForm.Amount > 16000) {
                this.$message({
                  type: 'warning',
                  message: '一次充值不能大于16000'
               });
                return
            }

            // 判断该卡是否有充值功能


            var num = await new Promise(resolve=>{
                this.readCard(resolve)
            })

            if ( num != 2 || num == 3) {
                this.$alert('此卡没有该功能，请确保中途没有换卡','提示')
                this.resetShow()
                this.resetDisabled()
                this.ICCard.readerClose()
                return
            }


            this.$confirm(`确定要充值${this.topUpForm.Amount}元吗？`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                if (this.ICCard.cardDirVerifyPassword(0,1,"201803191500")){

                     // 网络请求
                this.loading = true

                var params = {
                    CardID:this.CardID,
                    PAN:this.blockData[0],
                    Amount:this.topUpForm.Amount ,
                    UserId:window.sessionStorage.getItem('id'),
                    RegionCode:window.sessionStorage.getItem('RegionCode'),
                    TransactionType:'0',//充值
                    TransactionMode:'0',//视频卡
                    TransactionMethod:this.topUpForm.type,
                    time:this.dataUtil.formatTime1(new Date())
                }

               //   console.log(JSON.stringify(params));

                  var encryptParams = {
                    evalue:this.$encrypt(JSON.stringify(params))
                  }

               //   console.log(this.$encrypt(JSON.stringify(params)))

                  this.http.post(this.api.baseUrl+this.api.GetFrameRechargeByPANForRF,encryptParams)
                  .then(result=>{
                    this.loading = false
                //    console.log(JSON.stringify(result))
                    if (result.status == '成功') {

                        // 秘钥报文
                        var EK = this.rightPadding(result.EK)
                        // 开户
                        var RC = this.rightPadding(result.RC)

                       var fontEK = EK.substring(0,32)
                       var afterEK = EK.substring(32,64)

                       var fontRC = RC.substring(0,32)
                       var afterRC = RC.substring(32,64)


                        // 把数据写进ICCard
                        var writeBlock = [4,5,12,13]
                        var writeBlockData = [fontEK,afterEK,fontRC,afterRC]
                    //    console.log('开始充值')
                        for (var i = 0; i < writeBlock.length; i++) {

                            if (this.ICCard.cardDirVerifyPassword(0,writeBlock[i],"201803191500")) {

                                if( !this.ICCard.cardWriteHex(writeBlock[i],writeBlockData[i]) ){

                                    this.$alert('写卡失败，请重新读卡进行操作','失败')

                                    this.ICCard.readerClose()
                                    this.resetDisabled()
                                    this.resetShow()
                                    return
                                }


                            }else{
                              //  console.log('验证密码错误')
                                this.$alert('验证密码错误，请重新读卡，进行重写卡','失败')
                                this.ICCard.readerClose()
                                this.resetDisabled()
                                this.resetShow()
                                return
                            }
                        }

                        this.$alert('充值成功','成功')


                    }else{

                      this.$message({
                          type: 'error',
                          message: result.data
                       });

                    }

                    // 无论成功失败都关闭读卡器
                    this.ICCard.readerClose()
                    this.resetDisabled()
                    this.resetShow()
                  })


                }else{
                    this.ICCard.readerClose()
                    this.resetDisabled()
                    this.resetShow()
                    this.$alert('异常操作，请重新读卡','警告')
                }


            }).catch(()=>{
               // console.log('点击取消按钮')
                this.ICCard.readerClose()
            });
        },


        /**
        *异常卡结算
        */
        async SettlementAndClearCard(){


            if (this.ICCard.cardDirVerifyPassword(0,1,"201803191500")) {
                    // 网络请求
              this.loading = true
              var FrameRF = this.blockData[1]+this.blockData[2]+','+this.blockData[3]+this.blockData[4]+','+this.blockData[5]+this.blockData[6]+','+this.blockData[7]+this.blockData[8]
                var params = {
                    CardID:this.CardID,
                    PAN:this.blockData[0],
                    UserId:window.sessionStorage.getItem('id'),
                    RegionCode:window.sessionStorage.getItem('RegionCode'),
                    FrameRF:FrameRF,
                    time:this.dataUtil.formatTime1(new Date())
                }

                 // console.log(JSON.stringify(params));

                  var encryptParams = {
                    evalue:this.$encrypt(JSON.stringify(params))
                  }

                //  console.log(this.$encrypt(JSON.stringify(params)))


                 await this.http.post(this.api.baseUrl+this.api.SettlementAndClearCard,encryptParams)
                  .then(result=>{
                    this.loading = false
                   // console.log(JSON.stringify(result))
                    if (result.status == '成功') {

                       if (this.clearDataBlock(4) && this.clearDataBlock(5) && this.clearDataBlock(8) && this.clearDataBlock(9) && this.clearDataBlock(12) && this.clearDataBlock(13) && this.clearDataBlock(16) && this.clearDataBlock(17)) {
                            var title = '异常结算成功'
                            var message = '退回金额' +result.Money +'元'
                            this.$alert(message,title)
                       }else{
                            this.$alert('此卡变成是是失效卡','警告')
                       }

                       // 销户退费时清空PAN
                        if (result.ClearPAN.toUpperCase() == "TRUE") {
                            this.clearDataBlock(1)
                        }


                    }else{

                      this.$message({
                          type: 'error',
                          message: result.data
                       });

                    }

                  })

                }else {
                    // 不需要初始化
                    this.$alert('异常操作，请重新读卡','警告')
            }


        },

        /**
        *销户
        */
        async GetFrameCancelAccountByPANForRF(){
            // 判断该卡是否有充值功能
            var num = await new Promise(resolve=>{
                this.readCard(resolve)
            })

            if ( num != 2 || num == 3) {
                this.$alert('此卡没有该功能，请确保中途没有换卡','提示')
                this.resetShow()
                this.resetDisabled()
                this.ICCard.readerClose()
                return
            }

            this.$confirm(`确定要销户吗`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(()=>{
                             // 网络请求
              this.loading = true

                var params = {
                    CardID:this.CardID,
                    PAN:this.blockData[0],
                    UserId:window.sessionStorage.getItem('id'),
                    RegionCode:window.sessionStorage.getItem('RegionCode'),
                    time:this.dataUtil.formatTime1(new Date())
                }

              //    console.log(JSON.stringify(params));

                  var encryptParams = {
                    evalue:this.$encrypt(JSON.stringify(params))
                  }

                //  console.log(this.$encrypt(JSON.stringify(params)))

                  this.http.post(this.api.baseUrl+this.api.GetFrameCancelAccountByPANForRF,encryptParams)
                  .then(result=>{
                    this.loading = false
                  //  console.log(JSON.stringify(result))
                    if (result.status == '成功') {
                        // 要写入卡的数据
                        var CA = this.rightPadding(result.CA)


                       var fontCA = CA.substring(0,32)
                       var afterCA = CA.substring(32,64)




                        // 把数据写进ICCard
                        var writeBlock = [12,13]
                        var writeBlockData = [fontCA,afterCA]
                      //  console.log('开始充值')
                        for (var i = 0; i < writeBlock.length; i++) {

                            if (this.ICCard.cardDirVerifyPassword(0,writeBlock[i],"201803191500")) {

                                if( !this.ICCard.cardWriteHex(writeBlock[i],writeBlockData[i]) ){

                                    this.$alert('写卡失败，请重新读卡进行操作','失败')

                                    this.ICCard.readerClose()
                                    this.resetDisabled()
                                    this.resetShow()
                                    return
                                }


                            }else{
                              //  console.log('验证密码错误')
                                this.$alert('验证密码错误，请重新读卡，进行重写卡','失败')
                                this.ICCard.readerClose()
                                this.resetDisabled()
                                this.resetShow()
                                return
                            }
                        }


                        this.$alert('销户成功,请进行刷表操作之后再进行销户退费','成功')
                       //  this.$message({
                       //    type: 'success',
                       //    message: '销户成功!'
                       // });

                    }else{

                      this.$message({
                          type: 'error',
                          message: result.data
                       });

                    }

                    // 无论成功失败都关闭读卡器
                    this.ICCard.readerClose()
                    this.resetDisabled()
                    this.resetShow()
                  })
            }).catch(()=>{
                this.ICCard.readerClose()
            })

        },

        /**
        *销户退费
        */
        async SettlementAndCancelAccountByPANForRF(){
             // 判断该卡是否有该功能
            var num = await new Promise(resolve=>{
                this.readCard(resolve)
            })

            if ( num != 4 || num == 3) {
                this.$alert('此卡没有该功能，请确保中途没有换卡','提示')
                this.resetShow()
                this.resetDisabled()
                this.ICCard.readerClose()
                return
            }

             // 网络请求
              this.loading = true

              var FrameRF = this.blockData[1]+this.blockData[2]+','+this.blockData[3]+this.blockData[4]+','+this.blockData[5]+this.blockData[6]+','+this.blockData[7]+this.blockData[8]

                var params = {
                    CardID:this.CardID,
                    PAN:this.blockData[0],
                    UserId:window.sessionStorage.getItem('id'),
                    RegionCode:window.sessionStorage.getItem('RegionCode'),
                    FrameRF:FrameRF,
                    time:this.dataUtil.formatTime1(new Date())
                }

                 // console.log(JSON.stringify(params));

                  var encryptParams = {
                    evalue:this.$encrypt(JSON.stringify(params))
                  }

                 // console.log(this.$encrypt(JSON.stringify(params)))

                  this.http.post(this.api.baseUrl+this.api.SettlementAndCancelAccountByPANForRF,encryptParams)
                  .then(result=>{
                    this.loading = false
                   // console.log(JSON.stringify(result))
                    if (result.status == '成功') {
                        // 清空所有PAN和数据区


                       var r1 = this.clearDataBlock(1)
                       var r2 = this.clearDataBlock(4)
                       var r3 = this.clearDataBlock(5)
                       var r4 = this.clearDataBlock(8)
                       var r5 = this.clearDataBlock(9)
                       var r6 = this.clearDataBlock(12)
                       var r7 = this.clearDataBlock(13)
                       var r8 = this.clearDataBlock(16)
                       var r9 = this.clearDataBlock(17)

                       if (r1 & r2 & r3 & r4 & r5 & r6 & r7 & r8 & r9) {
                            this.$alert(`退款金额${result.Money}元`,"销户退费成功")
                       }else{
                            this.$alert('清空卡数据失败,请重新操作','失败')
                       }




                    }else{

                      this.$message({
                          type: 'error',
                          message: result.data
                       });

                    }

                    // 无论成功失败都关闭读卡器
                    this.ICCard.readerClose()
                    this.resetDisabled()
                    this.resetShow()
                  })
        },

        /**
        *重写卡
        */

        async ReWriteRFCodeByPAN(){
             // 判断该卡是否有该功能
            var num = await new Promise(resolve=>{
                this.readCard(resolve)
            })

            if ( num != 6 || num == 3) {
                this.$alert('此卡没有该功能，请确保中途没有换卡','提示')
                this.resetShow()
                this.resetDisabled()
                this.ICCard.readerClose()
                return
            }

             // 网络请求
              this.loading = true



                var params = {
                    CardID:this.CardID,
                    PAN:this.blockData[0],
                    UserId:window.sessionStorage.getItem('id'),
                    RegionCode:window.sessionStorage.getItem('RegionCode'),
                    time:this.dataUtil.formatTime1(new Date())
                }

                 // console.log(JSON.stringify(params));

                  var encryptParams = {
                    evalue:this.$encrypt(JSON.stringify(params))
                  }

                //  console.log(this.$encrypt(JSON.stringify(params)))

                  this.http.post(this.api.baseUrl+this.api.ReWriteRFCodeByPAN,encryptParams)
                  .then(result=>{
                    this.loading = false
                 //   console.log(JSON.stringify(result))
                    if (result.status == '成功') {
                        // 清空所有PAN和数据区
                                          // 秘钥报文
                        var EK = this.rightPadding(result.EK)
                        // 开户
                        var OAF = this.rightPadding(result.OAF)


                       var fontEK = EK.substring(0,32)
                       var afterEK = EK.substring(32,64)


                       var fontOAF = OAF.substring(0,32)
                       var afterOAF = OAF.substring(32,64)


                        // 清空反写区
                        this.clearDataBlock(8)
                        this.clearDataBlock(9)
                        this.clearDataBlock(16)
                        this.clearDataBlock(17)

                        // 把数据写进ICCard
                        var writeBlock = [4,5,12,13]



                        var writeBlockData = [fontEK,afterEK,fontOAF,afterOAF]
                        for (var i = 0; i < writeBlock.length; i++) {

                            if (this.ICCard.cardDirVerifyPassword(0,writeBlock[i],"201803191500")) {

                                if( !this.ICCard.cardWriteHex(writeBlock[i],writeBlockData[i]) ){

                                    this.$alert('写卡失败，请重新读卡进行操作','失败')

                                    this.ICCard.readerClose()
                                    this.resetDisabled()
                                    this.resetShow()
                                    return
                                }


                            }else{
                               // console.log('验证密码错误')
                                this.$alert('验证密码错误，请重新读卡，进行重写卡','失败')
                                this.ICCard.readerClose()
                                this.resetDisabled()
                                this.resetShow()
                                return
                            }
                        }

                        this.$alert(result.cardInfo,'成功')


                    }else{

                      this.$message({
                          type: 'error',
                          message: result.data
                       });

                    }

                    // 无论成功失败都关闭读卡器
                    this.ICCard.readerClose()
                    this.resetDisabled()
                    this.resetShow()
                  })
        },


        /**
        *补卡
        */
        async NewRFCardByHouseRegionCode(){
            // 判断该卡是否有该功能
            var num = await new Promise(resolve=>{
                this.readCard(resolve,true)
            })

           // console.log('功能'+num)
            if ( num != 1 ) {
               this.$alert('此卡没有该功能，请确保中途没有换卡','提示')
                this.resetShow()
                this.resetDisabled()
                this.ICCard.readerClose()
                return
            }else{

                 this.loading = true

                //  var result = await new Promise(resolve=>{
                //     this.NewRFCardChkByHouseRegionCode()
                // })


                var params = {
                    CardID:this.CardID,
                    HouseRegionCode:this.HouseCode,
                    UserId:window.sessionStorage.getItem('id'),
                    RegionCode:window.sessionStorage.getItem('RegionCode'),
                    time:this.dataUtil.formatTime1(new Date())
                }

           //   console.log(JSON.stringify(params));

              var encryptParams = {
                evalue:this.$encrypt(JSON.stringify(params))
              }

            //  console.log(this.$encrypt(JSON.stringify(params)))

              this.http.post(this.api.baseUrl+this.api.NewRFCardByHouseRegionCode,encryptParams)
              .then(result=>{
                this.loading = false
              //  console.log(JSON.stringify(result))
                if (result.status == '成功') {

                    // 秘钥报文
                    var EK = this.rightPadding(result.EK)
                    // 开户
                    var OAF = this.rightPadding(result.OAF)
                    // PAN值
                    var PAN = this.rightPadding(result.PAN)



                   var fontEK = EK.substring(0,32)
                   var afterEK = EK.substring(32,64)


                   var fontOAF = OAF.substring(0,32)
                   var afterOAF = OAF.substring(32,64)


                    // 把数据写进ICCard
                    var writeBlock = [1,4,5,12,13]
                    var writeBlockData = [PAN,fontEK,afterEK,fontOAF,afterOAF]
                    for (var i = 0; i < writeBlock.length; i++) {

                        if (this.ICCard.cardDirVerifyPassword(0,writeBlock[i],"201803191500")) {

                                if( !this.ICCard.cardWriteHex(writeBlock[i],writeBlockData[i]) ){

                                    this.$alert('写卡失败，请重新读卡进行操作','失败')

                                    this.ICCard.readerClose()
                                    this.resetDisabled()
                                    this.resetShow()
                                    return
                                }


                            }else{
                              //  console.log('验证密码错误')
                                this.$alert('验证密码错误，请重新读卡，进行重写卡','失败')
                                this.ICCard.readerClose()
                                this.resetDisabled()
                                this.resetShow()
                                return
                            }
                    }


                    this.$message({
                      type: 'success',
                      message: '补卡成功!'
                   });





                }else{

                  this.$message({
                      type: 'error',
                      message: result.data
                   });


                }
                // 无论成功失败都关闭读卡器
                this.ICCard.readerClose()
                this.resetDisabled()
                this.resetShow()

              })
            }


        },

        /**
        *判断能否进行补卡
        *返回0则不可以 1则能
        */
        // async NewRFCardChkByHouseRegionCode(){
        //     var params = {
        //         UserId:window.sessionStorage.getItem('id'),
        //         RegionCode:window.sessionStorage.getItem('RegionCode'),
        //         HouseRegionCode:this.HouseCode,
        //         time:this.dataUtil.formatTime1(new Date())
        //     }

        //     console.log(JSON.stringify(params));

        //     var encryptParams = {
        //         evalue:this.$encrypt(JSON.stringify(params))
        //     }

        //     console.log(this.$encrypt(JSON.stringify(params)))

        //     this.http.post(this.api.baseUrl+this.api.NewRFCardChkByHouseRegionCode,encryptParams)
        //     .then(result=>{
        //         console.log(result)
        //         if (result.status == '成功') {
        //             return result.data
        //         }else {
        //             this.$message({
        //               type: 'error',
        //               message: result.data
        //             });
        //         }
        //     })

        // },


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
                        if (houses[k].code == this.HouseCode) {
                            console.log('匹配到')
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
            if (window.sessionStorage.getItem('menuName') == 'RechargeFeeRefund'){
                if (node.level == "6") {
                    this.HouseName = node.label
                    this.HouseCode = node.code
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
        HouseCode(newVal){
            this.FifthRegionName = this.findFifthRegionNameByHouseName()
        }
    }
}
</script>
<style>

</style>

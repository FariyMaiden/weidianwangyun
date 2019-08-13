<template>
<!-- 实时监测-》用电查询=》日查询用电 -->
    <div class="bigbox">
        <el-button @click="yuebtn">月用电查询</el-button>
        <div class="style1">

             用户类别：
              
            <el-select v-model="tiaojianchaxun.userCategory" placeholder="请选择用户类别">
                          <el-option
                          v-for="item in userCategoryArr"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                          </el-option>
            </el-select> 
          
            区域：
            <el-cascader
                :options="options"
                :props="{ checkStrictly: true }"
                placeholder="请选择区域"
               
                class="selstyle"
                v-model="optionsValue">
            </el-cascader>
          
            用户名称：
            <el-input class="selstyle"  
            placeholder="请输入用户名称" 
            style="width:200px"
            v-model="tiaojianchaxun.userName"
            ></el-input>
         <div style="marginTop:10px;marginBottom:10px">
            
              时间：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <el-date-picker
                    v-model="tiaojianchaxun.date"
                    type="datetime"
                    placeholder="选择日期时间"
                     value-format="yyyy-MM-dd HH">
                    </el-date-picker>
          </div>
                 
         </div>

        <div class="style1">
            <!-- 选择数据类型：
            
             <el-radio-group v-model="tiaojianchaxun.flag" >
            <el-radio v-for="(item,index) in parasItem" :label="item.value" :key="index">{{item.label}}</el-radio>
            </el-radio-group> -->

                    <div class="tiaojianchaxun">
                         <el-button type="primary" icon="el-icon-setting" @click="chongzhi">重置</el-button>
                         <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>   

                    </div>                        
        </div>

          <div>
                <!--   展示信息  -->
                 <el-table
                    v-loading="loading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    :data="getTablexinxi"
                    border
                    style="width: 100%"
                    :header-cell-style="getRowClass"
                    >
                    <el-table-column
                    v-for="(item,index) in tableHead" 
                    :key="index"
                    :prop="item.id"
                    :label="item.lable"
                   >              
                    </el-table-column>              
                </el-table>

                
                  <!-- 分页 -->
              <div class='fengyeanniu'>
                    <el-pagination                   
                      @current-change="handleCurrentChange"
                      :current-page="currentPage"
                      layout="total, prev, pager, next, jumper"
                      :total="total">
                    </el-pagination>
              </div>

            </div>

    </div>
</template>

<script>
    export default {
        data(){
            return{
              addheight:'',
             
              //获取到的区域树结构数据
              options: [],
              optionsValue:[],

                // 按条件查询定义变量
                tiaojianchaxun:{
                  regionId:null,//电表区域
                  userName:'',//用户名称（原计量点）
                  date:'',//查询日期 
                  flag: '00000000',//查询的数据类型
                  userCategory:'',//用户类别
                },
                tiaojianpage:1,
                userCategoryArr:[],//用户类别数据
               

                tableHead:[

                {
                  lable:'用户名称',
                  id:'userName'
                },
                {
                  lable:'用户类别',
                  id:'userCategory'
                },
                {
                  lable:'表号',
                  id:'meterCode'
                },
                {
                  lable:'区域位置',
                  id:'location'
                },
                {
                  lable:'倍率',
                  id:'multiplying'
                },
                {
                  lable:'时间',
                  id:'readTime'
                },
                {
                  lable:'电量/kWh',
                  id:'value'  
                }            
                // {
                //   lable:'设备编号',
                //   id:'meterAddress'
                // },
                // {
                //   lable:'设备名称',
                //   id:'meterName'
                // },           
              ],

            getTablexinxi: [],//获取到的信息表格

            loading: false,
            currentPage:1,//页码
            total:0,//条总数
          
            }

        },

         created() {
           this.addheight = screen.height - screen.height / 5.57 + "px";
          this.huoqushu();
          this.getyonghuleibei();
             
        },
        methods: {

          
                // 获取用户类别（条件查询使用）
            getyonghuleibei(){
                this.$axios({
                   method:'GET',
                   url:this.api.baseUrl + this.api.sysselect + '/5',
                   type:'json'
               }).then(response=>{
                   console.log(response)
                    if(response.data.success === true){
                    this.userCategoryArr = response.data.data
                }
               }).catch(err=>{
                   console.log(err)
               })

            },
          //跳转到月查询页面
          yuebtn(){
            this.$router.push('/yuedianbiaochaxun')
          },
              // 递归方法
            getTreeData(data){
                // 循环遍历json数据
                for(var i=0;i<data.length;i++){
                    
                    if(data[i].children.length<1){
                        // children若为空数组，则将children设为undefined
                        data[i].children=undefined;
                    }else {
                        // children若不为空数组，则继续 递归调用 本方法
                        this.getTreeData(data[i].children);
                    }
                }
                return data;},
          // 获取区域树
          huoqushu(){
             this.$axios({
             method:'GET',
             url:this.api.baseUrl + this.api.sysregiontree+'/0',
             type:'json'
           }).then(response=>{
             console.log(response)
             if(response.data.success === true){
               console.log(response.data.data)
               this.options = response.data.data
               this.getTreeData(this.options)
               console.log(this.options)
             }
           }).catch(err=>{
             console.log(err)
           })

          },
            
            // 分页控件
            handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.searchshuzi(val);
      },

                //按数字查询的搜索按钮
            searchshuzi(val){   
                this.loading = true;
                let params = this.tiaojianchaxun  
                 params.regionId = this.optionsValue[this.optionsValue.length-1]
                  console.log(this.tiaojianchaxun.regionId)
                  console.log('按页面数字查询')
                  console.log(`区域的选择项`+params.regionId)
                params.page =val
                params.rows = 10
                console.log(params)
                this.$axios({
                    method:'GET',
                    url:this.api.baseUrl + this.api.electricitydata,
                    params:params,
                    type:'json'
                }).then(response=>{
                   console.log(response)
               
                if(response.data.success === true){
                this.loading = false;
                this.total = response.data.data.total
                this.getTablexinxi = []                    
                for(let i = 0; i < response.data.data.list.length; i++){
                    this.getTablexinxi.push(response.data.data.list[i])
                }    
                if( this.getTablexinxi.length === 0){
                   this.$message('查询成功，但是没有数据哦')
                   
                }
                    //  this.optionsValue = []
                      this.huoqushu();
                  
                    }else{
                      this.loading = false;
                    }
              
                }).catch(err=>{
                    this.loading = false;
                    console.log(err)
                })
                              
              
            },

               //更改表头颜色
            getRowClass({ row, column, rowIndex, columnIndex }) {
                if (rowIndex == 0) {
                        return 'background:#a0cfff'
                } else {
                        return ''
                }
            },

               //重置清空条件查询框
            chongzhi(){
                for(let key in this.tiaojianchaxun){
                    this.tiaojianchaxun[key]  = ''

                }
                this.optionsValue = [];
                this.tiaojianchaxun.flag = '00000000';
                 this.huoqushu();

            },

                //按条件查询的搜索按钮
            search(){   
                console.log(this.optionsValue)
                if(this.tiaojianchaxun.date === ''|| this.tiaojianchaxun.flag ===''){
                  window.alert('查询日期不能为空哦~')

                }else{

                this.loading = true;
                let params = this.tiaojianchaxun  

                if(this.optionsValue.length === 0){
                   this.currentPage = 1;
                 
                  console.log('第二次以上调用了吗')
                params.page =this.currentPage
                params.rows = 10
                console.log(params)
                this.$axios({
                    method:'GET',
                    url:this.api.baseUrl + this.api.electricitydata,
                    params:params,
                    type:'json'
                }).then(response=>{
                   console.log(response)
               
                if(response.data.success === true){
                this.loading = false;
                this.total = response.data.data.total
                this.getTablexinxi = []                    
                for(let i = 0; i < response.data.data.list.length; i++){
                    this.getTablexinxi.push(response.data.data.list[i])
                }    
                if( this.getTablexinxi.length === 0){
                   this.$message('查询成功，但是没有数据哦')
                   
                }
                    //  this.optionsValue = []
                      this.huoqushu();
                  
                    }else{
                      this.loading = false;
                    }
                  

                }).catch(err=>{
                  this.loading = false;
                    console.log(err)
                })
                              
                }
                else if(this.optionsValue !== []){
                  this.currentPage = 1;
                  console.log('第一次调用')       
                  
                params.regionId = this.optionsValue[this.optionsValue.length-1]
                // params.regionId =  this.optionsValue.pop() 
                  console.log(`区域的选择项:`+params.regionId)
                params.page =this.currentPage
                params.rows = 10
                
                console.log(params)
                this.$axios({
                    method:'GET',
                    url:this.api.baseUrl + this.api.electricitydata,
                    params:params,
                    type:'json'
                }).then(response=>{
                   console.log(response)
               
                if(response.data.success === true){
                this.loading = false;
                this.total = response.data.data.total
                this.getTablexinxi = []                    
                for(let i = 0; i < response.data.data.list.length; i++){
                    this.getTablexinxi.push(response.data.data.list[i])
                }    
                
                if( this.getTablexinxi.length === 0){
                   this.$message('查询成功，但是没有数据哦')
                   
                }
                    //  this.optionsValue = []
                     this.huoqushu();
                    console.log( this.regionId)
                    }else{
                      this.loading = false;
                    }
                  

                }).catch(err=>{
                  this.loading = false;
                    this.$message('查询失败，网络错误，请联系网络管理员')
                    console.log(err)
                })
                              
                }                                           
                           
                }
            },
        },
    }
</script>

<style>
.tiaojianchaxun{
    margin-top:2%; 
    margin-bottom: 1%;
}
.fengyeanniu{
  margin-top:1%;
  margin-left:30%;
}
.bigbox{
   float: left;
   margin-left: 2%;
   width:100%;
}
.style1{
  margin-top: 2%;
}
.style3{
  margin-top: 5px;
  margin-left: 5.5%;
}
.style4{
  margin-top: 15px;
  margin-left: 5.5%;
}

.msgcenter{
  margin-top: 10%;
  margin-bottom: 10%;
  text-align: center;
}
.selstyle{
    width:15%;
    margin-right: 20px;
  }
.aligncenter{
  margin:0 auto;
  width:80%;
  height:100%;
}
.inputstyle{

  width:30%;
  border: 0 none;
  border-style: none;
  outline: none;
}
.style2{
  margin-left: 20px;
}
</style>

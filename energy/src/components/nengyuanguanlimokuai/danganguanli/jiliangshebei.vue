<template>
<!-- 计量设备 -->
    <div>
        <div class="jiliangshebeibigbox"> 


              <!-- 查询表格筛选条件 -->
           <div class="demo-input-suffix tiaojianchaxun" >
                设备类型：

                 <el-select v-model="tiaojianchaxun.meterType" placeholder="请选择设备类型">
                                <el-option
                                v-for="item in optionsShebeixinhaoshu2"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select> 

                区&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;域：
              
                 <el-cascader
                    placeholder="请选择区域"
                    :options="optionsTiaojian"
                    :props="{ checkStrictly: true }"
                    v-model='optionsTiaojianRegionIds' 
                    clearable
                    class="elCascaderXuan">
                    </el-cascader>

                用户类别：
              
                  <el-select v-model="tiaojianchaxun.userCategory" placeholder="请选择用户类别">
                                <el-option
                                v-for="item in userCategoryArr"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                  </el-select> 

                  <div style="marginTop:10px;marginBottom:10px;marginLeft:-4px;">

                    <!-- 能源用途：
              
                  <el-select v-model="tiaojianchaxun.usageCategory" placeholder="请选择能源用途">
                                <el-option
                                v-for="item in usageCategoryArr"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                  </el-select>  -->

                用户名称：

                   <el-input v-model="tiaojianchaxun.userName" placeholder="请输入用户名称"  style="width:215px"></el-input>


                使用状态：
              
                  <el-select v-model="tiaojianchaxun.useStatus" placeholder="请选择使用状态">
                                <el-option
                                v-for="item in useStatusArr"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                  </el-select> 



                  </div>


                  <el-button type="primary" icon="el-icon-setting" @click="chongzhi">重置</el-button>
                  <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button> 

           </div>

                <!-- 添加表计信息 -->
         
               <el-button icon="el-icon-circle-plus-outline" 
               class="addjiliangshebei" @click="btnadd">添加表计信息</el-button>
                 
              <div>
      
        <el-dialog :visible.sync="dialogFormVisible">
        <el-form ref="form" :model="addbiaojixinxi" label-width="100px"> 
           
                    <el-form-item :label="item.lable" v-for="(item,index) in Addbiaojitablehead"
                     :key="index"                   
                    >
                        <el-input v-model="addbiaojixinxi[item.id]"></el-input>
                    </el-form-item>

                     <el-form-item label="*倍率">
                        <el-input v-model="addbiaojixinxi.multiplying" type="number" placeholder="请输入数字"></el-input>
                    </el-form-item>

                     <el-form-item label='用户类别'>
                             <el-select v-model="addbiaojixinxi.userCategory" placeholder="请选择用户类别">
                               <el-option
                                v-for="(item,index) in optionsyonghuleixin"
                                :key="index"
                                :label="item.label"
                                :value="item.value"                     
                                >
                                </el-option>
                            </el-select>                   
                        </el-form-item>
                         <el-form-item label='能源用途'>
                             <el-select v-model="addbiaojixinxi.usageCategory" placeholder="请选择能源用途">
                                <el-option
                                v-for="item in TianusageCategoryArr"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>                   
                        </el-form-item>

                      <!-- <el-form-item label='*所属父表'>
                             <el-select v-model="addbiaojixinxi.parentId" placeholder="请选择">
                                <el-option
                                v-for="item in optionsparentId"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>                   
                        </el-form-item> -->


                     <el-form-item label='所属网关'>
                             <el-select v-model="addbiaojixinxi.gatewayId" placeholder="请选择">
                                <el-option
                                v-for="item in optionsWuangxinxishu"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>                   
                        </el-form-item>

                        <el-form-item label='*使用状态'>
                             <el-select v-model="addbiaojixinxi.useStatus" placeholder="请选择">
                                <el-option
                                v-for="item in optionsShiyongzhuangtaishu"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>                   
                        </el-form-item>
                    

                        <el-form-item label='*区域'>
                            <el-cascader
                                :options="options"
                                :props="{ checkStrictly: true }"
                                v-model='optionsValue' 
                                clearable
                                class="elCascaderXuan">
                                </el-cascader>
                             </el-form-item>

                      <el-form-item label='*设备型号'>
                             <el-select v-model="addbiaojixinxi.meterBaseId" placeholder="请选择">
                                <el-option
                                v-for="item in optionsShebeixinhaoshu"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>                   
                        </el-form-item>

                        <el-form-item label="*安装日期">
                          <el-date-picker
                            v-model="addbiaojixinxi.installDate"
                            align="right"
                            type="date"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd"
                            >
                            </el-date-picker>
                    </el-form-item>



                </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addbiaojixinxihanshu" v-if='quedinganniu'>确定添加</el-button>
             <el-button type="primary" @click="xiugaibiaojixinxi" v-if="xiugaibtn">修改</el-button>
          </div>
            </el-dialog>
          </div>


        <div class="biaoji" >
        
            <el-table
                :data="getbiaojixinxishuju"
                style="width: 100%"
                :header-cell-style="getRowClass">
                              
                <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item :label="item.lable" v-for="(item,index) in biaojitablehead" :key="index" v-if="index>7">
                        <span>{{ props.row[item.id] }};</span>
                    </el-form-item>

                 

                    </el-form>

                </template>
                </el-table-column>
                 <el-table-column
                :label="item.lable"
                :prop="item.id"  v-for="(item,index) in biaojitablehead" :key="index" v-if="index<=7">
                </el-table-column>
            
                  <el-table-column
                  fixed="right"
                  label="操作"
                 >
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="xiugaiRow(scope.$index, getbiaojixinxishuju)"
                      type="text"
                      size="small"
                     icon="el-icon-edit">
                      
                    </el-button>
                    <el-button
                      @click.native.prevent="deleteRow(scope.$index, getbiaojixinxishuju)"
                      type="text"
                      size="small"
                      icon="el-icon-delete">
                      
                    </el-button>
                  </template>
                </el-table-column>
            </el-table>
               <!-- 分页 -->
              <div class='fengyeanniu'>
               <el-button-group>
                  <el-button type="primary" icon="el-icon-arrow-left" @click='getpreviousPage()' 
                  :disabled='fenyebanduan.hasPreviousPage'>上一页</el-button>
                  <el-button type="primary" @click='getNextPage()'
                  :disabled='fenyebanduan.hasNextPage'
                  >下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
                </el-button-group>
              </div>         
                        
        </div>

    </div>
    </div>
</template>

<script>
// import { type } from 'os';
    export default {
        data(){
            return{
                // 条件查询
                tiaojianchaxun:{
                    meterType:'',//string （原设备型号（需从后台获取数据列表展示））设备类型
                    regionId:'',//array 区域IDs(需从后台获取数据列表展示)
                    userCategory:'',//string 用户类别
                    usageCategory:'',//能源用途
                    userName:'',//用户名称
                    useStatus:'',//使用状态
                },
                optionsTiaojianRegionIds:[],//条件查询区域树选的值
                optionsTiaojian:[],//条件查询区域树
                tiaojianpage:1,
                useStatusArr:[],//查询条件使用状态数据列表
                 //  获取到的用户类别
              optionsyonghuleixin:[],

              


                Addbiaojitablehead:[
                    // {
                    //     lable:'用能单位ID',
                    //     id:'companyId'
                    // },
                    {
                        lable:'*用户名称',
                        id:'userName'
                    },
                    // {
                    //     lable:'设备序列号',
                    //     id:'serialNo'
                    // },
                    {
                        lable:'安装地址',
                        id:'installAddress'
                    },
                    {
                        lable:'*通讯地址',
                        id:'meterAddress'
                    }
                    ,
                    // {
                    //     lable:'*倍率',
                    //     id:'multiplying'
                    // },
                    {
                        lable:'*表号',
                        id:'meterCode'
                    }
                ],
                biaojitablehead:[
                    // {
                    // lable:'通讯地址',
                    // id:'meterAddress'
                    // },
                  
                    {
                    lable:'用户名称',
                    id:'userName'
                    },
                    {
                    lable:'区域',
                    id:'regionName'
                    },
                    {
                    lable:'表号',
                    id:'meterCode'
                    },
                    {
                    lable:'倍率',
                    id:'multiplying'
                    },
                    {
                    lable:'用户类别',
                    id:'userCategory'
                    },
                    {
                    lable:'使用状态',
                    id:'useStatus'
                    },
                    {
                    lable:'安装日期',
                    id:'installDate'
                    },
                    //  {
                    // lable:'设备型号',
                    // id:'meterMode'
                    // },                 
                    // {
                    // lable:'安装地址',
                    // id:'installAddress'
                    // },                  
                ],//表计信息的表头
                quedinganniu:true,//是否显示确定添加按钮
                xiugaibtn:false,//是否显示修改按钮
                dialogFormVisible:false,//是否显示弹框
                getbiaojixinxishuju:[],//获取到的表计信息数据

                addbiaojixinxi:{
                    companyId:'',//~	integer($int64) 所属用能单位id！！(暂时不用填)
                    userName:'',//~	string 用户名称（原计量点）！！                   （必填）
                    installAddress:'',//~	string 安装地址！！                 （选填）
                    installDate:'',//~	string 安装时间                         （必填）
                    meterBaseId:'',//~	integer($int64) 设备型号                 （必填）
                    regionId:'',//~	integer($int64) 所属区域id！！                （必填）
                    serialNo:'',//~	string 设备序列号！！                         （选填）
                    gatewayId:'',//~	integer($int64)所属网关id   1！！          （必填）
                    meterAddress:'',//~	string 表通讯地址   2！！                   （必填）
                    // parentId:0,//~	integer($int64)父表id（）没有：0   2！！          （必填）
                    useStatus:'',//~	integer($int32)minimum : -128 maximum: 127使用状态  （必填）
                    userCategory:'',//用户类别
                    multiplying:'',//倍率
                    meterCode:'',//表号
                    usageCategory:'',//能源用途
                },

            fenyebanduan:{
              endRow: 10,//结束条数
              firstPage: 1,//第一页
              hasNextPage: true,//是否有下一页
              hasPreviousPage: true,//是否有上一页
              // isFirstPage: true,//是否是第一页
              // isLastPage: true,//是否是最后一页
              // lastPage: 1//最后一页页码
            },
                 pagevalue:1,

                optionsShiyongzhuangtaishu:[],//获取到的使用状态树
                optionsShebeixinhaoshu:[],//获取到的设备型号结构树
                optionsWuangxinxishu:[],//获取到的网关信息ID树
                optionsparentId:[],//所属父表ID树
                //区域结构树形结构查询
				 options: [],
                 optionsValue:[],
                 userCategoryArr:[],//获取到的用户类别数据
                 optionsShebeixinhaoshu2:[],
                 TianusageCategoryArr:[],
                 usageCategoryArr:[],
            }    
        },
        created(){
            window.sessionStorage.setItem('tiaojianchaxun','')
            this.getbiaojixinxi();
            this.shebeixinhaoshu();
            this.getjiegoushu();
            this.shiyongzguangtaishu();
            this.suoshuwangguanshu();
            this.suoshufubiaoIDshu();
            this.getyonghuleibei();
             this.getyonghuleibei2();
             this.shebeixinhaoshu2();
             this.nengyuanyongtu();
            this.nengyuanyongtu2();
            this. shiyongzguangtaishu2();

        },
         methods:{

              //查询添加设备信息里面的使用状态树（条件查询里面使用的）
            shiyongzguangtaishu2(){
                this.$axios({
                    method:'GET',
                    url:this.api.baseUrl + this.api.sysselect+'/1',
                    type:'json'
                }).then(response=>{
                    console.log(response)
                    if(response.data.success === true){
                        this.useStatusArr=response.data.data

                    }
                }).catch(err=>{
                    console.log(err)
                })

            },

                //  获取添加表计能源用途

             nengyuanyongtu2(){
                this.$axios({
                    method:'GET',
                    url:this.api.baseUrl + this.api.sysselect + '/3',
                    type:'json'
                }).then(response=>{
                    console.log(response)
                    if(response.data.success === true){
                        this.TianusageCategoryArr=response.data.data

                    }
                }).catch(err=>{
                    console.log(err)
                })
            },


            //  获取能源用途

             nengyuanyongtu(){
                this.$axios({
                    method:'GET',
                    url:this.api.baseUrl + this.api.sysselect + '/3',
                    type:'json'
                }).then(response=>{
                    console.log(response)
                    if(response.data.success === true){
                        this.usageCategoryArr=response.data.data

                    }
                }).catch(err=>{
                    console.log(err)
                })
            },



                // 获取用户类别2（条件查询使用）
            getyonghuleibei2(){
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
                // 获取用户类别
            getyonghuleibei(){
                this.$axios({
                   method:'GET',
                   url:this.api.baseUrl + this.api.sysselect + '/5',
                   type:'json'
               }).then(response=>{
                   console.log(response)
                    if(response.data.success === true){
                    this.optionsyonghuleixin = response.data.data
                }
               }).catch(err=>{
                   console.log(err)
               })

            },
              //触发光标下移focus事件
            focusNextInput(idx,ttlNum){                
                let  inputs = document.getElementById("d1").getElementsByTagName("input");
                                
                if(idx===ttlNum){
                   inputs[0].focus();
                  //this.onSubmit();

                }
                 else{
                  inputs[idx].focus();
                }
            },
  

             //查询添加设备信息里里面的父表ID树
            suoshufubiaoIDshu(){
                  this.$axios({
                    method:'GET',
                    url:this.api.baseUrl + this.api.filematertreeparentId+'/0',
                    type:'json'
                }).then(response=>{
                    console.log(response)
                    if(response.data.success === true){
                        this.optionsparentId=response.data.data

                    }
                }).catch(err=>{
                    console.log(err)
                })

            },


             //查询添加设备信息里面的所属网关ID树
             suoshuwangguanshu(){
                  this.$axios({
                    method:'GET',
                    url:this.api.baseUrl + this.api.filegatewayall,
                    type:'json'
                }).then(response=>{
                    console.log(response)
                    if(response.data.success === true){
                        this.optionsWuangxinxishu=response.data.data

                    }
                }).catch(err=>{
                    console.log(err)
                })

             },

            //查询添加设备信息里面的使用状态树
            shiyongzguangtaishu(){
                this.$axios({
                    method:'GET',
                    url:this.api.baseUrl + this.api.sysselect+'/1',
                    type:'json'
                }).then(response=>{
                    console.log(response)
                    if(response.data.success === true){
                        this.optionsShiyongzhuangtaishu=response.data.data

                    }
                }).catch(err=>{
                    console.log(err)
                })

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

     //区域结构获取结构树
          getjiegoushu(){
         
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
           });

             this.$axios({
             method:'GET',
             url:this.api.baseUrl + this.api.sysregiontree+'/0',
             type:'json'
           }).then(response=>{
             console.log(response)
             if(response.data.success === true){
               console.log(response.data.data)
               this.optionsTiaojian = response.data.data
               this.getTreeData(this.optionsTiaojian )
               console.log(this.options)
             }
           }).catch(err=>{
             console.log(err)
           })

		  },

                //查询添加设备信息里面的设备型号树

            shebeixinhaoshu(){
                this.$axios({
                    method:'GET',
                    url:this.api.baseUrl + this.api.filebasicMaterall,
                    type:'json'
                }).then(response=>{
                    console.log(response)
                    if(response.data.success === true){
                        this.optionsShebeixinhaoshu=response.data.data

                    }
                }).catch(err=>{
                    console.log(err)
                })
            },

                 //查询添加设备信息里面的设备类型树

            shebeixinhaoshu2(){
                this.$axios({
                    method:'GET',
                    url:this.api.baseUrl + this.api.sysselect+"/"+'2',
                    type:'json'
                }).then(response=>{
                    console.log(response)
                    if(response.data.success === true){
                        this.optionsShebeixinhaoshu2=response.data.data

                    }
                }).catch(err=>{
                    console.log(err)
                })
            },




               //重置清空条件查询框
            chongzhi(){
                window.sessionStorage.setItem('tiaojianchaxun','')
                for(let key in this.tiaojianchaxun){
                    this.tiaojianchaxun[key]  = ''

                }
                this.optionsTiaojianRegionIds=[]
                this.getbiaojixinxi();
                this.getjiegoushu();
               
            },

                //按条件查询的搜索按钮
            search(){
                // console.log(e)
                window.sessionStorage.setItem('tiaojianchaxun','yes')
                if(this.optionsTiaojianRegionIds.length !==0){
                this.tiaojianchaxun.regionId = this.optionsTiaojianRegionIds[this.optionsTiaojianRegionIds.length-1]
                // this.tiaojianchaxun.regionIds = this.optionsTiaojianRegionIds.pop()
                console.log( this.tiaojianchaxun.regionId)
                }
                
                let params = this.tiaojianchaxun
                console.log('条件查询参数')
               console.log(params)
                // params.page = 1
                params.page = this.tiaojianpage
                params.rows = 10
                this.$axios({
                    method:'GET',
                    url:this.api.baseUrl + this.api.filemater,
                    params:params,
                    type:'json'
                }).then(response=>{
                   console.log(response)
               
                if(response.data.success === true){
                     console.log(response)
                    if(response.data.data.hasPreviousPage === false){
                        this.fenyebanduan.hasPreviousPage = true
                        }
                        else  if(response.data.data.hasPreviousPage === true){
                        this.fenyebanduan.hasPreviousPage = false
                        }

                        if(response.data.data.hasNextPage === false){
                        this.fenyebanduan.hasNextPage = true
                        }
                        else  if(response.data.data.hasNextPage === true){
                        this.fenyebanduan.hasNextPage = false                           
                        }
                this.getbiaojixinxishuju = []  
                this.getjiegoushu(); 
                this.getyonghuleibei2();
                 
                for(let i = 0; i < response.data.data.list.length; i++){
                    this.getbiaojixinxishuju.push(response.data.data.list[i])
                    console.log(this.getbiaojixinxishuju)
                     if(this.getbiaojixinxishuju[i].useStatus === 0){
                               this.getbiaojixinxishuju[i].useStatus = '未使用'
                           }else if(this.getbiaojixinxishuju[i].useStatus === 1){
                               this.getbiaojixinxishuju[i].useStatus = '启用'
                           }else if(this.getbiaojixinxishuju[i].useStatus === 2){
                               this.getbiaojixinxishuju[i].useStatus = '停用'
                           }
                }
                this.tiaojianpage = 1
                    }

                }).catch(err=>{
                    console.log(err)
                })

            },
              //点击上一页按钮
            getpreviousPage(){           
               console.log(window.sessionStorage.getItem('tiaojianchaxun'))
                if(window.sessionStorage.getItem('tiaojianchaxun') === 'yes'){
                    this.tiaojianpage -=1
                    this.search()
                    this.getjiegoushu();
                }else{
                      this.pagevalue -= 1;
                      this.getbiaojixinxi();
                      this.getjiegoushu();

                }
            },
            //点击获取下一页
            getNextPage(){           
                console.log(window.sessionStorage.getItem('tiaojianchaxun'))
                   if(window.sessionStorage.getItem('tiaojianchaxun') === 'yes'){
                    this.tiaojianpage +=1
                    this.search()
                    this.getjiegoushu();
                }else{
                     this.pagevalue += 1;
                     this.getbiaojixinxi();
                     this.getjiegoushu();

                }
            },
             //点击添加按钮
             btnadd(){          
                  if(window.sessionStorage.getItem('tiaojianchaxun') === 'yes'){
                        this.search();  
                        this.getjiegoushu();                    
                    }else{
                        this.getbiaojixinxi();  
                        this.getjiegoushu();                    
                    }
   
                        this.dialogFormVisible = true;
                        this.xiugaibtn = false;
                        this.quedinganniu = true;    
                        this. qinkongtankuan();                      
             },
                //更改表头颜色
            getRowClass({ row, column, rowIndex, columnIndex }) {
                if (rowIndex == 0) {
                        return 'background:#a0cfff'
                } else {
                        return ''
                }
            },
          

             //获取表计信息数据
             getbiaojixinxi(){
                  this.$axios({
                    method: "GET",
                    url:this.api.baseUrl+this.api.filemater,
                    params:{page:this.pagevalue,rows:10} ,
                    type: "json"
                }).then(response=>{
                     if(response.data.success === true){
                       
                        if(response.data.data.hasPreviousPage === false){
                            this.fenyebanduan.hasPreviousPage = true
                            }
                            else  if(response.data.data.hasPreviousPage === true){
                            this.fenyebanduan.hasPreviousPage = false
                            }

                            if(response.data.data.hasNextPage === false){
                            this.fenyebanduan.hasNextPage = true
                            }
                            else  if(response.data.data.hasNextPage === true){
                            this.fenyebanduan.hasNextPage = false                         
                            }

                        this.getbiaojixinxishuju = []
                        this.getjiegoushu();
                        for(let i = 0; i < response.data.data.list.length; i++){
                            this.getbiaojixinxishuju.push(response.data.data.list[i])
                           if(this.getbiaojixinxishuju[i].useStatus === 0){
                               this.getbiaojixinxishuju[i].useStatus = '未使用'
                           }else if(this.getbiaojixinxishuju[i].useStatus === 1){
                               this.getbiaojixinxishuju[i].useStatus = '启用'
                           }else if(this.getbiaojixinxishuju[i].useStatus === 2){
                               this.getbiaojixinxishuju[i].useStatus = '停用'
                           }
                        }
                    }
                    // console.log(response.data.data.list)
                    console.log(this.getbiaojixinxishuju)
                     
                }).catch(err=>{
                    console.log(err)
                })

             },
             //修改表计信息数据
             xiugaibiaojixinxi(){
              if(this.addbiaojixinxi.userName===''||
                this.addbiaojixinxi.meterBaseId===''||
                this.addbiaojixinxi.regionId===''||
               
                this.addbiaojixinxi.meterAddress===''||
                this.addbiaojixinxi.useStatus===''||
                this.addbiaojixinxi.installDate === '' ||
                this.addbiaojixinxi.multiplying === '' || this.addbiaojixinxi.meterCode === ''){
                    window.alert('带"*"的填框都是必填的哦~')
                }else{
                
                 console.log(this.addbiaojixinxi.regionId)
                 console.log(this.optionsValue)
                //  this.addbiaojixinxi.regionId = this.optionsValue.pop()

                this.addbiaojixinxi.regionId = this.optionsValue[this.optionsValue.length-1]
                let params = this.addbiaojixinxi;
                 
                this.$axios({
                    method:'PUT',
                    url:this.api.baseUrl + this.api.filemater,
                    data:params,
                    type:'json'
                }).then(response=>{
                    if(response.data.success === true){
                         this.$message('修改成功')
                        // window.alert('修改成功')
                        this.dialogFormVisible = false;
                        this.qinkongtankuan();
                if(window.sessionStorage.getItem('tiaojianchaxun') === 'yes'){
                    this.search();		
                    this.getjiegoushu();		
                }else{
                    this.getbiaojixinxi();	
                    this.getjiegoushu();			
                }
                    }
                }).catch(err=>{
                    console.log(err)
                })
                }
             },
            //点击修改按钮弹出弹框
             xiugaiRow(index,rows){

                  
                 this.qinkongtankuan();
                if(this.getbiaojixinxishuju[index].useStatus === '未使用'){
                    this.getbiaojixinxishuju[index].useStatus = 0
                }else if(this.getbiaojixinxishuju[index].useStatus === '启用'){
                    this.getbiaojixinxishuju[index].useStatus = 1
                }else if(this.getbiaojixinxishuju[index].useStatus === '停用'){
                    this.getbiaojixinxishuju[index].useStatus = 2
                }
         
                this.addbiaojixinxi.id = this.getbiaojixinxishuju[index].id
                this.addbiaojixinxi = this.getbiaojixinxishuju[index]
                this.dialogFormVisible = true;
                this.xiugaibtn = true;
                this.quedinganniu = false;

             },
             //清空弹框里的数据
             qinkongtankuan(){
                   for(let key in  this.addbiaojixinxi){
                          this.addbiaojixinxi[key] = ''
                      }
             },
             //添加表计信息数据
             addbiaojixinxihanshu(){
                console.log(this.addbiaojixinxi.parentId)
                console.log(typeof(this.addbiaojixinxi.parentId))
                console.log(this.addbiaojixinxi.gatewayId)
                console.log(typeof(this.addbiaojixinxi.useStatus))
                console.log(this.optionsValue);
                // this.addbiaojixinxi.regionId = this.optionsValue.pop()
                this.addbiaojixinxi.regionId = this.optionsValue[this.optionsValue.length-1]
                console.log(this.addbiaojixinxi.regionId)
                console.log(typeof(this.addbiaojixinxi.meterBaseId))
                console.log(this.addbiaojixinxi)
                if(this.addbiaojixinxi.userName===''||
                this.addbiaojixinxi.meterBaseId===''||
                this.addbiaojixinxi.regionId===''||
                
                this.addbiaojixinxi.meterAddress===''||
                this.addbiaojixinxi.useStatus===''||
                this.addbiaojixinxi.installDate === '' ||  
                this.addbiaojixinxi.multiplying === ''
                || this.addbiaojixinxi.meterCode === ''){
                    window.alert('带"*"的填框都是必填的哦~')
                }else{
               this.quedinganniu=false;//网关确定按钮的是否显示
               delete this.addbiaojixinxi.id
                let params = this.addbiaojixinxi;
                console.log(params)
               this.$axios({
                    method:'POST',
                    url:this.api.baseUrl + this.api.filemater,
                    data:params,
                    type:'json'
               }).then(response=>{
                   console.log(response)
                   if(response.data.success === true){
                     this.dialogFormVisible = false;
                      this.$message('添加成功')
                      this.quedinganniu=true;//网关确定按钮的是否显示
                      this.qinkongtankuan();
                    if(window.sessionStorage.getItem('tiaojianchaxun') === 'yes'){
                        this.search();  
                        this.getjiegoushu();                    
                    }else{
                        this.getbiaojixinxi();  
                        this.getjiegoushu();                    
                    }

                      console.log(this.addbiaojixinxi)
                   }else{
                       window.alert("输入有错误，请检查各数据内容是否符合要求~")
                   }
               }).catch(err=>{
                   console.log(err)
               })}

             },
             //删除表计信息数据
            deleteRow(index, rows) {

                 this.$confirm('此操作将永久删除该设备信息, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {                                         
                let id = this.getbiaojixinxishuju[index].id
                this.$axios({
                    method:'DELETE',
                    url:this.api.baseUrl + this.api.filemater + "/" + id,
                    type:'json'
                }).then(response=>{
                    if(response.data.success === true){
                        rows.splice(index, 1);
                      this.$message({
                                        type: 'success',
                                        message: '删除成功!'
                                    });
                           if(window.sessionStorage.getItem('tiaojianchaxun') === 'yes'){
                                    this.search()
                                }else{
                                    this.getbiaojixinxi();
                                }
                    }
                })        
                        }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });          
                        });



                }    
            },
        
    }
</script>

<style>
.addjiliangshebei{
    margin-left: 92%;
    margin-bottom: 1%;
    /* margin-top: 1%; */
    background-color: #45b0e8;
    
    
}

.jiliangshebeibigbox{
    float: left;
     margin-left: 2%;
    width: 100%;
    min-width: 800px;
  
}
/* .buttonxuanze{
    margin: 10px;
} */
.fengyeanniu{
  margin-top:1%;
  margin-left: 35%;
}
.tiaojianchaxun{
    margin-top:1%; 
}
</style>
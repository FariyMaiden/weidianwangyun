<template>
    <div>
        <div class="bigbox">

            <div >

                   <!-- 查询表格筛选条件 -->
           <div class="demo-input-suffix tiaojianchaxun" >
                <!-- 所属公司：
                <el-input
                    placeholder="请输入所属公司"
                    prefix-icon="el-icon-search"
                    v-model="tiaojianchaxun.companyId"
                    style="width:300px"
                     >
                </el-input> -->

                 网关名称：
                <el-input
                    placeholder="请输入网关名称"
                    prefix-icon="el-icon-search"
                    v-model="tiaojianchaxun.deviceName"
                     style="width:200px">
                </el-input>
                <!-- 
                 设备编号：
               <el-input
                    placeholder="请输入设备编号"
                    prefix-icon="el-icon-search"
                    v-model="tiaojianchaxun.deviceNo"
                     style="width:200px">
                </el-input> -->

                  <!-- 安装日期：
               <el-date-picker
                    v-model="tiaojianchaxun.installDate"
                    type="date"
                    placeholder="选择日期">
                 </el-date-picker> -->

                    <el-button type="primary" icon="el-icon-setting" @click="chongzhi">重置</el-button>
                    <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>              
                </div>

                <!-- 添加网关设备 -->
                  <el-button icon="el-icon-circle-plus-outline" 
              @click="btnaddwangguan" class="addjiliangshebei">添加网关信息</el-button>
            </div>

              <div class="wangguan">

        
        <el-dialog :visible.sync="dialogFormVisiblewangguan">
        <el-form ref="form" :model="addwangguanxinxi" label-width="100px"> 
                        
                    <el-form-item :label='item.lable' v-for="(item,index) in wangguangtablehead"
                     :key="index">
                        <el-input v-model="addwangguanxinxi[item.id]"></el-input>
                    </el-form-item>   

                     <el-form-item label='*使用状态'>
                             <el-select v-model="addwangguanxinxi.useStatus" placeholder="请选择">
                                <el-option
                                v-for="item in optionsShiyongzhuangtaishu"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>                   
                        </el-form-item>
                    
                    <el-form-item label='*设备型号'>
                             <el-select v-model="addwangguanxinxi.meterTypeId" placeholder="请选择">
                                <el-option
                                v-for="item in optionsShebeixinhaoshu"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>                   
                        </el-form-item>
                    
                    <el-form-item label='*安装日期'>
            <el-date-picker
                  v-model="addwangguanxinxi.installDate"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
   </el-form-item>
                              
                 </el-form>

                    <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisiblewangguan = false">取 消</el-button>
            <el-button type="primary" @click="addwangguanxinxihanshu" v-if='WGquedinganniu'>确定添加</el-button>
             <el-button type="primary" @click="xiugaiwangguanxinxi" v-if="WGxiugaibtn">确定修改</el-button>
          </div>
         
            </el-dialog>


          <el-table
                :data="getwangguanshuju"
                style="width: 100%"
                :header-cell-style="getRowClass">
                              
                <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item :label="item.lable" v-for="(item,index) in wangguangtablehead2" :key="index" v-if='index>7'>
                        <span>{{ props.row[item.id] }}；</span>
                    </el-form-item>

                    </el-form>
                </template>
                </el-table-column>


                 <el-table-column
                :label="item.lable"
                :prop="item.id" v-for="(item,index) in wangguangtablehead2" :key="index">
                </el-table-column>
                 
                  <el-table-column
                  fixed="right"
                  label="操作"
                 >
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="xiugaiRowWG(scope.$index, getwangguanshuju)"
                      type="text"
                      size="small"
                     icon="el-icon-edit">
                      
                    </el-button>
                    <el-button
                      @click.native.prevent="deleteRowWG(scope.$index, getwangguanshuju)"
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
                  <el-button type="primary" icon="el-icon-arrow-left" @click='WGgetpreviousPage()' 
                  :disabled='fenyebanduan.hasPreviousPage'>上一页</el-button>
                  <el-button type="primary" @click='WGgetNextPage()'
                  :disabled='fenyebanduan.hasNextPage'
                  >下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
                </el-button-group>
              </div>
             

        </div>

        </div>

    </div>
</template>

<script>
    export default {
        data(){
            return{

                  // 按条件查询定义变量
                tiaojianchaxun:{
                    // companyId:'',//integer($int64)(query)所属公司
                    deviceName:'',//string(query)	网关名称（原设备名称）
                    // deviceNo:'',//string(query)设备编号
                    // installDate:''//string(query)	安装日期
                               },
                    tiaojianpage:1,
                    
                  wangguangtablehead:[
                    // {
                    //     lable:'*设备编号',
                    //     id:'deviceNo'
                    // },
                     {
                        lable:'*网关名称',
                        id:'deviceName'
                    },
                   
                     {
                        lable:'SIM卡',
                        id:'simNo'
                    },
                    //  {
                    //     lable:'*设备型号',
                    //     id:'meterTypeId'
                    // },
                                 
                    //  {
                    //     lable:'所属单位',
                    //     id:'companyId'
                    // },
                                      
                     {
                        lable:'安装地址',
                        id:'installAddress'
                    },
                    //  {
                    //     lable:'安装时间',
                    //     id:'installDate'
                    // },
                     {
                        lable:'*发布主题',
                        id:'publishTopic'
                    },
                     {
                        lable:'*订阅主题',
                        id:'subscribeTopic'
                    },
                    // {
                    //      lable:'*使用状态：',
                    //     id:'useStatus'

                    // },
                     
                    //  {
                    //     lable:'备注：',
                    //     id:'memo'
                    // },
                ],//网关信息表头

                  wangguangtablehead2:[
                    // {
                    //     lable:'*设备编号',
                    //     id:'deviceNo'
                    // },
                     {
                        lable:'网关名称',
                        id:'deviceName'
                    },
                   
                     {
                        lable:'SIM卡',
                        id:'simNo'
                    },
                     {
                        lable:'设备型号',
                        id:'meterMode'
                    },
                                 
                    //  {
                    //     lable:'所属单位',
                    //     id:'companyId'
                    // },
                                      
                     {
                        lable:'安装地址',
                        id:'installAddress'
                    },
                     {
                        lable:'安装时间',
                        id:'installDate'
                    },
                     {
                        lable:'发布主题',
                        id:'publishTopic'
                    },
                     {
                        lable:'订阅主题',
                        id:'subscribeTopic'
                    },
                    {
                         lable:'使用状态',
                        id:'useStatus'

                    },
                     
                    //  {
                    //     lable:'备注：',
                    //     id:'memo'
                    // },
                ],//网关信息表头

              getwangguanshuju:[],//获取到的网关数据
                addwangguanxinxi:{
                    // companyId:'',//~	integer($int64)所属单位id        (暂时不用必填) 
                    deviceName:'',//~   string设备名称                   （必填）
                    deviceNo:'',//~	    string设备编号                   （必填）
                    installAddress:'',//~	string安装地址               （选填）
                    installDate:'',//~	string($date-time) 安装时间      （必填） 
                    memo:'',//~	string备注                               （选填）
                    meterTypeId:'',//~	integer($int64) 设备型号          （必填）
                    publishTopic:'',//~	string发布主题                    （必填）
                    simNo:'',//~	string sim卡号                        （选填）
                    subscribeTopic:'',//~	string订阅主题                （必填）
                    useStatus:''//~	integer($int32) minimum: -128 maximum: 127使用状态   （必填）
                                },//添加网关信息
                dialogFormVisiblewangguan:false,
                WGquedinganniu:true,//网关确定按钮的是否显示
                WGxiugaibtn:false,//确定修改的按钮是否显示

                 fenyebanduan:{
                    endRow: 10,//结束条数
                    firstPage: 1,//第一页
                    hasNextPage: true,//是否有下一页
                    hasPreviousPage: true,//是否有上一页
                    // isFirstPage: true,//是否是第一页
                    // isLastPage: true,//是否是最后一页
                    // lastPage: 1//最后一页页码
                    },
                  WGpagevalue:1,

                  optionsShebeixinhaoshu:[],//获取到的设备型号结构树
                  optionsShiyongzhuangtaishu:[],//获取到的使用状态树
            }

         
        },
        created(){
             this.getwangguandata();
             this.shebeixinhaoshu();
             this.shiyongzguangtaishu();
             window.sessionStorage.setItem('tiaojianchaxun','') 
        },
        methods:{

            //查询添加网关设备信息里面的使用状态树
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

            //查询添加网关设备信息里面的设备型号树

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

              //重置清空条件查询框
            chongzhi(){
                for(let key in this.tiaojianchaxun){
                    this.tiaojianchaxun[key]  = ''

                }
                window.sessionStorage.setItem('tiaojianchaxun','')
				this.getwangguandata();

            },
                 //按条件查询的搜索按钮
            search(){
                window.sessionStorage.setItem('tiaojianchaxun','yes')
                
                let params = this.tiaojianchaxun
               
                params.page = this.tiaojianpage
                params.rows = 10
                this.$axios({
                    method:'GET',
                    url:this.api.baseUrl + this.api.filegateway,
                    params:params,
                    type:'json'
                }).then(response=>{
                   console.log(response)
               
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
                this.getwangguanshuju = []                    
                for(let i = 0; i < response.data.data.list.length; i++){
                    this.getwangguanshuju.push(response.data.data.list[i])
                     if(this.getwangguanshuju[i].useStatus === 0){
                               this.getwangguanshuju[i].useStatus = '未使用'
                           }else if(this.getwangguanshuju[i].useStatus === 1){
                               this.getwangguanshuju[i].useStatus = '启用'
                           }else if(this.getwangguanshuju[i].useStatus === 2){
                               this.getwangguanshuju[i].useStatus = '停用'
                           }
                }
                console.log( this.getwangguanshuju)
                this.tiaojianpage = 1;
                    }

                }).catch(err=>{
                    console.log(err)
                })

            },

             
               //网关点击上一页按钮
            WGgetpreviousPage(){
            //   this.WGpagevalue -= 1;
            //   this.getwangguandata();

                console.log(window.sessionStorage.getItem('tiaojianchaxun'))
                if(window.sessionStorage.getItem('tiaojianchaxun') === 'yes'){
                    this.tiaojianpage -=1
                    this.search()
                }else{
                    this.WGpagevalue -= 1;
                    this.getwangguandata();
                }

            },
            //网关点击获取下一页
            WGgetNextPage(){
              

                console.log(window.sessionStorage.getItem('tiaojianchaxun'))
                if(window.sessionStorage.getItem('tiaojianchaxun') === 'yes'){
                    this.tiaojianpage +=1
                    this.search()
                }else{
                    this.WGpagevalue += 1;
                    this.getwangguandata();
                }
            },

               //网关模块
            //获取到网关表格数据
            getwangguandata(){
                this.$axios({
                    method:'GET',
                    url:this.api.baseUrl+this.api.filegateway,
                    params:{page:this.WGpagevalue,rows:10} ,
                    type: "json"
                }).then(response=>{
                    console.log(response)
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

                        this.getwangguanshuju = []                 
                        for(let i = 0; i < response.data.data.list.length; i++){
                            this.getwangguanshuju.push(response.data.data.list[i])

                            if(this.getwangguanshuju[i].useStatus === 0){
                               this.getwangguanshuju[i].useStatus = '未使用'
                           }else if(this.getwangguanshuju[i].useStatus === 1){
                               this.getwangguanshuju[i].useStatus = '启用'
                           }else if(this.getwangguanshuju[i].useStatus === 2){
                               this.getwangguanshuju[i].useStatus = '停用'
                           }


                            // console.log('406网关信息id打印：'+response.data.data.list[i].id)
                        }
                    }

                }).catch(err=>{
                    console.log(err)
                })

            },
            //点击添加网关信息按钮
            btnaddwangguan(){
               
                 this.getwangguandata();
                this.WGquedinganniu=true;//网关确定按钮的是否显示
                this.WGxiugaibtn=false;//确定修改的按钮是否显示
               
                    this.dialogFormVisiblewangguan = true;
                     for(let key in  this.addwangguanxinxi){
                          this.addwangguanxinxi[key] = ''
                      }
               

            },
            //确定添加网关信息数据
            addwangguanxinxihanshu(){
                 console.log(typeof(this.addwangguanxinxi.useStatus))
                 console.log(typeof(this.addwangguanxinxi.meterTypeId))
                delete this.addwangguanxinxi.id
              if(this.addwangguanxinxi.deviceName === '' || 
              
                this.addwangguanxinxi.meterTypeId === '' ||
                this.addwangguanxinxi.publishTopic === '' ||
                this.addwangguanxinxi.subscribeTopic === '' ||
                this.addwangguanxinxi.useStatus === '' ||
                this.addwangguanxinxi.installDate === ''){
                  
                    window.alert('标记"*"的都是必填项哦~')
              }else{
                this.WGquedinganniu=false;//网关确定按钮的是否显示
                let params = this.addwangguanxinxi;
                this.$axios({
                    method:'POST',
                    url:this.api.baseUrl+this.api.filegateway,
                    data:params ,
                    type: "json"
                }).then(response=>{
                    console.log(response)
                    if(response.data.success === true){
                        
                          this.$message('添加成功')
                          this.WGquedinganniu=true;//网关确定按钮的是否显示
                       for(let key in  this.addwangguanxinxi){
                          this.addwangguanxinxi[key] = ''
                      }                      
                         if(window.sessionStorage.getItem('tiaojianchaxun') === 'yes'){
							this.search();
							
                        }else{
						 	this.getwangguandata();
							
                         }
                        this.dialogFormVisiblewangguan = false;
                    }
                }).catch(err=>{
                    console.log(err)
                })}
            },
            //确定修改网关信息数据
            xiugaiwangguanxinxi(){
            if(this.addwangguanxinxi.deviceName === '' || 
                
                this.addwangguanxinxi.meterTypeId === '' ||
                this.addwangguanxinxi.publishTopic === '' ||
                this.addwangguanxinxi.subscribeTopic === '' ||
                this.addwangguanxinxi.useStatus === '' ||
                this.addwangguanxinxi.installDate === ''){
                  
                    window.alert('标记"*"的都是必填项哦~')
              }else{
                let params = this.addwangguanxinxi;
                this.$axios({
                    method:'PUT',
                    url:this.api.baseUrl+this.api.filegateway,
                    data:params ,
                    type: "json"
                }).then(response=>{
                    if(response.data.success === true){
                        // window.alert('修改成功！')
                         this.$message('修改成功')
             if(window.sessionStorage.getItem('tiaojianchaxun') === 'yes'){
					this.search();
					
                }else{
					this.getwangguandata();
					
                }

                        this.dialogFormVisiblewangguan = false;
                         for(let key in  this.addwangguanxinxi){
                          this.addwangguanxinxi[key] = ''
                      }
                    
                    }
                }).catch(err=>{
                    console.log(err)
                })}

            },
            //点击修改网关按钮
            xiugaiRowWG(index,rows){
                            
                if(this.getwangguanshuju[index].useStatus === '未使用'){
                    this.getwangguanshuju[index].useStatus = 0
                }else if(this.getwangguanshuju[index].useStatus === '启用'){
                    this.getwangguanshuju[index].useStatus = 1
                }else if(this.getwangguanshuju[index].useStatus === '停用'){
                    this.getwangguanshuju[index].useStatus = 2
                }

                this.addwangguanxinxi.id = this.getwangguanshuju[index].id
                this.dialogFormVisiblewangguan=true;
                this.WGquedinganniu=false;//网关确定按钮的是否显示
                this.WGxiugaibtn=true;//确定修改的按钮是否显示
                this.addwangguanxinxi = this.getwangguanshuju[index]

            },
            //点击移除按钮
            deleteRowWG(index,rows){

                  this.$confirm('此操作将永久删除该设备信息, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {
                             let id = this.getwangguanshuju[index].id
                console.log(id)
                this.$axios({
                    method:'DELETE',
                    url:this.api.baseUrl+this.api.filegateway + '/' + id,
                    type: "json"
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
                                    this.getwangguandata();
                                }
                        // this.getwangguandata();
                       
                                    }                
                })
              
                        }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });          
                        });
            },
            
                //更改表头颜色
            getRowClass({ row, column, rowIndex, columnIndex }) {
                if (rowIndex == 0) {
                        return 'background:#a0cfff'
                } else {
                        return ''
                }
            },

        }
        
    }
</script>

<style>
.bigbox{
    float: left;
    margin-left: 2%;
    width: 100%;

}
.addjiliangshebei{
    margin-left: 92%;
    /* margin-bottom: 1%;
    margin-top: 1%; */
    background-color: #45b0e8;
    
}
.fengyeanniu{
  margin-top:1%;
  margin-left: 35%;
}
.tiaojianchaxun{
    margin-top:1%; 
}


</style>
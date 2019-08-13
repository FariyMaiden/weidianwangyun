<template>
<!-- 系统管理》数据字典 -->
    <div>
        <div class="shujuzidianbox">
            <!-- 数据字典大类的查询和添加 -->
            <div v-if="showtypename">
                  <el-button icon="el-icon-circle-plus-outline" class="addshujuzidian" @click="btnadd">添加类型</el-button>
                  <el-dialog :visible.sync="dialogFormVisible">
            <el-form ref="form" :model="addshujuzidian" label-width="100px" >                       
                    <el-form-item label="类型名称">
                        <el-input v-model="addshujuzidian.typeName"></el-input>
                    </el-form-item>  
                    <el-form-item label="类型备注">
                        <el-input v-model="addshujuzidian.memo"></el-input>
                    </el-form-item>                
                <el-form-item>
                </el-form-item>                
                </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit">确定添加</el-button>       
          </div>
            </el-dialog>            
            </div>


            <div v-if="showtypename">
                 <el-table
                    :data="getshujuzidian"
                    border
                    style="width: 100%"
                    :header-cell-style="getRowClass"
                    >
                    <el-table-column
                    v-for="(item,index) in tableHead" :key="index"
                    :prop="item.id"
                    :label="item.lable"
                   >
                    </el-table-column>
                     <el-table-column
                  fixed="right"
                  label="操作"
                 >
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="typexiangqingRow(scope.$index, getshujuzidian)"
                      type="text"
                      size="small"
                     icon='el-icon-search'>
                      查看类型详情
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


            <!-- 数据字典类型详情的查询和添加 -->
            <div v-if="showleixinxiangqing">
              <el-button type="primary" @click="hobacktype">返回</el-button>
               <el-button icon="el-icon-circle-plus-outline" class="addshujuzidian" @click="btnaddleixinxiangqing">添加类型详情</el-button>
                 <el-table
                    :data="getshujuzidianxiangqing"
                    border
                    style="width: 100%"
                    :header-cell-style="getRowClass"
                    >
                    <el-table-column
                    v-for="(item,index) in tableHeadxiangqing" :key="index"
                    :prop="item.id"
                    :label="item.lable"
                   >
                    </el-table-column>              
                </el-table>  
                
                
                 <div>
                  <el-dialog :visible.sync="dialogFormVisibleleixin">
            <el-form ref="form" :model="addshujuzidianleixinxiangqing" label-width="100px" >                       
                    <el-form-item label="类型键">
                        <el-input v-model="addshujuzidianleixinxiangqing.detailKey"></el-input>
                    </el-form-item>   
                    <el-form-item label="类型值">
                        <el-input v-model="addshujuzidianleixinxiangqing.detailValue"></el-input>
                    </el-form-item>                
                    <el-form-item label="类型备注">
                        <el-input v-model="addshujuzidianleixinxiangqing.memo"></el-input>
                    </el-form-item>   
                <el-form-item>
                </el-form-item>                
                </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleleixin = false">取 消</el-button>
            <el-button type="primary" @click="onSubmitDetail">确定添加类型详情</el-button>       
          </div>
            </el-dialog>            
            </div>


            </div>


        </div>

    </div>
</template>

<script>
    export default {
        data(){
            return{
               
                dialogFormVisible:false,//弹窗是否显示
                showtypename:true,//是否显示类型名称
                showleixinxiangqing:false,//是否显示查询和添加类型详情 
                
                tableHead:[{
                  lable:'ID',
                  id:'id'
                },
                {
                  lable:'类型名称',
                  id:'typeName'
                }, 
                {
                  lable:'备注',
                  id:'memo'
                }],
                            
                addshujuzidian:{              
                    typeName:'',//类型名称
                    memo:'',
                },//添加数据字典信息
                getshujuzidian:[],//获取到的数据信息数据

                //数据字典详细情况
                getshujuzidianxiangqing:[],//获取到的数据字典的的类型详情
                dialogFormVisibleleixin:false,//显示添加类型详情弹框
                tableHeadxiangqing:[
                    {
                    lable:'ID',
                    id:'id'
                    },
                     {
                    lable:'类型名称',
                    id:'typeId'
                    },
                     {
                    lable:'类型key',
                    id:'detailKey'
                    },
                     {
                    lable:'类型Value',
                    id:'detailValue'
                    },
                     {
                    lable:'类型备注',
                    id:'memo'
                    },
                ],
                addshujuzidianleixinxiangqing:{
                    id:'',
                    detailKey:'',
                    detailValue:'',
                    memo:''
                } ,
                 fenyebanduan:{
              endRow: 10,//结束条数
              firstPage: 1,//第一页
              hasNextPage: true,//是否有下一页
              hasPreviousPage: true,//是否有上一页
              // isFirstPage: true,//是否是第一页
              // isLastPage: true,//是否是最后一页
              // lastPage: 1//最后一页页码
            },
             pagevalue:1

            }
        },
        created(){
           this.getshujuzidianhanshu();
        },
        methods:{
              //点击上一页按钮
            getpreviousPage(){
              this.pagevalue -= 1;
              this.getshujuzidianhanshu();
            },
            //点击获取下一页
            getNextPage(){
              this.pagevalue += 1;
              this.getshujuzidianhanshu();
            },


               //更改表头颜色
            getRowClass({ row, column, rowIndex, columnIndex }) {
                if (rowIndex == 0) {
                        return 'background:#a0cfff'
                } else {
                        return ''
                }
            },
            //返回数据字典类型

            hobacktype(){
               this.showtypename = true;
               this.showleixinxiangqing = false;
            },
            //点击查看和添加类型详情
            typexiangqingRow(index,row){
                this.showtypename = false;
                this.showleixinxiangqing = true;
                window.sessionStorage.setItem('lenxinID',this.getshujuzidian[index].id)
                let typeId = this.getshujuzidian[index].id
                this.$axios({
                    method:'GET',
                    url:this.api.baseUrl+this.api.sysdataDetail + '/' + typeId,
                    params:{page:1,rows:10} ,
                    type:'json'
                }).then(response=>{
                    console.log(response)
                    this.getshujuzidianxiangqing = []                    
                        for(let i = 0; i < response.data.data.length; i++){
                            this.getshujuzidianxiangqing.push(response.data.data[i])
                        }

                }).catch(err=>{
                    console.log(err)
                })
            },
            //确认添加类型详情
            onSubmitDetail(){
               
                let params = this.addshujuzidianleixinxiangqing;
                params.typeId = window.sessionStorage.getItem('lenxinID')
                this.$axios({
                    method:'POST',
                    url:this.api.baseUrl+this.api.sysdataDetail,
                    data:params,
                    type:'json'
                }).then(response=>{
                    console.log(response)
                   if(response.data.success === true){
                        window.alert('添加成功')
                        
                       for(let key in  this.addshujuzidianleixinxiangqing){
                          this.addshujuzidianleixinxiangqing[key] = ''
                      }
                      let  lenxinID = window.sessionStorage.getItem('lenxinID')
                         this.$axios({
                            method:'GET',
                            url:this.api.baseUrl+this.api.sysdataDetail + '/' + lenxinID,
                            params:{page:1,rows:10} ,
                            type:'json'
                        }).then(response=>{
                            console.log(response)
                            this.getshujuzidianxiangqing = []                    
                        for(let i = 0; i < response.data.data.length; i++){
                            this.getshujuzidianxiangqing.push(response.data.data[i])
                        }
                }).catch(err=>{
                    console.log(err)
                })
                        this.dialogFormVisibleleixin = false;

                    }
                }).catch(err=>{
                    console.log(err)
                })

            },
            //添加类型详情按钮
            btnaddleixinxiangqing(){
                this.dialogFormVisibleleixin = true;

            },

            //点击添加按钮
            btnadd(){
                   for(let key in this.addshujuzidian)
                {
                    this.addshujuzidian[key] = ''
                }
                this.dialogFormVisible = true;
                    
            },
            //点击确定添加数据字典按钮（弹框里的）
            onSubmit(){
                let params = this.addshujuzidian
                this.$axios({
                    method:'POST',
                    url:this.api.baseUrl+this.api.sysdatatype,
                    data:params,
                    type:'json'
                }).then(response=>{
                    console.log(response)
                    if(response.data.success === true){
                        window.alert('添加成功')
                       for(let key in  this.addshujuzidian){
                          this.addshujuzidian[key] = ''
                      }
                        this.getshujuzidianhanshu();
                        this.dialogFormVisible = false;

                    }
                }).catch(err=>{
                    console.log(err)
                })
              
            },
            
            //获取数据字典表格展示
            getshujuzidianhanshu(){
                 this.$axios({
                    method: "GET",
                    url:this.api.baseUrl+this.api.sysdatatype,
                    params:{page:this.pagevalue,rows:10} ,
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

                       this.getshujuzidian = []                    
                        for(let i = 0; i < response.data.data.list.length; i++){
                            this.getshujuzidian.push(response.data.data.list[i])
                        }
                    }
                }).catch(err=>{
                    console.log(err)
                })
               
        }
        
    }
}
</script>

<style>
.shujuzidianbox{
    float: left;
    margin-left: 2%;
    width: 100%;
}
.addshujuzidian{
   margin-left: 92%;
    margin-bottom: 1%;
    margin-top: 1%;
    background-color: #45b0e8;
}
.fengyeanniu{
  margin-top:1%;
  margin-left: 35%;
}
</style>
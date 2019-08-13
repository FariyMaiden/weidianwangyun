<template>
<!-- 系统管理》权限管理 -->
    <div>
        <div class="bigbox">

            <div>
                 <el-button icon="el-icon-circle-plus-outline" class="add" @click="btnadd">添加权限</el-button>
                  <el-dialog :visible.sync="dialogFormVisible">
            <el-form ref="form" :model="addbiaodanxinxi" label-width="100px" > 
           
                    <el-form-item :label="item.lable" v-for="(item,index) in tableHead" 
                    :key="index"
                    v-if="index !== 0"
                   >
                   
                        <el-input v-model="addbiaodanxinxi[item.id]"></el-input>
                    </el-form-item>
                  
                            
                </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit" v-if='quedinganniu'>确定添加</el-button>
             <el-button type="primary" @click="xiugaibiaodanxinxi" v-if="xiugaibtn">确定修改</el-button>
          </div>
            </el-dialog>
            </div>


            <div>
               
                 <el-table
                    :data="getTablexinxi"
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
                      @click.native.prevent="xiugaiRow(scope.$index, getTablexinxi)"
                      type="text"
                      size="small"
                     icon="el-icon-edit">
                      
                    </el-button>
                    <el-button
                      @click.native.prevent="deleteRow(scope.$index, getTablexinxi)"
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
    export default {
        data(){
            return{
              
                dialogFormVisible:false,//弹窗是否显示
                quedinganniu:true,//是否显示确定添加按钮
                xiugaibtn:false,//是否显示确定修改按钮
            
                addbiaodanxinxi:{      
                    id:'',//	integer($int64) id
                    meno:'',//	string 备注
                    name:'',//	string 名称
                    path:'',//	string menu路径
                    type:'',//	integer($int32)权限类型
                    url:'',//	string url            
                        },//添加表单信息
                tableHead:[{
                  lable:'权限ID',
                  id:'id'
                },
                {
                  lable:'权限名称',
                  id:'name'
                }, {
                  lable:'menu路径',
                  id:'path'
                },
                {
                  lable:'权限类型',
                  id:'type'
                },
                {
                  lable:'url',
                  id:'url'

                },
                {
                  lable:'备注',
                  id:'meno'
                },
              ],
                            
            getTablexinxi: [],//获取到的用户信息表格
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
            this.getTabledata();
        },
        methods:{

          
              //点击上一页按钮
            getpreviousPage(){
              this.pagevalue -= 1;
              this.getTabledata();
            },
            //点击获取下一页
            getNextPage(){
              this.pagevalue += 1;
              this.getTabledata();
            },
               //更改表头颜色
            getRowClass({ row, column, rowIndex, columnIndex }) {
                if (rowIndex == 0) {
                        return 'background:#a0cfff'
                } else {
                        return ''
                }
            },
            
            //点击确定修改按钮（弹框里面的按钮）
            xiugaibiaodanxinxi(){
                console.log(this.addbiaodanxinxi)
                let params = this.addbiaodanxinxi;
                this.$axios({
                    method:'PUT',
                    url:this.api.baseUrl+this.api.syspermission,
                    data:params,
                    type:'json'
                }).then(response=>{
                    console.log(response);
                    if(response.data.success === true){
                        window.alert('修改成功')
                       for(let key in this.getTablexinxi)
                {
                    this.addbiaodanxinxi[key] = ''
                }
                this.dialogFormVisible = false;
                this.quedinganniu = true;
                this.xiugaibtn = false;
                    }
                }).catch(err=>{
                    console.log(err)
                })

            },
             
            //修改按钮
            xiugaiRow(index,row){
                 this.passwordShow = false;
                this.dialogFormVisible = true;
                this.quedinganniu = false;
                this.xiugaibtn = true;
                this.addbiaodanxinxi = this.getTablexinxi[index]
                for(let key in this.addbiaodanxinxi)
                {
                    this.addbiaodanxinxi[key] = this.getTablexinxi[index][key]
                }
                this.getTabledata()
            },
            //删除按钮
            deleteRow(index,row){


                 this.$confirm('此操作将永久删除该权限信息, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {
                           
                let id = this.getTablexinxi[index].id
                this.$axios({
                    method:'DELETE',
                    url:this.api.baseUrl+this.api.syspermission + '/' + id,
                    type:'json'
                }).then(response=>{
                    console.log(response);
                    if(response.data.success === true){
                        this.$message({
                                        type: 'success',
                                        message: '删除成功!'
                                    });
                   
                        if(window.sessionStorage.getItem('tiaojianchaxun') === 'yes'){
                                    this.search()
                                }else{
                                    this.getTabledata();
                                }
                                    }
                                })
              
                        }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });          
                        });

            },

            //点击添加按钮
            btnadd(){
                   
                   for(let key in this.addbiaodanxinxi)
                {
                    this.addbiaodanxinxi[key] = ''
                }
                this.dialogFormVisible = true;
                this.xiugaibtn = false;
                this.quedinganniu = true;
              
            },
            //点击确定添加用户信息按钮（弹框里的）
            onSubmit(){
                 this.quedinganniu=false;//网关确定按钮的是否显示
                let params = this.addbiaodanxinxi;
               
                this.$axios({
                    method:'POST',
                    url:this.api.baseUrl+this.api.syspermission,
                    data:params,
                    type:'json'
                }).then(response=>{
                    console.log(response)
                    if(response.data.success === true)
                    {
                        window.alert('添加成功');
                        this.quedinganniu=true;//网关确定按钮的是否显示
                        this.getTabledata();
                        this.dialogFormVisible= false;
                        for(let key in this.addbiaodanxinxi){
                            this.addbiaodanxinxi[key] = '' ;
                        }

                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            
      
            //获取用户信息展示
            getTabledata(){
                this.$axios({
                    method: "GET",
                    url:this.api.baseUrl+this.api.syspermission,
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
                       this.getTablexinxi = []                    
                        for(let i = 0; i < response.data.data.list.length; i++){
                            this.getTablexinxi.push(response.data.data.list[i])
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
.bigbox{
    float: left;
    margin-left: 2%;
    width: 100%;
  
}
.add{
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
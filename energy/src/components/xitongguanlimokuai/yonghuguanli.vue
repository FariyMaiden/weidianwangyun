<template>
<!-- 系统管理》用户管理 -->
    <div>
        <div class="yonghuguanlibox">

     
            <div>
                 <el-button icon="el-icon-circle-plus-outline" class="addyonghu" @click="btnadd">添加用户</el-button>
                  <el-dialog :visible.sync="dialogFormVisible">
            <el-form ref="form" :model="addyonghuxinxi" label-width="100px" > 
           
                    <el-form-item :label="item.lable" v-for="(item,index) in tableHead" 
                    :key="index"
                   >
                        <el-input v-model="addyonghuxinxi[item.id]"></el-input>
                    </el-form-item>
                  
                    <el-form-item label="密码" v-if="passwordShow">
                        <el-input v-model="addyonghuxinxi.password"></el-input>
                    </el-form-item>
                            
                </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit" v-if='quedinganniu'>确定添加</el-button>
             <el-button type="primary" @click="xiugaiyonghuxinxi" v-if="xiugaibtn">确定修改</el-button>
          </div>
            </el-dialog>
            </div>


            <div>
               
                 <el-table
                    :data="getyonghuxinxi"
                    border
                    style="width: 100%"
                    :header-cell-style="getRowClass"
                    >
                    <el-table-column
                    v-for="(item,index) in tableHead" :key="index"
                    :prop="item.id"
                    :label="item.lable"
                    v-if='index !==7'
                   >
                    </el-table-column>
                     <el-table-column
                  fixed="right"
                  label="操作"
                 >
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="xiugaiRow(scope.$index, getyonghuxinxi)"
                      type="text"
                      size="small"
                     icon="el-icon-edit">
                      修改
                    </el-button>
                    <el-button
                      @click.native.prevent="deleteRow(scope.$index, getyonghuxinxi)"
                      type="text"
                      size="small"
                      icon="el-icon-delete">
                      移除
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
                passwordShow:true,//密码框的显示
                addyonghuxinxi:{      
                    username: "",//用户名称
                    mobile: "", //用户联系方式
                    email: "",  //用户邮箱
                    photoUrl: "",//用户头像照片地址
                    password: "",//密码
                    meno: "",   //备注               
                },//添加用户
                tableHead:[{
                  lable:'用户ID',
                  id:'id'
                },
                {
                  lable:'用户名称',
                  id:'username'
                }, {
                  lable:'联系方式',
                  id:'mobile'
                },
                {
                  lable:'使用状态',
                  id:'enabled'
                },
                 {
                  lable:'用户邮箱',
                  id:'email'
                },
               {
                  lable:'用户头像照片地址',
                  id:'photoUrl'
                },
                {
                  lable:'备注',
                  id:'meno'
                },
              ],
                            
                 getyonghuxinxi: [],//获取到的用户信息表格
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
            this.getuserdata();
        },
        methods:{

          
              //点击上一页按钮
            getpreviousPage(){
              this.pagevalue -= 1;
              this.getuserdata();
            },
            //点击获取下一页
            getNextPage(){
              this.pagevalue += 1;
              this.getuserdata();
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
            xiugaiyonghuxinxi(){
              
                let params = this.addyonghuxinxi;
                this.$axios({
                    method:'PUT',
                    url:this.api.baseUrl+this.api.sysuser,
                    data:params,
                    type:'json'
                }).then(response=>{
                    console.log(response);
                    if(response.data.success === true){
                        window.alert('修改成功')
                       for(let key in this.addyonghuxinxi)
                {
                    this.addyonghuxinxi[key] = ''
                }
                this.dialogFormVisible = false;
                this.quedinganniu = true;
                this.xiugaibtn = false;
                this.getuserdata();
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
                this.addyonghuxinxi = this.getyonghuxinxi[index]
                for(let key in this.addyonghuxinxi)
                {
                    this.addyonghuxinxi[key] = this.getyonghuxinxi[index][key]
                }
                this.getuserdata()
            },
            //删除按钮
            deleteRow(index,row){


                      this.$confirm('此操作将永久删除该设备信息, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {
                               let id = this.getyonghuxinxi[index].id
                this.$axios({
                    method:'DELETE',
                    url:this.api.baseUrl+this.api.sysuser + '/' + id,
                    type:'json'
                }).then(response=>{
                    console.log(response);
                    if(response.data.success === true){
                       this.$message({
                                        type: 'success',
                                        message: '删除成功!'
                                    });
                        this.getuserdata();
                    }})
              
                        }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });          
                        });


                // let id = this.getyonghuxinxi[index].id
                // this.$axios({
                //     method:'DELETE',
                //     url:this.api.baseUrl+this.api.sysuser + '/' + id,
                //     type:'json'
                // }).then(response=>{
                //     console.log(response);
                //     if(response.data.success === true){
                //         window.alert('删除成功！')
                //         this.getuserdata();
                //     }
                // }).catch(err=>{
                //     console.log(err)
                // })


            },

            //点击添加按钮
            btnadd(){
                    this.passwordShow = true;
                   for(let key in this.addyonghuxinxi)
                {
                    this.addyonghuxinxi[key] = ''
                }
                this.dialogFormVisible = true;
                this.xiugaibtn = false;
                this.quedinganniu = true;
              
            },
            //点击确定添加用户信息按钮（弹框里的）
            onSubmit(){
                let params = this.addyonghuxinxi;
                params.enabled = true;
                this.$axios({
                    method:'POST',
                    url:this.api.baseUrl+this.api.sysuser,
                    data:params,
                    type:'json'
                }).then(response=>{
                    console.log(response)
                    if(response.data.success === true)
                    {
                        window.alert('添加成功');
                        this.getuserdata();
                        this.dialogFormVisible= false;
                        for(let key in this.addyonghuxinxi){
                            this.addyonghuxinxi[key] = '' ;
                        }

                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            
      
            //获取用户信息展示
            getuserdata(){
                this.$axios({
                    method: "GET",
                    url:this.api.baseUrl+this.api.sysuser,
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
                       this.getyonghuxinxi = []                    
                        for(let i = 0; i < response.data.data.list.length; i++){
                            this.getyonghuxinxi.push(response.data.data.list[i])
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
.yonghuguanlibox{
    float: left;
    margin-left: 2%;
    width: 83%;
}

.addyonghu{
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
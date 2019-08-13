 <template>
<!-- 系统管理》角色管理 -->
    <div class="bigbox">
        <div>

            <!-- 增删查改权限弹出框 -->
            <div>
                       
                <el-dialog
                title="角色权限配置"
                :visible.sync="centerDialogVisible"
                width="30%"
                center>
               <div>
                   <div>
                       已拥有权限类型：
                   </div>
                   <span>                
                    <el-button
                      @click="delejuesequanxianpeizhiRow(index)"
                      type="text"
                      size="small"
                      icon="el-icon-delete"
                       v-for="(item,index) in chaxunjuesequanxian" 
                      :key="index"
                        class="quanxianpeizhitankuang"
                      >
                    {{item.name}}  
                    </el-button>               
                   </span>

                   <div>
                        <div>增加权限类型</div> 
                      <el-select v-model="value2" multiple placeholder="请选择">
                      
                            <el-option
                            v-for="item in options2"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                   </div>

               </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="Addjuesequanxian()">确 定</el-button>
                </span>
                </el-dialog>
            </div>


            <div>
                 <el-button icon="el-icon-circle-plus-outline" class="add" @click="btnadd">添加角色</el-button>
                  <el-dialog :visible.sync="dialogFormVisible">
            <el-form ref="form" :model="addbiaodanxinxi" label-width="100px" > 
           
                    <el-form-item :label="item.lable" v-for="(item,index) in tableHead" 
                    :key="index"
                    v-if="index !== 0 && index !== 2"
                   >
                
                        <el-input v-model="addbiaodanxinxi[item.id]"></el-input>
                    </el-form-item>

                     <el-form-item label="权限分配">
                          
                      <el-select v-model="value1" multiple placeholder="请选择">
                      
                            <el-option
                            v-for="item in optionsW"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                   </el-form-item>
                            
                </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit" v-if='quedinganniu'>确定添加</el-button>
            
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
                    v-for="(item,index) in tableHead" 
                    :key="index"
                    :prop="item.id"
                    :label="item.lable"
                   v-if="index !== 2"
                   >
                    
                    </el-table-column>
                     <el-table-column
                  fixed="right"
                  label="操作"
                 >
                  <template slot-scope="scope">
                   
                    <el-button
                      @click.native.prevent="deleteRow(scope.$index, getTablexinxi)"
                      type="text"
                      size="small"
                      icon="el-icon-delete">
                      
                    </el-button>
                     <el-button             
                      type="text"
                      size="small"
                      icon="el-icon-search"
                     @click.native.prevent="chakanquanxinpeizhiRow(scope.$index, getTablexinxi)">
                      查看权限
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
                //增加角色权限
                 value2:[],
                 options2:[],
                 jueseid:'',//点击到的是角色id

                 centerDialogVisible: false,
                 optionsW: [],
                 value1: [],
                 chaxunjuesequanxian:[],//查询角色管理权限
             
                        
                dialogFormVisible:false,//弹窗是否显示
                quedinganniu:true,//是否显示确定添加按钮
               
            
                addbiaodanxinxi:{      
                    id:'',//	integer($int64) id
                    meno:'',//	string 备注
                    name:'',//	string 名称
                    permissionIds:[]//配置的权限
                        },//添加表单信息
                tableHead:[{
                  lable:'ID',
                  id:'id'
                },
                {
                  lable:'角色名称',
                  id:'name'
                },
                {
                  lable:'权限拥有',
                  id:'permissionIds'
                },
                {
                  lable:'备注',
                  id:'meno'
                },
              ],
                            
            getTablexinxi: [],//获取到的信息表格
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

              this.$axios({
                method:'GET',
                url:this.api.baseUrl + this.api.syspermissionall,         
                type:'json'
            }).then(response=>{
                console.log(response)
                if(response.data.success === true){
                     console.log(response.data.data)         
                   this.optionsW = response.data.data
                   console.log(this.optionsW )
                }
            }).catch(err=>{
                console.log(err)
            })

              this.$axios({
                method:'GET',
                url:this.api.baseUrl + this.api.syspermissionall,         
                type:'json'
            }).then(response=>{
                console.log(response)
                if(response.data.success === true){
                     console.log(response.data.data) 
                  
                             this.options2 = response.data.data  
                }
                console.log(this.options2)
            }).catch(err=>{
                console.log(err)
            })

                    
        },
        methods:{
           
           //弹框里的角色权限配置
           Addjuesequanxian(){
               console.log(this.value2)    
               let params =  {
                   rid:this.jueseid,
                   pids:this.value2
               }           
    
               this.$axios({
                   method:'POST',
                   url:this.api.baseUrl +  this.api.sysrolePermission,
                   data:params,
                   type:'json'
               }).then(response=>{
                   console.log(response)
                   if(response.data.success === true){

                this.$axios({
                    method:'GET',
                    url:this.api.baseUrl + this.api.sysrolePermission+'/' + this.jueseid,
                    type:'json'
                }).then(response=>{
                    console.log(response)
                    if(response.data.success === true){
                     
                        this.chaxunjuesequanxian = response.data.data 
                        this.value2 = []


                this.$axios({
                    method:'GET',
                    url:this.api.baseUrl + this.api.sysrolePermission +'/'+ this.jueseid,
                    type:'json'
                }).then(response=>{
                    console.log(response)
                    if(response.data.success === true){
                        this.centerDialogVisible = true;
                        this.chaxunjuesequanxian = response.data.data 
                                      
                    }
                }).catch(err=>{
                    console.log(err)
                })


                    }
                }).catch(err=>{
                    console.log(err)
                })

                    

                   }
               }).catch(err=>{
                   console.log(err)
               })

           },

            //弹框删除权限配置
            delejuesequanxianpeizhiRow(index){


              
                  this.$confirm('此操作将永久删除该角色权限, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {
                                console.log( this.chaxunjuesequanxian[index].id)           
                this.$axios({
                    method:'DELETE',
                    url:this.api.baseUrl + this.api.sysrolePermission+'/' + this.chaxunjuesequanxian[index].id,
                    type:'json'
                }).then(response=>{
                    console.log(response)
                    if(response.data.success === true){
                         
                       this.$message({
                                        type: 'success',
                                        message: '删除成功!'
                                    });
                            this.$axios({
                    method:'GET',
                    url:this.api.baseUrl + this.api.sysrolePermission +'/'+ this.jueseid,
                    type:'json'
                }).then(response=>{
                    console.log(response)
                    if(response.data.success === true){
                        this.centerDialogVisible = true;
                        this.chaxunjuesequanxian = response.data.data 
                                      
                    }
                }).catch(err=>{
                    console.log(err)
                })
                  
                    }
                        })
                        }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });          
                        });

            },
            //弹框查看权限配置
            chakanquanxinpeizhiRow(index){
                console.log(index)
              this.jueseid = this.getTablexinxi[index].id
                       
                this.$axios({
                    method:'GET',
                    url:this.api.baseUrl + this.api.sysrolePermission +'/'+ this.getTablexinxi[index].id,
                    type:'json'
                }).then(response=>{
                    console.log(response)
                    if(response.data.success === true){
                        this.centerDialogVisible = true;
                        this.chaxunjuesequanxian = response.data.data 
                                      
                    }
                }).catch(err=>{
                    console.log(err)
                })

           
            },
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
            
        
            //删除按钮
            deleteRow(index,row){

                 this.$confirm('此操作将永久删除该设备信息, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {
                           
                let id = this.getTablexinxi[index].id
                this.$axios({
                    method:'DELETE',
                    url:this.api.baseUrl+this.api.sysrole + '/' + id,
                    type:'json'
                }).then(response=>{
                    console.log(response);
                    if(response.data.success === true){
                        this.$message({
                                        type: 'success',
                                        message: '删除成功!'
                                    });
                        this.getTabledata();
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
                this.quedinganniu = true;

          
              
            },
            //点击确定添加信息按钮（弹框里的）
            onSubmit(){
                this.quedinganniu=false;//网关确定按钮的是否显示
                console.log(this.value1)
                this.addbiaodanxinxi.permissionIds = this.value1;
                let params = this.addbiaodanxinxi;
                           
                this.$axios({
                    method:'POST',
                    url:this.api.baseUrl+this.api.sysrole,
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
                        for(let i = 0; i < this.addbiaodanxinxi.length; i++){
                            for(let key in this.addbiaodanxinxi[i]){
                                if(key === 'permissionIds'){
                                    this.addbiaodanxinxi[i][key] = []
                                }else{
                                    this.addbiaodanxinxi[i][key] = ''
                                }
                            }
                        };
                        this.value1 = [];

                    }
                }).catch(err=>{
                    console.log(err)
                    window.alert('断网啦！！！请联系网络管理人员~')
                })
            },
            
      
            //获取信息展示
            getTabledata(){
                this.$axios({
                    method: "GET",
                    url:this.api.baseUrl+this.api.sysrole,
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
.quanxianpeizhitankuang{
    border: 1px solid saddlebrown;
    margin: 1px;
    border-radius: 5%;


}
</style> 
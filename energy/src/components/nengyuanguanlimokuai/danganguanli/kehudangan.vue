 <template>
<!--档案管理——》客户档案 -->
    <div class="bigbox">
        <div>
            <!-- 查询表格筛选条件 -->
           <div class="demo-input-suffix tiaojianchaxun" >
                用户账号：
                <el-input
                    placeholder="请输入用户账号"
                    prefix-icon="el-icon-search"
                    v-model="tiaojianchaxun.account"
                    style="width:200px"
                     >
                </el-input>

                 用户名称：
                <el-input
                    placeholder="请输入用户名称"
                    prefix-icon="el-icon-search"
                    v-model="tiaojianchaxun.username"
                     style="width:200px">
                </el-input>

                 用户电话：
               <el-input
                    placeholder="请输入用户联系电话"
                    prefix-icon="el-icon-search"
                    v-model="tiaojianchaxun.mobile"
                     style="width:200px">
                </el-input>

                    <el-button type="primary" icon="el-icon-setting" @click="chongzhi">重置</el-button>
                    <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>              
                </div>


            <!-- 添加信息模块 -->
            <div>
                 <el-button icon="el-icon-circle-plus-outline" class="add" @click="btnadd">添加</el-button>
                  <el-dialog :visible.sync="dialogFormVisible">
            <el-form ref="form" :model="addbiaodanxinxi" label-width="100px" id="d1"> 
           
                    <el-form-item :label="item.lable" v-for="(item,index) in tableHead" 
                    :key="index" v-if="index < 6">          
                        <el-input v-model="addbiaodanxinxi[item.id]" @keyup.enter.native="focusNextInput(index+1,6)"></el-input>
                    </el-form-item> 

					  <el-form-item label="用户角色">          
                         <el-select v-model="value" placeholder="请选择用户角色" :disabled="xuanzheyonghujuese">
								<el-option
								v-for="item in roleIds"
								:key="item.id"
								:label="item.name"
								:value="item.id">
								</el-option>
							</el-select>
                    </el-form-item> 

					<el-form-item label="区域">    
					  <el-cascader
                  :options="options"
				  :props="{ checkStrictly: true }"
				  v-model='optionsValueAdd' 
                  clearable
				  class="elCascaderXuan">
                </el-cascader>   
			</el-form-item>

					  <el-form-item label="初始密码">          
                        <el-input v-model="addbiaodanxinxi.password"></el-input>
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
                    :data="getTablexinxi"
                    border
                    style="width: 100%"
                    :header-cell-style="getRowClass"
                    >
                    <el-table-column
                    v-for="(item,index) in tableHead2" 
                    :key="index"
                    :prop="item.id"
					:label="item.lable"
					v-if="index !== 8 && index !== 6"
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

              // 按条件查询定义变量
                tiaojianchaxun:{
                    account:'',//  客户账号 
                    username:'',//客户名称                                  
                    mobile:'',//客户联系方式 
                               },
                tiaojianpage:1,
                			
			
				//树形结构
				 options: [],
				 optionsValueAdd:[],

                               
                dialogFormVisible:false,//弹窗是否显示
                quedinganniu:true,//是否显示确定添加按钮    
				xiugaibtn:false,//是否显示确定修改按钮  
				
				
				//用户角色的增加及修改
				roleIds:[],//获取到的所有用户角色
                value:'',
                xuanzheyonghujuese:false,//禁止修改用户角色，可添加
            
                addbiaodanxinxi:{      
                    account:'',//	string 客户账号
                    contact:'',//	string 联系人
                    email:'',//	string 电子邮件
                    meno:'',//	string 备注
                    mobile:'',//	string 联系电话
                    password:'',//	string 密码
                    regionId:'',//	string 关联区域id
                    roleIds:[],//	[...]
                    username:'',//	string 用户名  
                        },//添加表单信息
                tableHead:[{
                  lable:'用户账号',
                  id:'account'
                },
                {
                  lable:'用户名称',
                  id:'username'
                },
                {
                  lable:'联系人',
                  id:'contact'
                },
                {
                  lable:'联系电话',
                  id:'mobile'
                },
                 {
                  lable:'电子邮件',
                  id:'email'
                },
               
                 {
                  lable:'备注',
                  id:'meno'
				},
				{
					lable:'用户角色',
					id:'roleIds'
				},
				{
				lable:'关联区域ID',
                  id:'regionId'
				},
                
                 {
                  lable:'初始密码',
                  id:'password'
                },
               
              ],
               tableHead2:[{
                  lable:'用户账号',
                  id:'account'
                },
                {
                  lable:'用户名称',
                  id:'username'
                },
                {
                  lable:'联系人',
                  id:'contact'
                },
                {
                  lable:'联系电话',
                  id:'mobile'
                },
                 {
                  lable:'电子邮件',
                  id:'email'
                },
               
                 {
                  lable:'备注',
                  id:'meno'
				},
				{
					lable:'用户角色',
					id:'roleIds'
				},
				{
				lable:'区域',
                  id:'regionName'
				},
                
                 {
                  lable:'初始密码',
                  id:'password'
                },
               
              ],
                            
            getTablexinxi: [],//获取到的信息表格
            getTablexinxiRegionName:[],//获取到的区域名称
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
			this.getjiegoushu();
            this.jueseleixin();   
            window.sessionStorage.setItem('tiaojianchaxun','')   
        },
        methods:{       
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
            } ,
  
			//获取用户角色
			jueseleixin(){
				 this.$axios({
                    method: "GET",
                    url:this.api.baseUrl+this.api.sysroleall,
                    type: "json" 
                }).then(response=>{
                    console.log(response)
					if(response.data.success === true){
						this.roleIds = response.data.data
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

				 //获取结构树
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
           })

		  },
           

              //点击上一页按钮
            getpreviousPage(){
                console.log(window.sessionStorage.getItem('tiaojianchaxun'))
                if(window.sessionStorage.getItem('tiaojianchaxun') === 'yes'){
                    this.tiaojianpage -=1
                    this.search()
                }else{
                     this.pagevalue -= 1;
                     this.getTabledata();

                }
             
            },
            //点击获取下一页
            getNextPage(){
                 console.log(window.sessionStorage.getItem('tiaojianchaxun'))
                   if(window.sessionStorage.getItem('tiaojianchaxun') === 'yes'){
                    this.tiaojianpage +=1
                    this.search()
                }else{
                    this.pagevalue += 1;
                    this.getTabledata();
                }
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
                window.sessionStorage.setItem('tiaojianchaxun','') 
                for(let key in this.tiaojianchaxun){
                    this.tiaojianchaxun[key]  = ''

				}
				this.getTabledata();

            },

                //按条件查询的搜索按钮
            search(){
                window.sessionStorage.setItem('tiaojianchaxun','yes')
                
                let params = this.tiaojianchaxun
               
                params.page = this.tiaojianpage
                params.rows = 10
                this.$axios({
                    method:'GET',
                    url:this.api.baseUrl + this.api.sysuser,
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
                this.getTablexinxi = []                    
                for(let i = 0; i < response.data.data.list.length; i++){
                    this.getTablexinxi.push(response.data.data.list[i])
                }
                this.tiaojianpage = 1
                    }

                }).catch(err=>{
                    console.log(err)
                })

            },

             //删除按钮
            deleteRow(index,row){
                  this.$confirm('此操作将永久删除该用户信息, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {
                              let id = this.getTablexinxi[index].id
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


                  //点击确定修改按钮（弹框里面的按钮）
            xiugaiyonghuxinxi(){
				console.log(this.optionsValueAdd)
				if(this.value !== ''){
				this.addbiaodanxinxi.roleIds = []			
				this.addbiaodanxinxi.roleIds.push(Number(this.value))
				}
				let params = this.addbiaodanxinxi;
				if(this.optionsValueAdd.length === 0){
				
				}else{
					params.regionId = String(this.optionsValueAdd[this.optionsValueAdd.length-1])
				}
				
                this.$axios({
                    method:'PUT',
                    url:this.api.baseUrl+this.api.sysuser,
                    data:params,
                    type:'json'
                }).then(response=>{
                    console.log(response);
                    if(response.data.success === true){
						 this.$message('修改成功')
                       for(let key in this.addbiaodanxinxi)
                {
                    this.addbiaodanxinxi[key] = ''
                }
                this.dialogFormVisible = false;
                this.quedinganniu = true;
                this.xiugaibtn = false;
                if(window.sessionStorage.getItem('tiaojianchaxun') === 'yes'){
					this.search();
					this.getjiegoushu();
                }else{
					this.getTabledata();
					this.getjiegoushu();
                }
                
                    }
                }).catch(err=>{
                    console.log(err)
                })

            },
             

                //修改按钮
            xiugaiRow(index,row){
                this.xuanzheyonghujuese = true
                
				this.optionsValueAdd = []
				this.value = String(this.getTablexinxi[index].roleIds)
                this.dialogFormVisible = true;
                this.quedinganniu = false;
                this.xiugaibtn = true;
				this.addbiaodanxinxi = this.getTablexinxi[index]
				console.log(this.getTablexinxi[index])
                for(let key in this.addbiaodanxinxi)
                {
                    this.addbiaodanxinxi[key] = this.getTablexinxi[index][key]
				}
				
			console.log( this.addbiaodanxinxi)
				
                // this.getTabledata()
			},
			method(){
			
			},
            

          //点击添加按钮
            btnadd(){
                this.xuanzheyonghujuese = false
               
                   for(let key in this.addbiaodanxinxi)
                {
                    this.addbiaodanxinxi[key] = ''
				}
				this.optionsValueAdd = [];
				this.value = '';
                this.dialogFormVisible = true;
                this.xiugaibtn = false;
                this.quedinganniu = true;
            
            },
            //点击确定添加用户信息按钮（弹框里的）
            onSubmit(){  
				this.quedinganniu=false;//网关确定按钮的是否显示
				this.addbiaodanxinxi.roleIds = []
				this.addbiaodanxinxi.roleIds.push(this.value)		
                let params = this.addbiaodanxinxi;
				params.regionId = String(this.optionsValueAdd[this.optionsValueAdd.length-1])
				
                this.$axios({
                    method:'POST',
                    url:this.api.baseUrl+this.api.sysuser,
                    data:params,
                    type:'json'
                }).then(response=>{
                    console.log(response)
                    if(response.data.success === true)
                    {
                         this.$message('添加成功')
                          this.quedinganniu=true;//网关确定按钮的是否显示
						
			for(let key in this.addbiaodanxinxi)
                {
                    this.addbiaodanxinxi[key] = ''
                }
                    if(window.sessionStorage.getItem('tiaojianchaxun') === 'yes'){
							this.search();
							this.getjiegoushu();
                        }else{
							this.getTabledata();
							this.getjiegoushu();
                        }
                        this.dialogFormVisible= false;
                        }
                        
                }).catch(err=>{
                    console.log(err)
                    window.alert('断网啦！！！请联系网络管理人员~')
                })
            },
            
      
            //获取用户信息展示
            getTabledata(){
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
                       this.getTablexinxi = []                    
                        for(let i = 0; i < response.data.data.list.length; i++){
                            this.getTablexinxi.push(response.data.data.list[i]);
                            this.getTablexinxiRegionName.push(response.data.data.list[i].regionName)
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
.tiaojianchaxun{
    margin-top:2%; 
}
.add{
   margin-left: 92%;
    /* margin-bottom: 1%; */
    /* margin-top: 1%; */
    background-color: #45b0e8;
}
.fengyeanniu{
  margin-top:1%;
 margin-left: 35%;
}

</style> 
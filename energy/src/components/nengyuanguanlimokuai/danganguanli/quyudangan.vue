 <template>
<!--档案管理——》区域档案 -->
    <div class="bigbox">
        <div>
            区域：
			  <el-cascader
                  :options="options"
                  :props="{ checkStrictly: true }"
                  placeholder="请选择区域"
				  v-model='optionsValue' 
                  clearable
				  class="elCascaderXuan">
                </el-cascader>
				  <el-button @click="shousuo()" icon="el-icon-search">搜索</el-button>
              

            <!-- 添加表计信息模块 -->
            <div>
                 <el-button icon="el-icon-circle-plus-outline" class="add" @click="btnadd">添加</el-button>
                  <el-dialog :visible.sync="dialogFormVisible">
            <el-form ref="form" :model="addbiaodanxinxi" label-width="100px" id="d1"> 
           
                    <el-form-item :label="item.lable" v-for="(item,index) in tableHead" 
                    :key="index" v-if="index !== 1" >          
                        <el-input v-model="addbiaodanxinxi[item.id]"   @keyup.enter.native="focusNextInput(index+1,3)"></el-input>
                    </el-form-item>    
				<el-form-item label="上级区域">    
					  <el-cascader
                 filterable @change="handleItemChange"
                  :options="options"
				  :props="{ checkStrictly:true }"
				  v-model='optionsValueAdd' 
                   clearable 
				  class="elCascaderXuan">
                </el-cascader>   
			</el-form-item>
           

                </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit" v-if='quedinganniu'>确定添加</el-button>        
            <el-button type="primary" @click="xiugaixinxi" v-if="xiugaibtn">确定修改</el-button>
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
                   >
                    
                    </el-table-column>
                     <!-- <el-table-column
                  fixed="right"
                  label="操作"
                 >

                   <template slot-scope="scope"> -->
                    <!-- <el-button
                      @click.native.prevent="xiugaiRow(scope.$index, getTablexinxi)"
                      type="text"
                      size="small"
                     icon="el-icon-edit">
                     
                    </el-button> -->
                    <!-- <el-button
                      @click.native.prevent="deleteRow(scope.$index, getTablexinxi)"
                      type="text"
                      size="small"
                      icon="el-icon-delete">
                      
                    </el-button> -->
                  <!-- </template>


                </el-table-column>                  -->
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

				//树形结构查询
				 options: [],
                 optionsValue:[],
                 
                 vals:[],
                 labelValue:'',
			
                               
                dialogFormVisible:false,//弹窗是否显示
                quedinganniu:true,//是否显示确定添加按钮    
                xiugaibtn:false,//是否显示确定修改按钮      
			
			
				//添加表单信息
				
                addbiaodanxinxi:{ 
					regionName:'',
					area:'',
					memo:'',
					parentId:'',
                    id:'',	
                    location:''				
						},
					optionsValueAdd:[],
					
											
                tableHead:[{
                  lable:'区域名称',
                  id:'regionName'
                },
               
                // {
                //   lable:'区域地址',
                //   id:''
                // },
                {
                  lable:'区域位置',
                  id:'location'

                },
				 {
                  lable:'面积',
                  id:'area'
                },
                {
                  lable:'说明',
                  id:'memo'
                },
                //  {
                //   lable:'上级区域',
                //   id:'parentId'
                // },
                
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
			this.getjiegoushu();
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
		  //按条件搜索
		  shousuo(){
			  console.log(this.optionsValue);
            //   let parentId = this.optionsValue.pop()
              let parentId = this.optionsValue[this.optionsValue.length-1]
			  console.log(parentId)

			  this.$axios({
				  method:'GET',
				  url:this.api.baseUrl+this.api.sysregion+'/'+parentId,
				  type:'json'
			  }).then(response=>{
				  console.log(response)
				  if(response.data.success === true){
                       this.fenyebanduan.hasPreviousPage = true
                       this.fenyebanduan.hasNextPage = true
                      
                        //  if(response.data.data.hasPreviousPage === false){
                        //         this.fenyebanduan.hasPreviousPage = true
                        //         }
                        //         else  if(response.data.data.hasPreviousPage === true){
                        //         this.fenyebanduan.hasPreviousPage = false
                        //         }

                        //         if(response.data.data.hasNextPage === false){
                        //         this.fenyebanduan.hasNextPage = true
                        //         }
                        //         else  if(response.data.data.hasNextPage === true){
                        //         this.fenyebanduan.hasNextPage = false                           
                        //         }
                      this.getjiegoushu();
                    //   this.getTablexinxi = response.data.data
                    this.getTablexinxi=[]
                      for(let i = 0; i < response.data.data.length; i++){
                            this.getTablexinxi.push(response.data.data[i])
                        }
                        
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
                  this.$confirm('此操作将永久删除该区域信息, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {
							  let id = this.getTablexinxi[index].id
                                this.$axios({
                                    method:'DELETE',
                                    url:this.api.baseUrl+this.api.sysregion + '/' + id,
                                    type:'json'
                                }).then(response=>{
                                    console.log(response);
                                    if(response.data.success === true){                                   
                                    this.$message({
                                        type: 'success',
                                        message: '删除成功!'
                                    });
									this.getjiegoushu();
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

            //点击确定修改按钮（弹框里面的按钮）
            xiugaixinxi(){
				
				
				let params = this.addbiaodanxinxi;
                // params.parentId = this.optionsValueAdd.pop()
                params.parentId = this.optionsValueAdd[this.optionsValueAdd.length-1]
				 console.log('params:'+params)
                this.$axios({
                    method:'PUT',
                    url:this.api.baseUrl+this.api.sysregion,
                    data:params,
                    type:'json'
                }).then(response=>{
                    console.log(response);
                    if(response.data.success === true){
    
                        this.$message('修改成功');
						
             for(let key in this.addbiaodanxinxi)
                {
                    this.addbiaodanxinxi[key] = ''
                }
                this.dialogFormVisible = false;
                this.quedinganniu = true;
				this.xiugaibtn = false;
				this.getjiegoushu();
				 this.getTabledata();
                   
                    }
                }).catch(err=>{
                    console.log(err)
                })

            },
             

        //修改按钮
            xiugaiRow(index,row){
                 
                this.dialogFormVisible = true;
                this.quedinganniu = false;
                this.xiugaibtn = true;
                this.addbiaodanxinxi = this.getTablexinxi[index]
                for(let key in this.addbiaodanxinxi)
                {
                    this.addbiaodanxinxi[key] = this.getTablexinxi[index][key]
				}
				this.addbiaodanxinxi.id = this.getTablexinxi[index].id
				console.log('id:'+ this.addbiaodanxinxi.id)
               
            },
            

          //点击添加按钮
            btnadd(){
                   
                   for(let key in this.addbiaodanxinxi)
                {
                    this.addbiaodanxinxi[key] = ''
                }
                this.getTabledata();
                this.dialogFormVisible = true;
                this.xiugaibtn = false;
                this.quedinganniu = true;
            
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

        // // const thsAreaCode='' // 拼接 三级联动地址代码
        // // 三级地址选择
        getCascaderObj(val,opt) {
            return val.map(function (value, index, array) {
                for (var itm of opt) {
                    if (itm.value == value) { opt = itm.children; return itm; }
                }
                return null;
            });
        },
	   handleItemChange() {
                    this.labelValue = ''
                    this.vals=this.getCascaderObj(this.optionsValueAdd, this.options);
                  
                    for(let i  = 0; i < this.vals.length; i ++){                   
                       if(i ===  this.vals.length-1){
                           this.labelValue += this.vals[i].label
                       }else{
                            this.labelValue += this.vals[i].label + '/'
                       }
                    }
                    console.log(this.labelValue)
                   
                },

            //点击确定添加用户信息按钮（弹框里的）
            onSubmit(){    
                 this.quedinganniu=false;//网关确定按钮的是否显示
                let params = this.addbiaodanxinxi;
                // for(let i = 0; i < this.optionsValueAdd.length; i++){
                //     console.log(this.optionsValueAdd[i].label)
                // }
                 console.log(this.optionsValueAdd)
                params.parentId = this.optionsValueAdd[this.optionsValueAdd.length-1]
                params.location = this.labelValue + '/' + params.regionName
                console.log(params.parentId)
                console.log(params)
               
                           
                this.$axios({
                    method:'POST',
                    url:this.api.baseUrl+this.api.sysregion,
                    data:params,
                    type:'json'
                }).then(response=>{
                    console.log(response)
                    if(response.data.success === true)
                    {
                        // window.alert('添加成功');    
                        this.$message('添加成功');  
                        this.quedinganniu=true;//网关确定按钮的是否显示       
						this.getTabledata();
						this.getjiegoushu();
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
                    url:this.api.baseUrl+this.api.sysregion,
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
                       this.getjiegoushu();                
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
.tiaojianchaxun{
    margin-top:2%; 
}
.add{
   margin-left: 92%;
    /* margin-bottom: 1%; */
   
    background-color: #45b0e8;
}
.fengyeanniu{
  margin-top:1%;
 margin-left: 35%;
}
.elCascaderXuan{
	margin-top: 1%;
}

</style> 
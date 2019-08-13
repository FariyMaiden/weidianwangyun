<template>
<!-- 用能单位 -->
    <div>
        <div class="yongnengdanweitab">

              <div>
        <el-button icon="el-icon-circle-plus-outline" class="addyongnengdanwei" @click="btnadd">添加用能单位</el-button>
        <el-dialog :visible.sync="dialogFormVisible">
        <el-form ref="form" :model="addyongnengdanweiform" label-width="100px" > 
           
                    <el-form-item label="名称">
                        <el-input v-model="addyongnengdanweiform.companyName"></el-input>
                    </el-form-item>
                    <el-form-item label="所属地区">
                        <el-input v-model="addyongnengdanweiform.companyArea"></el-input>
                    </el-form-item>
                    <el-form-item label="主营业务">
                        <el-input v-model="addyongnengdanweiform.companyBusiness"></el-input>
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-input v-model="addyongnengdanweiform.companyType"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人">
                        <el-input v-model="addyongnengdanweiform.contact"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话">
                        <el-input v-model="addyongnengdanweiform.contactInfo"></el-input>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input v-model="addyongnengdanweiform.memo"></el-input>
                    </el-form-item>
                <el-form-item>
                </el-form-item>                
                </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit" v-if='quedinganniu'>确定添加</el-button>
             <el-button type="primary" @click="xiugaiyongnengdanwei" v-if="xiugaibtn">修改</el-button>
          </div>
            </el-dialog>
          </div>

             <el-table
                :data="yongnengdanweiTable"
                style="width: 100%"
                max-height="650"
                :header-cell-style="getRowClass">
                 <el-table-column
            prop="id"
            label='ID'>
            </el-table-column> 
                <el-table-column
            prop="companyName"
            label='名称'>
            </el-table-column> 
    
             <el-table-column
            prop="companyType"
            label="类型"
           >
            </el-table-column>
         
              <el-table-column
            prop="companyArea"
            label="所属地区"
           >
            </el-table-column>
            <el-table-column
            prop="companyBusiness"
            label="主营业务"
           >
            </el-table-column>
             <el-table-column
            prop="contact"
            label="联系人"
           >
            </el-table-column>
             <el-table-column
            prop="contactInfo"
            label="联系电话"
           >
            </el-table-column>
             <el-table-column
            prop="memo"
            label="备注"
           >
            </el-table-column>     
                <el-table-column
                  fixed="right"
                  label="操作"
                 >
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="xiugaiRow(scope.$index, yongnengdanweiTable)"
                      type="text"
                      size="small"
                     icon="el-icon-edit">
                      
                    </el-button>
                    <el-button
                      @click.native.prevent="deleteRow(scope.$index, yongnengdanweiTable)"
                      type="text"
                      size="small"
                      icon="el-icon-delete">
                      
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <!-- 分页按钮 -->
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
</template>


<script>
    export default {
        data(){
            return{
             
                dialogFormVisible:false,//弹框是否显示
                yongnengdanweiTable:[],//获取到的用能单位数据
                addyongnengdanweiform:{
                    companyArea:'',	//string 所属地区
                    companyBusiness:'',//	string 主营业务 
                    companyName:'',	//string 名称
                    companyType:'',	//string 类型（数据字典）
                    contact:'',	//string 联系人
                    contactInfo:'',	//string 联系电话 
                    id:0,	//integer($int64)  id
                    memo:''	//string 备注   
                },//添加到用能单位的数据
                 xiugaibtn:false,//弹框里的修改按钮的是否显示
                 quedinganniu:true,//弹框里的确定按钮的是否显示
                  fenyebanduan:{
                    endRow: 10,//结束条数
                    firstPage: 1,//第一页
                    hasNextPage: true,//是否有下一页
                    hasPreviousPage: true,//是否有上一页
                    // isFirstPage: true,//是否是第一页
                    // isLastPage: true,//是否是最后一页
                    // lastPage: 1//最后一页页码
                    },
              pagevalue : 1,//当天页码数

            }
        },
        created(){
            this.getyongnengdanweidate();

        },
        methods:{
              //点击上一页按钮
            getpreviousPage(){
              this.pagevalue -= 1;
              this.getyongnengdanweidate();
            },
            //点击获取下一页
            getNextPage(){
              this.pagevalue += 1;
              this.getyongnengdanweidate();
            },
            //更改表头颜色
            getRowClass({ row, column, rowIndex, columnIndex }) {
                if (rowIndex == 0) {
                        return 'background:#EFEFEF'
                } else {
                        return ''
                }
            },
            //点击添加按钮
            btnadd(){
                this.dialogFormVisible = true;
                this.quedinganniu = true;
                this.xiugaibtn = false;
                this.addyongnengdanweiform = {}
            },
            //修改按钮函数
            xiugaiRow(index,rows){
                this.dialogFormVisible = true;
                this.xiugaibtn = true;
                this.quedinganniu = false
                this.addyongnengdanweiform = this.yongnengdanweiTable[index]
            },
            //修改用能单位数据
            xiugaiyongnengdanwei(){
                let  params = {
                companyArea:this.addyongnengdanweiform.companyArea,	//string 所属地区
                companyBusiness:this.addyongnengdanweiform.companyBusiness,//	string 主营业务 
                companyName:this.addyongnengdanweiform.companyName,	//string 名称
                companyType:this.addyongnengdanweiform.companyType,	//string 类型（数据字典）
                contact:this.addyongnengdanweiform.contact,	//string 联系人
                contactInfo:this.addyongnengdanweiform.contactInfo,	//string 联系电话 
                id:this.addyongnengdanweiform.id,	//integer($int64)  id
                memo:this.addyongnengdanweiform.memo//string 备注   
            }
            this.$axios({
                method:'PUT',
                url:this.api.baseUrl + this.api.filecompany,
                data:params,
                type:'json'
            }).then(response=>{
                console.log(response)
            }).catch(err=>{
                console.log(err)
            })
            },
            //移除按钮函数
            deleteRow(index,rows){
                 let id = this.yongnengdanweiTable[index].id
                    this.$axios({
                    method: "DELETE",
                    url:this.api.baseUrl+this.api.filecompany+'/'+id,
                    type: "json"
                    })
                    .then(response => {       
                        console.log(response);   
                        if(response.data.success === true){
                            rows.splice(index, 1);
                            window.alert('删除成功')
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    });
            },
            //获取用能单位数据(刷新)
            getyongnengdanweidate(){
                this.$axios({
                    method: "GET",
                    url:this.api.baseUrl+this.api.filecompany,
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
                        this.yongnengdanweiTable = []
                       
                        for(let i = 0; i < response.data.data.list.length; i++){
                            this.yongnengdanweiTable.push(response.data.data.list[i])
                        }
                    }
                    console.log(response.data.data.list)
                    console.log(this.yongnengdanweiTable)
                   
                }).catch(err=>{
                    console.log(err)
                })
            },
            //添加用能单位
            onSubmit(){
              
            let params = {
                companyArea:this.addyongnengdanweiform.companyArea,	//string 所属地区
                companyBusiness:this.addyongnengdanweiform.companyBusiness,//string 主营业务 
                companyName:this.addyongnengdanweiform.companyName,	//string 名称
                companyType:this.addyongnengdanweiform.companyType,	//string 类型（数据字典）
                contact:this.addyongnengdanweiform.contact,	//string 联系人
                contactInfo:this.addyongnengdanweiform.contactInfo,	//string 联系电话 
                memo:this.addyongnengdanweiform.memo//string 备注   
            }
            this.$axios({
                method:'POST',
                url:this.api.baseUrl + this.api.filecompany,
                data:params,
                type:'json'
            }).then(response=>{
                console.log(response)
                if(response.data.success === true){
                     this.dialogFormVisible = false;
                        window.alert('添加成功')
                    this.getyongnengdanweidate()
                }
            }).catch(err=>{
                console.log(err)
            })

            },



        }

        
    }
</script>

<style>
.yongnengdanweitab{
    float: left;
    margin-left: 2%;
    width: 83%;
}
.addyongnengdanwei{
    margin-left: 92%;
    margin-bottom: 1%;
    margin-top: 1%;
    background-color: #45b0e8;
    
}
.fengyeanniu{
  margin-top:1%;
  margin-left:85%;
}

</style>
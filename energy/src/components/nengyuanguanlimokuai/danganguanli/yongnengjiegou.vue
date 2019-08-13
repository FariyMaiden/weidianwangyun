<template>
<!-- 用能结构 -->
    <div>       
        <div class="yongnengjiegoutab">
             <div>           

                <el-cascader
                  :options="options"
                  :props="{ checkStrictly: true }"
                  :change="xuanzekuangvalue()"
                   v-model='xuanzekuangvaluearr'
                  clearable>
                </el-cascader>

        <el-button icon="el-icon-circle-plus-outline" class="addyongnengjiegou" @click="btnadd">添加用能结构</el-button>
        <el-dialog :visible.sync="dialogFormVisible">
        <el-form ref="form" :model="addyongnengjiegouform" label-width="120px">
            <el-form-item :label="item.label" v-for="(item,index) in yongnengjiegoutablehead" 
            :key="index"
          v-if='index>0&&index!==11&&index!==13'
            >
             
        <el-input v-model="addyongnengjiegouform[item.id]"></el-input>
    </el-form-item>

 <el-form-item label='安装日期'>
            <el-date-picker
                  v-model="addyongnengjiegouform.installDate"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  picker-options="pickerOptions">
                </el-date-picker>
   </el-form-item>
   
</el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit" v-if='quedinganniu'>确定添加</el-button>
             <el-button type="primary" @click="xiugaijiegoushuju" v-if="xiugaibtn">修改</el-button>
          </div>
            </el-dialog>
          </div>


            <el-table
                :data="jiegoushuju"
                style="width: 100%"
                max-height="650"
                 :header-cell-style="getRowClass">

                  <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item :label="item.label" v-for="(item,index) in yongnengjiegoutablehead" 
                    :key="index" v-if='index>7'>
                     
                        <span>{{ props.row[item.id] }}；</span>
                    </el-form-item>
          
                      </el-form>
                </template>
                </el-table-column>



                <el-table-column
                  :prop="item.id"
                  :label='item.label' v-for="(item,index) in yongnengjiegoutablehead" 
                  :key="index"
                  v-if='index<=7'
                  >
                
            </el-table-column> 
            
                <el-table-column
                  fixed="right"
                  label="操作"
                 >
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="xiugaiRow(scope.$index, jiegoushuju)"
                      type="text"
                      size="small"
                     icon="el-icon-edit">
                      
                    </el-button>
                    <el-button
                      @click.native.prevent="deleteRow(scope.$index, jiegoushuju)"
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
</template>

<script>
  
    export default {
        data(){
        
            return{
          xuanzekuangvaluearr:[],
          options: [],
             
              yongnengjiegoutablehead:              
                [
                {label:'ID',id:'id'},
                {label:'表号',id:'meterCode'},
                {label:'用能单位ID',id:'companyId'},
                {label:'所在区域编码',id:'regionCode'},
                {label:'所属网关id',id:'gatewayId'},
                {label:'表初始值',id:'initValue'},
                {label:'用能结构名称',id:'orgName'},
                {label:'表通讯地址',id:'meterAddress'},
                {label:'关联的表计ID:',id:'meterTypeId'},
                {label:'父ID:',id:'parentId'},
                {label:'安装地址:',id:'installAdress'},
                {label:'安装日期:',id:'installDate'},
                {label:'是否总表:',id:'isTotal'},
                {label:'层级:',id:'orgLevel'},
                {label:'表使用状态:',id:'useStatus'},
                {label:'备注:',id:'memo'}],  //用能结构表头         
              addyongnengjiegouform: {                
               companyId:'',//用能单位ID
               gatewayId:'',	//integer($int64)所属网关id
               id:'',//id
               initValue:'',	//integer($int32)表初始值
               orgName:'',	//string用能结构名称
               meterAddress:'',//	string表通讯地址
               meterTypeId:'',//	integer($int64)关联的表计ID  
               parentId:'',//父ID
               regionCode:'',//所在区域编码
               meterCode:'',//表号
               installAdress:'',//安装地址
               installDate:'',//安装日期
               isTotal:'',//是否总表
               orgLevel:'',//层级
               useStatus:'',//	integer($int32)minimum: -128maximum: 127表使用状态
               memo:'',//备注
        },
            xiugaibtn:false,//弹框里的修改按钮的是否显示
            quedinganniu:true,//弹框里的确定按钮的是否显示
            dialogFormVisible:false,//用能结构添加弹框
            jiegoushuju:[],//从后台获取到的用能结构数据        
            
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

            }
        },
        methods:{
          //获取结构树
          getjiegoushu(){
         
           this.$axios({
             method:'GET',
             url:this.api.baseUrl + this.api.fileorganizationtree + '/0',
             type:'json'
           }).then(response=>{
             console.log(response)
             if(response.data.success === true){
               console.log(response.data.data)
               this.options = response.data.data
               console.log(this.options)
             }
           }).catch(err=>{
             console.log(err)
           })

          },

          //选择框树形结构函数
         xuanzekuangvalue(){
           
           console.log(this.xuanzekuangvaluearr)

            //2019-07-11还未弄完，未有表格数据返回，之前接口已消失，需重新编写
           let parentId;
           for(let i = 0;i < this.xuanzekuangvaluearr.length; i++){
              parentId = this.xuanzekuangvaluearr[i] 
           }
           this.$axios({
             method:'GET',
             url:this.api.baseUrl + this.api.fileorganizationtreeasync +'/' + parentId,
             type:'json'
           }).then(response=>{
             console.log(response)
           }).catch(err=>{
             console.log(err)
           })
         },
       
             handleNodeClick(data) {
              console.log(data);
            }, 
                    
        
           //更改表头颜色
            getRowClass({ row, column, rowIndex, columnIndex }) {
                if (rowIndex == 0) {
                        return 'background:#EFEFEF'
                } else {
                        return ''
                }
            },
          //弹框按钮的变化
          btnadd(){
            for(let key in this.addyongnengjiegouform){
              this.addyongnengjiegouform[key] = ''
            }
            
                  this.TableData();
                  this.dialogFormVisible = true;
                  this.xiugaibtn = false;
                  this.quedinganniu = true;
          },
          //修改用能结构数据按钮
          xiugaiRow(index,rows){
            this.addyongnengjiegouform = this.jiegoushuju[index];
            this.dialogFormVisible = true;
            this.xiugaibtn = true;    
            this.quedinganniu = false;     
          },
          //删除用能结构数据
          deleteRow(index,rows){
           console.log(this.jiegoushuju[index].id)
           let id = this.jiegoushuju[index].id
        this.$axios({
          method: "DELETE",
          url:this.api.baseUrl+this.api.fileorganization+'/'+id,
          type: "json" 
        })
          .then(response => {       
            console.log(response);   
             if(response.data.success === true){

                 rows.splice(index, 1);
            }
          })
          .catch(err => {
            console.log(err)
          });

          },
          //点击上一页按钮
            getpreviousPage(){
              this.pagevalue -= 1;
              this.TableData();
            },
            //点击获取下一页
            getNextPage(){
              this.pagevalue += 1;
              this.TableData();
            },
        //刷新(获取)用能结构表单数据
        TableData(){
          this.$axios({
          method: "GET",
          url:this.api.baseUrl+this.api.fileorganization,
          params:{page:this.pagevalue,rows:10} ,
          type: "json"
        })
          .then(response => {  
            console.log(response)     
            console.log(response.data.data); 

            if(response.data.success === true){
     
                 this.jiegoushuju = []
                 for(let i = 0; i < response.data.data.length; i++){
                       this.jiegoushuju.push(response.data.data[i])
                 }  

            }
            
          })
          .catch(err => {
            console.log(err)
          });
        },
        //修改用能结构表单
        xiugaijiegoushuju(){
      let params=this.addyongnengjiegouform
        console.log(params)
         this.$axios({
          method: "PUT",
          url:this.api.baseUrl+this.api.fileorganization,
          data:params,
          type: "json"
        })
          .then(response => {       
            console.log(response);  
            if(response.data.success === true){
                this.TableData();
                window.alert('修改成功')
                this.xiugaibtn = false;
                this.dialogFormVisible = false;
                
            }
          })
          .catch(err => {
            console.log(err)
          });

        },
            //添加用能结构表单
    onSubmit() {
        console.log('submit!');    
        // debugger
       console.log(this.addyongnengjiegouform)
        let params=this.addyongnengjiegouform
        console.log(params)
         this.$axios({
          method: "POST",
          url:this.api.baseUrl+this.api.fileorganization,
          data:params,
          type: "json"
        })
          .then(response => {       
            console.log(response);  
            if(response.data.success === true){
                this.TableData();
               for(let key in this.addyongnengjiegouform){
              this.addyongnengjiegouform[key] = ''
            }
                window.alert('添加成功')
                this.dialogFormVisible = false;
            }
          })
          .catch(err => {
            console.log(err)
          });
      }
        },
        created(){
           this.TableData();
          //获取结构树
          this.getjiegoushu();
        }
        
    }
</script>

<style>
.yongnengjiegoutab{
    float: left;
    margin-left: 2%;
    width: 83%;
}
.addyongnengjiegou{
    margin-left: 92%;
    margin-bottom: 1%;
    margin-top: 1%;
    background-color: #45b0e8;
}
.fengyeanniu{
  margin-top:1%;
  margin-left:50%;
}
</style>
 <template>
<!-- 档案管理》设备型号（原名设备基础信息） -->
    <div class="bigbox">
        <div>
            <!-- 查询表格筛选条件 -->
           <div class="demo-input-suffix tiaojianchaxun" >
                <!-- 设备名称：
                <el-input
                    placeholder="请输入设备名称"
                    prefix-icon="el-icon-search"
                    v-model="tiaojianchaxun.meterName"
                    style="width:200px"
                     >
                </el-input> -->

                 <!-- 设备型号：
                <el-input
                    placeholder="请输入设备型号"
                    prefix-icon="el-icon-search"
                    v-model="tiaojianchaxun.meterMode"
                     style="width:200px">
                </el-input> -->

                 设备类型：
                <el-select v-model="tiaojianchaxun.meterType" placeholder="请选择设备类型">
                    <el-option
                    v-for="(item,index) in options"
                    :key="index"
                    :label="item.label"
                    :value="item.value"                     
                    >
                    </el-option>
                </el-select>
                    <el-button type="primary" icon="el-icon-setting" @click="chongzhi">重置</el-button>
                    <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>              
                </div>


            <!-- 添加表计信息模块 -->
            <div>
                 <el-button icon="el-icon-circle-plus-outline" class="add" @click="btnadd">添加</el-button>
                  <el-dialog :visible.sync="dialogFormVisible">
            <el-form ref="form" :model="addbiaodanxinxi" label-width="100px"> 
           
                    <el-form-item :label="item.lable" v-for="(item,index) in tableHead" 
                    :key="index">          
                        <el-input v-model="addbiaodanxinxi[item.id]"></el-input>
                    </el-form-item> 

                     <el-form-item label="*设备类型">  
                      
                             <el-select v-model="addbiaodanxinxi.meterType" placeholder="请选择">
                                <el-option
                                v-for="item in optionsBiaojileixin"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>                   
                       

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
               
                 <!-- <el-table
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
                  </template> -->


                <!-- </el-table-column>                 
            </el-table> -->

             <el-table
                :data="getTablexinxi"
                style="width: 100%"
                :header-cell-style="getRowClass">
                              
                <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item :label="item.lable" v-for="(item,index) in tableHead2" :key="index" v-if="index>4">
                        <span>{{ props.row[item.id] }};</span>
                    </el-form-item>

                 

                    </el-form>

                </template>
                </el-table-column>
                 <el-table-column
                :label="item.lable"
                :prop="item.id"  v-for="(item,index) in tableHead2" :key="index" v-if="index<=4">
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
                    // meterName:'',//设备名称
                    // meterMode:'',//设备型号
                    meterType:''//设备类型
                },
                options:[],//表计计量类型
                tiaojianpage:1,

                               
                dialogFormVisible:false,//弹窗是否显示
                quedinganniu:true,//是否显示确定添加按钮    
                xiugaibtn:false,//是否显示确定修改按钮      
            
                addbiaodanxinxi:{      
                    agreement:'',//	string 通讯协议
                    comMode:'',//	string 通讯方式
                    contact:'',//	string 厂商联系方式
                    factoryName:'',//	string 制造厂商名称
                    hardwareVersion:'',//	string 硬件版本号
                    meterMode:'',//	string 设备型号
                    // meterName:'',//	string 设备名称
                    meterType:'',//	string 设备类型
                    softwareVersion:'',//	string 软件版本号
                    specification:''//	string 规格
                        },//添加表单信息
                tableHead:[{
                  lable:'*设备型号',
                  id:'meterMode'
                },
                // {
                //   lable:'*设备名称',
                //   id:'meterName'
                // },
                // {
                //   lable:'*设备类型',
                //   id:'meterType'
                // },
                {
                  lable:'通讯方式',
                  id:'comMode'
                },
                 {
                  lable:'通讯协议',
                  id:'agreement'
                },
                 {
                  lable:'*生产厂商',
                  id:'factoryName'
                },
                 {
                  lable:'厂商联系方式',
                  id:'contact'
                },
                 {
                  lable:'硬件版本号',
                  id:'hardwareVersion'
                },
                 {
                  lable:'软件版本号',
                  id:'softwareVersion'
                },
                 {
                  lable:'规格',
                  id:'specification'
                },
              ],
               tableHead2:[{
                  lable:'设备型号',
                  id:'meterMode'
                },
                // {
                //   lable:'*设备名称',
                //   id:'meterName'
                // },
                {
                  lable:'设备类型',
                  id:'meterTypeName'
                },
                {
                  lable:'通讯方式',
                  id:'comMode'
                },
                 {
                  lable:'通讯协议',
                  id:'agreement'
                },
                 {
                  lable:'生产厂商',
                  id:'factoryName'
                },
                 {
                  lable:'厂商联系方式：',
                  id:'contact'
                },
                 {
                  lable:'硬件版本号：',
                  id:'hardwareVersion'
                },
                 {
                  lable:'软件版本号：',
                  id:'softwareVersion'
                },
                 {
                  lable:'规格：',
                  id:'specification'
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
            pagevalue:1,
            optionsBiaojileixin:[],//获取表计类型树
           
            }
        },
        created(){
            this.getTabledata();
            this.getbiaojileixinshu();
            window.sessionStorage.setItem('tiaojianchaxun','') 
            this.$axios({
                method:'GET',
                url:this.api.baseUrl + this.api.sysselect +'/2',
                type:'json'
            }).then(response=>{
                console.log(response)
                if(response.data.success === true){
                    this.options = response.data.data
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        methods:{
         
           //获取设备类型树
           getbiaojileixinshu(){
               this.$axios({
                   method:'GET',
                   url:this.api.baseUrl + this.api.sysselect + '/2',
                   type:'json'
               }).then(response=>{
                   console.log(response)
                    if(response.data.success === true){
                    this.optionsBiaojileixin = response.data.data
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

            },

                //按条件查询的搜索按钮
            search(){
                window.sessionStorage.setItem('tiaojianchaxun','yes')
                console.log(this.tiaojianchaxun.meterType)
                let params = this.tiaojianchaxun
               
                params.page = this.tiaojianpage
                params.rows = 10
                this.$axios({
                    method:'GET',
                    url:this.api.baseUrl + this.api.filebasicMater,
                    params:params,
                    type:'json'
                }).then(response=>{
                   console.log(response) ;
                
               
               
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
                this.tiaojianpage = 1;
                    }

                }).catch(err=>{
                    console.log(err)
                })

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
                                    url:this.api.baseUrl+this.api.filebasicMater + '/' + id,
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

                 if(this.addbiaodanxinxi.meterMode===''||
                this.addbiaodanxinxi.meterType===''||
                this.addbiaodanxinxi.factoryName === ''){
                    window.alert('带"*"的填框都是必填的哦~')
                }else{
         
                let params = this.addbiaodanxinxi;
                console.log(params.meterType)
                for(let i = 0; i < this.optionsBiaojileixin.length; i++){               
                    if(this.addbiaodanxinxi.meterType === this.optionsBiaojileixin[i].label){
                        this.addbiaodanxinxi.meterType = this.optionsBiaojileixin[i].value
                        console.log('1111')
                    }
                     

                }
                
                this.$axios({
                    method:'PUT',
                    url:this.api.baseUrl+this.api.filebasicMater,
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
                    this.search()
                }else{
                    this.getTabledata();
                }
                
                    }
                }).catch(err=>{
                    console.log(err)
                })
                }

            },
             

                //修改按钮
            xiugaiRow(index,row){
                
                this.dialogFormVisible = true;
                this.quedinganniu = false;
                this.xiugaibtn = true;
                this.addbiaodanxinxi = this.getTablexinxi[index]
                console.log( this.addbiaodanxinxi.meterType)
                
                for(let i = 0; i < this.optionsBiaojileixin.length; i++){
                    console.log(this.optionsBiaojileixin[i].value)
                    if(this.addbiaodanxinxi.meterType === String(this.optionsBiaojileixin[i].value)){
                        this.addbiaodanxinxi.meterType = this.optionsBiaojileixin[i].label
                        console.log('1111')
                    }
                     

                }
              
                for(let key in this.addbiaodanxinxi)
                {
                    this.addbiaodanxinxi[key] = this.getTablexinxi[index][key]
                }
                // this.getTabledata()
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
                   if(this.addbiaodanxinxi.meterMode===''||
                this.addbiaodanxinxi.meterType===''||
                this.addbiaodanxinxi.factoryName === ''){
                    window.alert('带"*"的填框都是必填的哦~')
                }else{ 
                this.quedinganniu=false;//网关确定按钮的是否显示
                console.log(this.addbiaodanxinxi.meterType)
                console.log(typeof(this.addbiaodanxinxi.meterType))        
                let params = this.addbiaodanxinxi;
                           
                this.$axios({
                    method:'POST',
                    url:this.api.baseUrl+this.api.filebasicMater,
                    data:params,
                    type:'json'
                }).then(response=>{
                    console.log(response)
                    if(response.data.success === true)
                    {
                       
                         this.$message('添加成功')
                         this.quedinganniu=true;//网关确定按钮的是否显示
                    if(window.sessionStorage.getItem('tiaojianchaxun') === 'yes'){
                            this.search()
                        }else{
                            this.getTabledata();
                        }
                        this.dialogFormVisible= false;
                        }
                        
                }).catch(err=>{
                    console.log(err)
                    window.alert('断网啦！！！请联系网络管理人员~')
                })
                }
            },
            
      
            //获取 信息展示
            getTabledata(){
                this.$axios({
                    method: "GET",
                    url:this.api.baseUrl+this.api.filebasicMater,
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
.tiaojianchaxun{
    margin-top:1%; 
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
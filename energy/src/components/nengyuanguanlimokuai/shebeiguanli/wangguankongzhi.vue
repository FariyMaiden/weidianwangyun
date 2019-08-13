<template>
<!-- 网关控制 -->
    <div>
        <!-- 所有网关基本信息表格 -->
        <div class="wangguangbigbox">

             <div>
        <el-button icon="el-icon-circle-plus-outline" class="addwangguan" @click="btnadd">添加网关信息</el-button>
        <el-dialog :visible.sync="dialogFormVisible">
        <el-form ref="form" :model="addwangguanxinxi" label-width="100px" > 
           
                    <el-form-item label="逻辑地址">
                        <el-input v-model="addwangguanxinxi.LogicAddr"></el-input>
                    </el-form-item>
                    <el-form-item label="资产编号">
                        <el-input v-model="addwangguanxinxi.ConAssetsCode"></el-input>
                    </el-form-item>
                    <el-form-item label="安装地址">
                        <el-input v-model="addwangguanxinxi.InstallAddr"></el-input>
                    </el-form-item>
                    <el-form-item label="软件版本">
                        <el-input v-model="addwangguanxinxi.InstallTime"></el-input>
                    </el-form-item>
                    <el-form-item label="硬件版本">
                        <el-input v-model="addwangguanxinxi.SoftVer"></el-input>
                    </el-form-item>
                    <el-form-item label="厂家名称">
                        <el-input v-model="addwangguanxinxi.FactoryName"></el-input>
                    </el-form-item>
                    <el-form-item label="备注信息">
                        <el-input v-model="addwangguanxinxi.Memo"></el-input>
                    </el-form-item>
                <el-form-item>
                </el-form-item>                
                </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit" v-if='quedinganniu'>确定添加</el-button>
             <el-button type="primary" @click="xiugaiwangguanxinxi" v-if="xiugaibtn">确定修改</el-button>
          </div>
            </el-dialog>
          </div>

            <div>          
               <el-table
                    :data="getwangguanxinxi"
                    border
                    style="width: 100%"
                    :header-cell-style="getRowClass"
                    >
                    <el-table-column
                    v-for="(item,index) in tablelable" :key="index"
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
                      @click.native.prevent="xiugaiRow(scope.$index, getwangguanxinxi)"
                      type="text"
                      size="small"
                     icon="el-icon-edit">
                   
                    </el-button>
                    <!-- <el-button
                      @click.native.prevent="caozuoRow(scope.$index, getwangguanxinxi)"
                      type="text"
                      size="small"
                     icon="el-icon-edit">
                      操作
                    </el-button> -->
                    <el-button
                      @click.native.prevent="deleteRowwangguan(scope.$index, getwangguanxinxi)"
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
    <!-- 基本操作 -->
        <div class="wangguanjibencaozuo" v-if="wangguanjibencaozuo">

        <div>
            <h2>基本状态</h2>
             时钟：<el-input v-model="timeinput"  style="width:300px"></el-input>
             心跳：<el-input v-model="xintiaoinput"  style="width:300px"></el-input>
        </div>

        <div>
            <h2>基本操作</h2>
                <ul>
                    <li>时间操作：
                   <el-button type="primary" plain icon="el-icon-edit-outline" size="medium">抄时钟</el-button>
                   <el-button type="success" plain icon="el-icon-s-tools" size="medium">设时钟</el-button>
                   </li>
                    <li>心跳操作：
                         <el-button type="primary" plain icon="el-icon-edit-outline" size="medium">读心跳</el-button>
                         <el-button type="success" plain icon="el-icon-s-tools" size="medium">设心跳</el-button>
                    </li>
                    <li>复位操作：
                        <el-button type="primary" plain icon="el-icon-edit-outline" size="medium">硬件初始化</el-button>
                         <el-button type="success" plain icon="el-icon-s-tools" size="medium">数据区初始化</el-button>
                         <el-button type="primary" plain icon="el-icon-edit-outline" size="medium">参数及数据区初始化</el-button>
                        

                    </li>
                    <li>档案操作：
                         <el-button type="success" plain icon="el-icon-s-tools" size="medium">重新下发</el-button>
                    </li>
                </ul>

        </div>
            
        </div>

        </div>
    </div>
</template>

<script>
    export default {

        data(){
            return{
                addwangguanxinxi:{
                    LogicAddr:'',
                    ConAssetsCode:'',
                    InstallAddr:'',
                    InstallTime:'',
                    SoftVer:'',
                    HardVer:'',
                    FactoryName:'',
                    Memo:''

                },
                 tablelable: [{
                    lable: '逻辑地址',
                    id: 'LogicAddr',
                    }, {
                    lable: '资产管理',
                    id: 'ConAssetsCode',
                    }, {
                    lable: '安装地址',
                    id: 'InstallAddr',
                    }, {
                    lable: '安装时间',
                    id: "InstallTime",
                    }, {
                    lable: '软件版本',
                    id: 'SoftVer',
                    }, {
                    lable: '硬件版本',
                    id: "HardVer",
                    }, {
                    lable: '厂家名称',
                    id: 'FactoryName',
                    }, {
                    lable: '备注信息',
                    id: "Memo",
                }],
        getwangguanxinxi:[{
            ConAssetsCode: "181904001155",
            FactoryName: "TRJ",
            FouthRegionCode: "0301001001",
            HardVer: "V1.0",
            InstallAddr: "默认地址",
            InstallTime: "20181229",
            LogicAddr: "90400483",
            Memo: "",
            SIM: "1",
            SoftVer: "V1.0",
            UseStatus: "1",
            id: 153,
            index: "1"
        },
        {
            ConAssetsCode: "181904001182",
            FactoryName: "TRJ",
            FouthRegionCode: "0301001001",
            HardVer: "V1.0",
            InstallAddr: "默认地址",
            InstallTime: "20190103",
            LogicAddr: "9040049E",
            Memo: "",
            SIM: "1",
            SoftVer: "V1.0",
            UseStatus: "1",
            id: 154,
            index: "2"
        }],
         dialogFormVisible:false,
         quedinganniu:true,//弹框里的确定点击按钮
         xiugaibtn:false,//弹框里的修改点击按钮
         wangguanjibencaozuo:false,//网关的基本操作按钮
         //基本操作
         timeinput:'2019-6-24 11:31',//抄设的时间
         xintiaoinput:'5',//抄设的心跳
             fenyebanduan:{
              endRow: 10,//结束条数
              firstPage: 1,//第一页
              hasNextPage: true,//是否有下一页
              hasPreviousPage: true,//是否有上一页
              // isFirstPage: true,//是否是第一页
              // isLastPage: true,//是否是最后一页
              // lastPage: 1//最后一页页码
            },
            }
           
        },
        methods:{
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
    formatter(row, column) {
        return row.address;
      },
          //更改表头颜色
            getRowClass({ row, column, rowIndex, columnIndex }) {
                if (rowIndex == 0) {
                        return 'background:#EFEFEF'
                } else {
                        return ''
                }
            },
            //点击网关信息添加按钮
            btnadd(){
                this.dialogFormVisible = true;
                this.quedinganniu = true;
                this.xiugaibtn = false;

            },
            //弹框里的确定添加按钮
            onSubmit(){
              
            },
            //修改按钮
            xiugaiRow(){
                this.dialogFormVisible = true;
                this.quedinganniu = false;
                this.xiugaibtn = true;

            },
            //弹框里的确定修改按钮
            xiugaiwangguanxinxi(){

            },
            //移除网关按钮
            deleteRowwangguan(){

            },
            //操作按钮
            caozuoRow(index,row){
            this.wangguanjibencaozuo = true;
            

            },
        }
        
    }
</script>

<style>
*{
    list-style: none;
}
.wangguangbigbox{
    float: left;
    margin-left: 2%;
    width: 100%;
}
.addwangguan{
    margin-left: 92%;
    margin-bottom: 1%;
    margin-top: 1%;
    background-color: #45b0e8; 
}
li{
    margin-top: 1%;
}

</style>
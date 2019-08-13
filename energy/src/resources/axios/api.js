export default{
    // 设置相对路径

    // 基本路径
     baseUrl:'http://172.0.0.112',
    // baseUrl:'',
    // baseUrl:'http://localhost',
    // baseUrl:'http://localhost:8088',


    // 登陆接口
    login:'/login',

    //1、能源管理接口模块

    //档案管理


// 用能单位模块参数（POST）：
        // companyArea	string 所属地区
        // companyBusiness	string 主营业务 
        // companyName	string 名称
        // companyType	string 类型（数据字典）
        // contact	string 联系人
        // contactInfo	string 联系电话 
        // id	integer($int64)  id
        // memo	string 备注
    filecompany:'/file/company',//（查询（GET）、添加（POST）、修改（PUT）、删除（DELETE:'/file/company/{id}'））用能单位

    //用能结构模块参数：
    // companyId    integer($int64) 用能单位id
    // id	integer($int64) id
    // installAdress	string 安装地址
    // installDate	string($date-time) 安装日期
    // level	integer($int32) minimum: -128 maximum: 127 层级（默认0）
    // memo	string 备注
    // meterCode	string 表号（用户自定义）
    // meterId	integer($int64) 关联的表id
    // parentId	integer($int64) 父id
    // regionCode	string 所在区域编码
    //以下参数还需等待添加 2019-6-14（记录）
    // companyname  string 所属区域名称
    // regionname   string 用能单位名称
    fileorganization:'/file/organization',//(查询（GET）、添加（POST）、修改（PUT）、删除（DELETE:'/file/organization/{id}'）)用能结构

    //用能结构树接口
    fileorganizationtree:'/file/organization/tree',

    //根据父id查询子用能结构,只返回一层
    fileorganizationtreeasync:'/file/organization/tree/async',

    //档案管理 --》区域档案
    //作用：区域信息的增删查改（GET,POST,PUT,DELETE）
    // area	number 面积
    // memo	string 说明
    // parentId	integer($int64) 父id
    // regionName	string 名称
    sysregion:'/sys/region',//(POST,PUT，GET，DELETE)
    sysregionbatch:'/sys/region/batch',//(DELETE)（批量删除）
    sysregiontree:'/sys/region/tree',///{parentId}(GET)（树的获取）




    //计量设备--》表计
    // companyId~	integer($int64) 所属用能单位id！！
    // countPoint~	string用户名称（原计量点）！！
    // installAddress~	string 安装地址！！
    // installDate~	string 安装时间
    // meterBaseId~	integer($int64) 关联基础表计id！！ 1
    // regionId~	integer($int64) 所属区域id！！
    // serialNo~	string 设备序列号id！！
    // gatewayId~	integer($int64)所属网关id   1！！
    // meterAddress~	string 表通讯地址   2！！
    // parentId~	integer($int64)父表id（）没有：0   2！！
    // useStatus~	integer($int32)minimum : -128 maximum: 127使用状态
    filemater:'/file/mater',// (查询（GET）、添加（POST）、修改（PUT）、删除（DELETE:'/file/mater/{id}'）) 计量设备--》表计
    filematertreeparentId:'/file/mater/tree',//根据父id查询


    //计量设备--》网关
    // companyId:'',//~	integer($int64)所属单位id0
    // deviceName:'',//~   string设备名称
    // deviceNo:'',//~	    string设备编号
    // installAdress:'',//~	string安装地址0
    // installDate:'',//~	string($date-time)安装时间0
    // memo:'',//~	string备注0
    // meterTypeId:'',//~	integer($int64)表计类型id
    // publishTopic:'',//~	string发布主题0
    // simNo:'',//~	string sim卡号0
    // subscribeTopic:'',//~	string订阅主题0
    // useStatus:''//~	integer($int32) minimum: -128 maximum: 127使用状态0
    filegateway:'/file/gateway',//(查询（GET）、添加（POST）、修改（PUT）、删除（DELETE:'/file/gateway/{id}'）) 计量设备--》网关
    filegatewayall:'/file/gateway/all',//查询所有网关

    //设备基础信息（查询（GET）、添加（POST）、修改（PUT）、删除（DELETE{id}））
    // description:	表计基础信息
    // agreement	string 通讯协议
    // comMode	string 表计通讯方式
    // contact	string 厂商联系方式
    // factoryName	string 制造厂商名称
    // hardwareVersion	string 硬件版本号
    // meterMode	string 表计型号
    // meterName	string 表计名称
    // meterType	string 表计类型
    // softwareVersion	string 软件版本号
    // specification	string 规格
    filebasicMater:'/file/basicMater',
    filebasicMaterall:'/file/basicMater/all',//查询所有基础表计(GET)

    


    


    //2、系统管理模块接口

    //用户管理(GET,POST,PUT,DELETE)
    //作用：查询用户，添加用户，修改用户，删除用户（/sys/user/id）
    //参数：
    // account:'',//	string 客户账号
    // contact:'',//	string 联系人
    // email:'',//	string 电子邮件
    // meno:'',//	string 备注
    // mobile:'',//	string 联系电话
    // password:'',//	string 密码
    // regionId:'',//	string 关联区域id
    // roleIds:[],//	[...]
    // username:'',//	string 用户名  
    sysuser:'/sys/user',
    
    //数据字典
    //作用：数据字典的TYPE（添加，查询）
    //参数：
    // id	integer($int64)id
    // memo	string类型备注
    // typeName	integer($int64)类型名称（typeid）
    sysdatatype:'/sys/dataType',

    //Select选项
    //作用：在档案管理---基础表计信息模块（查询条件设备查询类型）
    sysselect:'/sys/select',//{typeId}


     //作用：数据字典的dataDetail（添加，查询）
    //参数：
    // detailKey	string类型key（自定义）
    // detailValue	string类型Value（自定义）
    // id	integer($int64)id
    // memo	string类型备注
    // typeId	integer($int64)类型名称（typeid）
    sysdataDetail:'/sys/dataDetail',

    //权限管理
    //作用：权限管理模块里的（增删查改）
    //参数：
        // id	integer($int64) id
        // meno	string 备注
        // name	string 名称
        // path	string menu路径
        // type	integer($int32)权限类型
        // url	string url
    syspermission:'/sys/permission',

    //查询所有权限类型
    //作用：返回所有权限类型，以供角色增加的时候共列表给予客户选择
    //参数：
        // code	string
        // data	{
        // }
        // msg	string
        // success	boolean
    syspermissionall:'/sys/permission/all',

    //角色权限类型的（增删查）
    //作用：具体角色定义的权限类型
    sysrolePermission:'/sys/rolePermission',
    

    //角色管理
    //作用：角色管理（增删查改）
    //参数：
        // id	integer($int64) id
        // memo	string 备注
        // name	string 角色名称
        // permissionIds [ 权限ids integer($int64)]
    sysrole:'/sys/role',

    //作用：查询所有角色（GET）
    sysroleall:'/sys/role/all',




    //3、报表接口
    //作用：获取最近七天尖峰平谷总电量（GET）
    //返回参数：
    //code	string
    //data	{尖（峰，平，谷，总）:[companyId:''//用能单位ID,dataFlag:''//用电时间段,reportData:''//用电量],reportDate:''//用电日期}
    //msg	string
    //success	boolean
    reportEnergy:'/report/energy',

    //作用：获取最近七天用能结构用水量
    //返回参数：
    //code	string
    //data	{...}
    //msg	string
    //success	boolean
    reportCompanyWater:'/report/CompanyWater',

    //作用：获取最近七天用能结构电量
    //返回参数：
    // code	string
    // data	{...}
    // msg	string
    // success	boolean
    reportorgEnergy:'/report/orgEnergy',

    //作用：获取上个月各楼层耗能
    //返回参数：
    // code	string
    // data	{...}
    // msg	string
    // success	boolean
    reportpreMonthEnergy:'/report/preMonthEnergy',

    //作用：获取上个月各楼层用水总量
    // code	string
    // data	{...}
    // msg	string
    // success	boolean
    reportpreMonthWater:'/report/preMonthWater',



    //3、实时监测模块
    //用电查询（按日查询）
    //作用：获取电表数据查询
    //传输参数：
    // regionId:'',//电表区域
    // meterMode:'',//设备型号
    // countPoint:'',//用户名称（原计量点）
    // date:'',//查询日期 
    // radio: '',//查询的数据类型 
    electricitydata:'/electricity/data',//（GET）

    //作用：按月查询用电数据 
    electricitymonth:'/electricity/month',//(GET)

    //用水查询
    //作用：获取水表数据查询（按日查询）
    //传输参数：
    //countPoint   string(query)用户名称（原计量点）
    //date string(query)	查询日期
    //flag string(query)	数据标识
    //page integer($int32)(query)	起始页
    //regionId integer($int64)(query)	区域id
    //rows integer($int32)(query)	每页大小
    waterdata:'/water/data',//(GET)

    // 作用：按月查询用水量
    watermonth:'/water/month',


    // 4、能源看板数据
    // 作用：获取能耗数据
    // 获取到的数据
    // data{ 
    // "type": 0.16109302200073242,
    // "type1": 1309.3800048828125,
    // "type2": 0,
    // "type3": 0,
    // "fee": 0,
    // "fee1": 0,
    // "fee2": 0,
    // "fee3": 0,
    // "typeRatio": 0,
    // "typeRatio1": 0,
    // "typeRatio2": 0,
    // "typeRatio3": 0,
    // "feeRatio": 0,
    // "feeRatio1": 0,
    // "feeRatio2": 0,
    // "feeRatio3": 0}
    reporttotal:'/report/total',//(GET)

    //作用：获取当年每月数据
    // 获取到的数据
    // data: [
    //     {
    //       "consumption": "6113.12",
    //       "reportMonth": "2019-07"
    //     }
    reportMonthTotalyear:'/report/MonthTotal',//(GET(/{year}))

    //作用：获取每月尖峰平谷各总量
    
    reportMonthTypemonth:"/report/MonthType",//(GET(/{month(2019-07)})

    // 作用：获取各区域耗能
    reportMonthRegion:'/report/MonthRegion',//(GET)

    // 作用：获取用能单位信息
    // 返回的数据
    // {
    //     "success": true,
    //     "data": {
    //       "type3": 0,   气
    //       "address": "", 地址
    //       "type2": 0,   水
    //       "companyName": "", 用能单位
    //       "accNo": "", 账号
    //       "type1": 47   电
    //     }
    //   }
    reportcompany:'/report/company',//(GET)

}

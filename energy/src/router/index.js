import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            component: resolve => require(['../components/page/Login.vue'], resolve),
            meta: {
                requireAuth: false
              }
        },   
        {
            path: '/bigHome',
            component: resolve => require(['../components/bigHome.vue'], resolve),
            meta: {
                requireAuth: true
              }
        },   

        {
            path: '/nengyuanxitong',
            redirect: '/zhanshishouye' ,
            meta: {
                requireAuth: true
              }
        },
        {
            path: '/nengyuanxitong',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件',requireAuth: true },
            children:[
                {
                    path: '/zhanshishouye',
                    component: resolve => require(['../components/zhanshishouye.vue'], resolve),
                    meta: { title: '能源看板' ,requireAuth: true }
                },
              
                {
                    // 实时监控
                    path: '/dianbiaoshuju',
                    component: resolve => require(['../components/nengyuanguanlimokuai/nenghaotongji/chaobiaoshuju/dianbiaoshuju.vue'], resolve),
                    meta: { title: '用电查询' ,requireAuth: true }
                },
                {
                    
                    path: '/yuedianbiaochaxun',
                    component: resolve => require(['../components/nengyuanguanlimokuai/nenghaotongji/chaobiaoshuju/yuedianbiaochaxun.vue'], resolve),
                    meta: { title: '月用电查询',requireAuth: true  }    
                },
                {
                    
                    path: '/shuibiaoshuju',
                    component: resolve => require(['../components/nengyuanguanlimokuai/nenghaotongji/chaobiaoshuju/shuibiaoshuju.vue'], resolve),
                    meta: { title: '用水查询',requireAuth: true  }    
                },
                {
                    
                    path: '/yueshuibiaoshuju',
                    component: resolve => require(['../components/nengyuanguanlimokuai/nenghaotongji/chaobiaoshuju/yueshuibiaoshuju.vue'], resolve),
                    meta: { title: '月用水查询',requireAuth: true  }    
                },
                {
                    //实时监控--》历史数据    
                    path: '/dongjieshuju',
                    component: resolve => require(['../components/nengyuanguanlimokuai/nenghaotongji/lishishuju/dongjieshuju.vue'], resolve),
                    meta: { title: '冻结数据',requireAuth: true  }
                },
              
                {
                    
                    path: '/gaojingshijian',
                    component: resolve => require(['../components/nengyuanguanlimokuai/nenghaotongji/lishishuju/gaojingshijian.vue'], resolve),
                    meta: { title: '告警事件',requireAuth: true  }   
                },
                {
                   
                    path: '/feiyongcanshu',
                    component: resolve => require(['../components/nengyuanguanlimokuai/nenghaotongji/lishishuju/feiyongcanshu.vue'], resolve),
                    meta: { title: '费用参数',requireAuth: true  }
                },
                {
                    //能耗分析    
                    path: '/nenghaofenxi',
                    component: resolve => require(['../components/nengyuanguanlimokuai/nenghaofenxi/nenghaofenxi.vue'], resolve),
                    meta: { title: '能耗分析' ,requireAuth: true }
                },
                {
                    // 设备管理
                    path: '/biaojikongzhi',
                    component: resolve => require(['../components/nengyuanguanlimokuai/shebeiguanli/biaojikongzhi.vue'], resolve),
                    meta: { title: '表计控制' ,requireAuth: true }
                },
                {
                   
                    path: '/biaojicanshu',
                    component: resolve => require(['../components/nengyuanguanlimokuai/shebeiguanli/biaojicanshu.vue'], resolve),
                    meta: { title: '表计参数' ,requireAuth: true }
                },
                {
                   
                    path: '/wangguankongzhi',
                    component: resolve => require(['../components/nengyuanguanlimokuai/shebeiguanli/wangguankongzhi.vue'], resolve),
                    meta: { title: '网关控制' ,requireAuth: true }
                },
                {
                   
                    path: '/baojinguanli',
                    component: resolve => require(['../components/nengyuanguanlimokuai/shebeiguanli/baojinguanli.vue'], resolve),
                    meta: { title: '报警管理' ,requireAuth: true }
                },
                {
                    // 结算管理
                    path: '/chongzhituifei',
                    component: resolve => require(['../components/nengyuanguanlimokuai/jiesuanguanli/chongzhituifei.vue'], resolve),
                    meta: { title: '充值退费' ,requireAuth: true }
                },
                {
                    
                    path: '/yuanchengchongzhi',
                    component: resolve => require(['../components/nengyuanguanlimokuai/jiesuanguanli/yuanchengchongzhi.vue'], resolve),
                    meta: { title: '远程充值',requireAuth: true  }
                },
                {
                    
                    path: '/jiesuanbaobiao',
                    component: resolve => require(['../components/nengyuanguanlimokuai/jiesuanguanli/jiesuanbaobiao.vue'], resolve),
                    meta: { title: '结算报表',requireAuth: true  }
                },
                {
                    
                    path: '/caiwuduizhang',
                    component: resolve => require(['../components/nengyuanguanlimokuai/jiesuanguanli/caiwuduizhang.vue'], resolve),
                    meta: { title: '财务对账' ,requireAuth: true }
                },
            
                {
                    // 档案管理
                    path: '/shebeijichuxinxi',
                    component: resolve => require(['../components/nengyuanguanlimokuai/danganguanli/shebeijichuxinxi.vue'], resolve),
                    meta: { title: '设备型号' ,requireAuth: true }
                },
                {
                    path: '/jiliangshebei',
                    component: resolve => require(['../components/nengyuanguanlimokuai/danganguanli/jiliangshebei.vue'], resolve),
                    meta: { title: '计量设备' ,requireAuth: true }
                },
                {
                    path: '/wangguanshebei',
                    component: resolve => require(['../components/nengyuanguanlimokuai/danganguanli/wangguanshebei.vue'], resolve),
                    meta: { title: '网关设备' ,requireAuth: true }
                },
                {
                    path: '/kehudangan',
                    component: resolve => require(['../components/nengyuanguanlimokuai/danganguanli/kehudangan.vue'], resolve),
                    meta: { title: '用户档案' ,requireAuth: true }
                },
                {
                    path: '/quyudangan',
                    component: resolve => require(['../components/nengyuanguanlimokuai/danganguanli/quyudangan.vue'], resolve),
                    meta: { title: '区域档案' ,requireAuth: true }
                }
                ,
                {
                    // 系统管理
                    path: '/quanxianguanli',
                    component: resolve => require(['../components/xitongguanlimokuai/quanxianguanli.vue'], resolve),
                    meta: { title: '权限管理' ,requireAuth: true }
                }
                ,
                {
                    path: '/jueseguanli',
                    component: resolve => require(['../components/xitongguanlimokuai/jueseguanli.vue'], resolve),
                    meta: { title: '角色管理' ,requireAuth: true }
                }
                ,
                {
                    path: '/shujuzidian',
                    component: resolve => require(['../components/xitongguanlimokuai/shujuzidian.vue'], resolve),
                    meta: { title: '数据字典' ,requireAuth: true }
                }
                ,
                {
                    path: '/caozuorizhi',
                    component: resolve => require(['../components/xitongguanlimokuai/caozuorizhi.vue'], resolve),
                    meta: { title: '操作日志' ,requireAuth: true }
                }
            ]
        },
     
        // {
        //     path: '*',
        //     redirect: '/404'
        // }
    ]
})

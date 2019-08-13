<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-lx-home',
                        index: 'zhanshishouye',
                        title: '能源看板'
                    },
                    {
                        icon: 'el-icon-video-camera',
                        index: '1',
                        title: '实时监控',
                        subs: [
                            {
                                index: 'dianbiaoshuju',
                                title: '用电查询'
                            },
                            {
                                index: 'shuibiaoshuju',
                                title: '用水查询'
                            },
                            {
                                index: '1-3',
                                title: '历史数据',
                                subs: [
                                    {
                                        index: 'dongjieshuju',
                                        title: '冻结数据'
                                    },
                                    {
                                        index: 'gaojingshijian',
                                        title: '告警事件'
                                    },
                                    {
                                        index: 'feiyongcanshu',
                                        title: '费用参数'
                                    }
                                ]
                            }
                          
                        ]
                    },
                    {
                        icon: 'el-icon-rank',
                        index: '2',
                        title: '能耗分析',
                        subs: [
                            {
                                index: 'nenghaofenxi',
                                title: '能耗分析',
                            }
                            
                        ]
                    },
                    {
                        icon: 'el-icon-monitor',
                        index: '3',
                        title: '设备管理',
                        subs: [
                            {
                                index: 'biaojikongzhi',
                                title: '表计控制',
                            },
                            {
                                index: 'biaojicanshu',
                                title: '表计参数',
                            },
                            {
                                index: 'wangguankongzhi',
                                title: '网关控制',
                            },
                            {
                                index: 'baojinguanli',
                                title: '报警管理',
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-coin',
                        index: '4',
                        title: '结算管理',
                        subs: [
                            {
                                index: 'chongzhituifei',
                                title: '充值退费',
                            },
                            {
                                index: 'yuanchengchongzhi',
                                title: '远程充值',
                            },
                            {
                                index: 'jiesuanbaobiao',
                                title: '结算报表',
                            },
                            {
                                index: 'caiwuduizhang',
                                title: '财务对账',
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-folder-opened',
                        index: '5',
                        title: '档案管理',
                        subs: [
                            {
                                index: 'shebeijichuxinxi',
                                title: '设备型号'
                            },
                            {
                                index: 'jiliangshebei',
                                title: '计量设备'
                            },
                            {
                                index: 'wangguanshebei',
                                title: '网关设备'
                            },
                            {
                                index: 'kehudangan',
                                title: '用户档案'

                            },
                            {
                                index: 'quyudangan',
                                title: '区域档案'

                            }
                        ]
                    }
                    ,
                    {
                        icon: 'el-icon-coordinate',
                        index: '6',
                        title: '系统管理',
                        subs: [
                            {
                                index: 'quanxianguanli',
                                title: '权限管理'
                            },
                            {
                                index: 'jueseguanli',
                                title: '角色管理'
                            },
                            {
                                index: 'shujuzidian',
                                title: '数据字典'
                            },
                            {
                                index: 'caozuorizhi',
                                title: '操作日志'

                            }
                        ]
                    }
                  
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        /* width: 250px; */
        width: 200px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>

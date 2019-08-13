<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">智慧能源综合管理平台</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
               
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
             	// 记录是否登录
			     window.sessionStorage.setItem('isLogin',true)
			     this.$router.push('/nengyuanxitong')
			// console.log(this.password + "----" + this.username)
			
            // let params = {username:this.ruleForm.username,password:this.ruleForm.password}
            // this.$axios({
            // 	method:'POST',
            // 	url:this.api.baseUrl + this.api.login,
            // 	params:params,
            // 	type:'json'
            // }).then(response=>{
            // 	 console.log(response)
            // 	if(response.data.success === true){
                 
            //         window.sessionStorage.setItem('denglvzhanghao',response.data.data.name)
            //         	// 记录是否登录
            //         window.sessionStorage.setItem('isLogin',true)
            // 		this.$router.push('/nengyuanxitong')
            // 	}else{
            // 		window.alert('密码错误，请重新输入！')
            // 	}
            // }).catch(err=>{
            // 	window.alert('网络错误，请联系网络管理人员')
            // 	console.log(err)
            // })
		
                // this.$refs[formName].validate((valid) => {
                //     if (valid) {
                //         localStorage.setItem('ms_username',this.ruleForm.username);
                //         this.$router.push('/nengyuanxitong');
                //     } else {
                //         console.log('error submit!!');
                //         return false;
                //     }
                // });
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background-image: url(../../assets/img/login-bg.jpg);
        background-size: 100%;
    }
    .ms-title{
        width:100%;
        line-height: 50px;
        text-align: center;
        font-size:20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:350px;
        margin:-190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255,255,255, 0.3);
        overflow: hidden;
    }
    .ms-content{
        padding: 30px 30px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
        margin-bottom: 10px;
    }
    .login-tips{
        font-size:12px;
        line-height:30px;
        color:#fff;
    }
</style>
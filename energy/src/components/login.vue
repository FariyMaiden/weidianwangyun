<template>
<!-- 登陆界面 -->
	<div class="loginbox">
		<img src="../assets/登陆背景图2.png" alt="" class="img1">
		<div class="loginfrom">
			
			<h1 class="h11">智慧楼宇综合管理系统</h1>
			<span>账号：</span><el-input placeholder="请输入账号" type="text" v-model="username" class="el-input__inner1"></el-input>
			<span>密码：</span><el-input placeholder="请输入密码" type="password" v-model="password" class="el-input__inner1"></el-input>
			<el-button type="primary" round @click="login()" class="elbutton2" style="margin-left: 85%">登录</el-button>
		</div>
		
	</div>
</template>
<script>

import axios from 'axios'
export default{
	data(){
		return{
		password:'',
		username:''

		}
	},
	methods:{
		login(){
				// 记录是否登录
			window.sessionStorage.setItem('isLogin',true)
			this.$router.push('/mainhead/zhanshishouye')
			// console.log(this.password + "----" + this.username)
			
		// let params = {username:this.username,password:this.password}
		// this.$axios({
		// 	method:'POST',
		// 	url:this.api.baseUrl + this.api.login,
		// 	params:params,
		// 	type:'json'
		// }).then(response=>{
		// 	 console.log(response)
		// 	if(response.data.success === true){
		// 		this.$router.push('/mainhead/zhanshishouye')
		// 	}else{
		// 		window.alert('密码错误，请重新输入！')
		// 	}
		// }).catch(err=>{
		// 	window.alert('网络错误，请联系网络管理人员')
		// 	console.log(err)
		// })
		
		 }

	},
	created(){
		// username
		// password
	
	},
	mounted(){


	}
}
</script>
<style>
 

.img1{
	position: absolute;
	top: 3%;
	left:3%;

}

.loginfrom{
	position: absolute;
	top: 6%;
	left: 35%;


}
.el-input__inner1{
	margin: 4%;
}

.h11{
	margin-left: 19%;
	margin-bottom: 19%;

}


</style>

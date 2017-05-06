# NewCityNewLife

### 简介

亲爱的你要去哪里，用于毕业生分享和查询去向信息，基于微信小程序的在线「同学录」。

### 分享

「我的——查看信息」页面可以分享给好友。

### 配置

1. 创建新的LeanCloud应用，并获取appId和appKey
2. 在项目根目录下添加配置文件config.js，示例如下
	
		/**
		 * 小程序配置文件
		 */
		
		var config = {
		    appId : "Your LeanCloud application appId",
		    appKey : "Your LeanCloud application appKey"
		}
		
		module.exports = config

3. 在LeanCloud应用中的_User表添加如下几列:

	name, gender(number), contact, highSchool, undergraduateSchool, undergraduateMajor, undergraduateSchoolCity, nowInstitution, nowCity, BBS
	
	除gender字段为number格式，其余均为string格式。

### 第三方SDK

[在微信小程序中使用 LeanCloud](https://leancloud.cn/docs/weapp.html)


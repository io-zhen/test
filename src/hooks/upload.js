import {
	getCloudCategoryList,
	addCategory
} from "./unicloud.js"
import {
	getCategoryList
} from "./category.js"
import {
	getAsyncList
} from "./Async.js"
// 把本地的上传到云端
let upload = async () => {
	uni.showLoading()
	// const cloudDatas = await getCloudCategoryList()
	const localAdd = await getAsyncList({
		type: "add"
	})
	// console.log('云端数据：', cloudDatas)
	console.log('本地数据：', localAdd)
	// 如果查询到更新记录
	let newAddArr = []
	if (localAdd.code == 0) {
		for (let i = 0; i < localAdd.data.length; i++) {
			newAddArr.push(localAdd.data[i].data)
		}
	}
	try {
		const uploadRes = await addCategory(newAddArr)
	} catch (e) {
		uni.showToast({
			title: '发生错误：' +
				e || '发生错误'
		})
	} finally {
		uni.hideLoading()
	}


}
// 把云端的保存到本地
let saveToLocal = () => {
	// const Datastore = require('nedb');
	// const DB = new Datastore({
	// 	autoload: true,
	// 	filename: './src/nedb/test.db',
	// })
	// DB.insert(cloudRes,
	// 	function(err, newDocs) {
	// 		if (err) {
	// 			console.log(err)
	// 		}
	// 		console.log(newDocs)
	// 	})
}
export {
	upload
}

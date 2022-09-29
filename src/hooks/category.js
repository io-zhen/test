import {
	reactive,
	ref
} from 'vue'
import dataStore from "@/nedb/db.js";
import {
	getCloudCategoryList
} from "@/hooks/unicloud.js"
const categoryDb = new dataStore('category')

const categoryList = reactive([])

let getCategoryList = async () => {
	const res = await categoryDb.find()
	categoryList.value = res.data
	const cloudRes = await getCloudCategoryList()

	console.log('本地:', res.data)
	console.log('云端:', cloudRes)
	const Datastore = require('nedb');
	const DB = new Datastore({
		autoload: true,
		filename: './src/nedb/test.db',
	})
	DB.insert(cloudRes,
		function(err, newDocs) {
			if (err) {
				console.log(err)
			}
			console.log(newDocs)
		})

}
const getOne = async (_id, title) => {
	let dataObj = reactive({})
	if (_id != '') {
		dataObj._id = _id
	}
	if (title != '') {
		dataObj.title = title
	}
	const res = await categoryDb.findOne(dataObj)
	return res
}
let addCategory = async (title) => {
	if (title == '') {
		uni.showToast({
			title: "标题不能为空",
			icon: "none"
		})
		return
	}
	const find = await getOne('', title)
	if (find.code == 1) {
		uni.showToast({
			title: "标题不能重复",
			icon: "none"
		})
		return
	}
	const dataObj = reactive({
		title: title
	})
	const res = await categoryDb.insert(dataObj)
	uni.showToast({
		title: "插入成功",
		icon: "none"
	})
	getCategoryList()
	return res
}
let delCategory = async (_id) => {
	const dataObj = reactive({
		_id
	})
	const res = await categoryDb.del(dataObj)
	uni.showToast({
		title: "删除成功",
		icon: "none"
	})
	getCategoryList()
	return res
}
let updateCategory = async (_id, title) => {
	const dataObj = reactive({
		_id,

	})
	const res = await categoryDb.update(dataObj, {
		title
	})
	uni.showToast({
		title: "修改成功",
		icon: "none"
	})
	getCategoryList()
	return res
}
let isEditor = ref(false)
export {
	categoryList,
	getCategoryList,
	addCategory,
	delCategory,
	updateCategory,
	isEditor
}

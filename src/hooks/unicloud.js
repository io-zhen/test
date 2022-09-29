// 访问云对象
const todo = uniCloud.importObject('todo-category') //第一步导入云对象
const getCloudCategoryList = async () => {
	const res = await todo.getCategory('title demo', 'content demo') //导入云对象后就可以直接调用该对象的方法了，注意使用异步await
	uni.showToast({
		title: '成功获取云数据'
	})
	// console.log('云端：', res.data)
	return res.data
}
const addCategory = async () => {
	const res = await todo.addCategory([{
		title: '读书100',
		_id: '111111111'
	}, {
		title: '读书99'
	}])
	uni.showToast({
		title: '成功插入1条云数据'
	})
	console.log(res)
	return res
}
const findByTitle = async (title = "读书") => {
	const res = await todo.findByTitle(title)
	uni.showToast({
		title: '成功找到'
	})
	console.log(res)
	return res
}
//addCategory()
// findByTitle()
export {
	getCloudCategoryList
}

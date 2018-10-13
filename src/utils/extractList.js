const extractList = function (snapshot) {
	const listData = [];
	if (snapshot && snapshot.val()) {
		const listDataMap = snapshot.val();
		Object.keys(listDataMap).forEach(itemID => {
			const item = Object.assign(listDataMap[itemID], { id: itemID });
			listData.push(item);
		});
	}
	return listData;
};

export default extractList;

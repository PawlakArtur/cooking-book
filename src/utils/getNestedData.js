const getNestedData = function (data, keys) {
	const splittedKeys = keys.split('.');
	let foundData = data;
	splittedKeys.forEach(function findNestedData(key) {
		foundData = foundData[key];
	});
	return foundData;
};

export default getNestedData;

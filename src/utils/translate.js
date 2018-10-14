import translations from '../translations';
import getNestedData from './getNestedData';

const translate = function (language, path) {
	const translatedData = getNestedData(translations[language], path);
	return translatedData;
};

export default translate;

const formatTime = function (inputTime) {
	const formattedHours = inputTime / 60;
	const formattedMinutes = inputTime % 60;
	const formattedTime = {
		hours: formattedHours,
		minutes: formattedMinutes
	};
	return formattedTime;
};

export default formatTime;

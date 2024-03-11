export const formatPhoneNumber = (phoneNumber: string): string => {
	console.log('phoneNumber', phoneNumber);
	if (phoneNumber.length !== 13) {
		return phoneNumber;
	}

	return `+${phoneNumber.slice(0, 2)} ${phoneNumber.slice(
		2,
		3
	)} ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}-${phoneNumber.slice(
		10,
		13
	)}`;
};

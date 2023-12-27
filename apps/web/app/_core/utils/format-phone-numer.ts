/**
 * Formats a phone number into the format +54 9 381-6619-9052
 * @param phoneNumber The phone number string to format.
 * @returns The formatted phone number.
 */
export const formatPhoneNumber = (phoneNumber: string): string => {
	if (phoneNumber.length !== 13) {
		return phoneNumber; // or throw an error
	}

	return `+${phoneNumber.slice(0, 2)} ${phoneNumber.slice(
		2,
		3
	)} ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}-${phoneNumber.slice(
		10,
		13
	)}`;
};

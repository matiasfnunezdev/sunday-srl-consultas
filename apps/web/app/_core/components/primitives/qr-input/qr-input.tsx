/* eslint-disable react/no-array-index-key -- N/A */
import React, { useEffect, useState } from 'react';

interface QRCodeInputProps {
	onValueChange: (values: string[]) => void;
}

export default function QRCodeInput({
	onValueChange,
}: QRCodeInputProps): JSX.Element {
	const [inputValues, setInputValues] = useState<string[]>(Array(6).fill(''));

	useEffect(() => {
		onValueChange(inputValues);
	}, [inputValues, onValueChange]);

	const handleChange = (index: number) => (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const newValue = event.target.value.replace(/\D/g, '').substring(0, 1);
		setInputValues(
			inputValues.map((val, idx) => (idx === index ? newValue : val))
		);

		// Focus next input field after valid input
		if (newValue && index < 5) {
			const nextSibling = document.querySelector<HTMLInputElement>(
				`input[name='otp-${index + 1}']`
			);
			if (nextSibling) {
				nextSibling.focus();
			}
		}
	};

	return (
		<div className="flex justify-center items-center flex-col">
			<div className="flex space-x-2">
				{inputValues.map((value, index) => (
					<input
						className="text-lg 2xl:text-xl text-black font-lato w-12 h-14 2xl:w-16 2xl:h-20 border-2 border-gray-300 text-center rounded-md focus:outline-none focus:border-blue-500 mb-6"
						key={index}
						maxLength={1}
						name={`otp-${index}`}
						onChange={handleChange(index)}
						onKeyPress={(event) => {
							if (!/[0-9]/.test(event.key)) {
								event.preventDefault();
							}
						}}
						type="text"
						value={value}
					/>
				))}
			</div>
		</div>
	);
}

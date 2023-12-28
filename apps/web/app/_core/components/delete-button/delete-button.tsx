/* eslint-disable react/button-has-type -- N/A */
type ButtonType = 'button' | 'submit' | 'reset';

interface ButtonProps {
	outlined?: boolean;
	type: ButtonType;
	label: string;
	handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	disabled?: boolean;
}

function DeleteButton(props: ButtonProps): React.ReactElement {
	const { label, type, outlined, disabled, handleClick } = props;

	const outlinedClasses = `text-[#DF4848] dark:text-[#DF4848] border-[#DF4848] bg-white dark:bg-white`;

	const notOutlinedClasses = `text-white dark:text-white border-[#DF4848] ${
		disabled ? 'bg-gray-400 dark:bg-gray-400' : 'bg-[#DF4848] dark:bg-[#DF4848]'
	} `;

	return (
		<button
			className={`${
				outlined ? outlinedClasses : notOutlinedClasses
			} text-base w-[137px] h-[50px] rounded-[0.3125rem] 2xl:text-base font-lato 2xl:w-[137px] 2xl:h-[50px] 2xl:rounded-[0.3125rem] border`}
			disabled={disabled}
			onClick={handleClick}
			type={type}
		>
			{label}
		</button>
	);
}

export default DeleteButton;

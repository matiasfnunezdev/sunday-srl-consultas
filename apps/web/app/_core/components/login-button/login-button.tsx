/* eslint-disable react/button-has-type -- N/A */
type ButtonType = 'button' | 'submit' | 'reset';

interface ButtonProps {
	outlined?: boolean;
	type: ButtonType;
	label: string;
	disabled?: boolean;
	handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function LoginButton(props: ButtonProps): React.ReactElement {
	const { label, type, outlined, disabled, handleClick } = props;

	const outlinedClasses =
		'border text-[#F2EC4C] dark:text-[#F2EC4C] border-[#F2EC4C] bg-[#202123] dark:bg-[#202123]';

	const notOutlinedClasses = `text-black dark:text-black ${
		disabled ? 'bg-gray-400 dark:bg-gray-400' : 'bg-[#F2EC4C] dark:bg-[#F2EC4C]'
	} `;

	return (
		<button
			className={`${
				outlined ? outlinedClasses : notOutlinedClasses
			}text-lg w-[137px] h-[50px] rounded-[0.3125rem] 2xl:text-xl font-lato 2xl:w-[137px] 2xl:h-[50px] 2xl:rounded-[0.3125rem]`}
			disabled={disabled}
			onClick={handleClick}
			type={type}
		>
			{label}
		</button>
	);
}

export default LoginButton;

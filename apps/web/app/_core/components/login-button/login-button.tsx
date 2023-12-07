/* eslint-disable react/button-has-type -- N/A */
type ButtonType = 'button' | 'submit' | 'reset';

interface ButtonProps {
	outlined?: boolean;
	type: ButtonType;
	label: string;
	handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function LoginButton(props: ButtonProps): React.ReactElement {
	const { label, type, outlined, handleClick } = props;

	const outlinedClasses =
		'text-[#368d9d] dark:text-[#368d9d] border-[#368d9d] bg-white dark:bg-white';

	const notOutlinedClasses =
		'text-white dark:text-white border-[#d9d9d9] bg-[#368d9d] dark:bg-[#368d9d]';

	return (
		<button
			className={`${
				outlined ? outlinedClasses : notOutlinedClasses
			}text-lg w-[137px] h-[50px] rounded-[0.3125rem] 2xl:text-xl font-lato 2xl:w-[137px] 2xl:h-[50px] 2xl:rounded-[0.3125rem] border`}
			onClick={handleClick}
			type={type}
		>
			{label}
		</button>
	);
}

export default LoginButton;

/* eslint-disable react/button-has-type -- N/A */
type ButtonType = 'button' | 'submit' | 'reset';

interface ButtonProps {
	type: ButtonType;
	label: string;
	handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function Button(props: ButtonProps): React.ReactElement {
	const { label, type, handleClick } = props;

	return (
		<button
			className="text-white dark:text-white text-lg w-[316px] h-[2.75rem] rounded-[0.3125rem] 2xl:text-xl font-lato 2xl:w-[416px] 2xl:h-[3.75rem] 2xl:rounded-[0.3125rem] border border-[#d9d9d9] bg-[#368d9d] dark:bg-[#368d9d]"
			onClick={handleClick}
			type={type}
		>
			{label}
		</button>
	);
}

export default Button;

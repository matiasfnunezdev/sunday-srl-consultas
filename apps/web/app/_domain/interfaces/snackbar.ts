export type Variant = 'success' | 'error' | 'warning' | 'info';

export interface SnackbarInterface {
	key: string;
	text: React.ReactNode;
	icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
	variant: Variant;
}

export type TSnackbarProps = Omit<SnackbarInterface, 'key'> & {
	handleClose: () => void;
	className?: string;
};

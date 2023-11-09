/* eslint-disable jsx-a11y/anchor-is-valid -- description */
import Link from 'next/link';

export default function Page(): JSX.Element {
	return (
		<div className="flex items-center justify-center h-screen bg-gray-800">
			<Link href="/chat" legacyBehavior>
				<a className="px-4 py-2 bg-gray-700 text-white font-bold rounded hover:bg-gray-600 transition duration-300">
					Ingresar
				</a>
			</Link>
		</div>
	);
}

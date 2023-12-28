import { AuthProvider } from '@/_core/contexts/auth-context';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element {
	return (
		<AuthProvider>
		<section>
			<div className="flex min-h-screen flex-col items-center justify-start bg-[#f9f9f9] bg-[url('/background_login.svg')] bg-no-repeat bg-contain">
				<div className="flex flex-col justify-center items-center w-full max-w-md px-4 py-4 mx-auto bg-[#f9f9f9] rounded-lg">
					<div className="font-gothic text-[#093239] text-center text-3xl 2xl:text-[2.125rem] leading-[normal] uppercase">
						Sunday Social
					</div>
					<p className="mb-[26px] 2xl:mb-[56px] text-black font-lato text-lg 2xl:text-xl leading-[normal] text-center text-gray-500">
						WhatsApp CRM
					</p>
					{children}
				</div>
			</div>
		</section>
		</AuthProvider>
	);
}

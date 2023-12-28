'use client';
import { useEffect, useRef, useState } from 'react';
import type { User } from 'firebase/auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import SideMenu from '../_core/components/primitives/side-menu/side-menu';
import Loading from '@/_core/components/primitives/loading/loading';
import { SubMenuToggleButton } from '@/_core/components/sub-menu-toggle-button/sub-menu-toggle-button';
import InitialsAvatar from '@/_core/components/initials-avatar/initials-avatar';
import { useAuth } from '@/_core/contexts/auth-context';
import { getInitials } from '@/_core/utils/get-initials';
import LogOutModal from '@/_core/components/log-out-modal/log-out-modal';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element {
	const { handleRefetchUserInfo, userInfo } = useAuth();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);
	const [showUserContextMenu, setShowUserContextMenu] = useState(false);
	const [showLogOutModal, setShowLogOutModal] = useState(false);

	const openMenu = (event: React.MouseEvent): void => {
		event.stopPropagation();
    setShowUserContextMenu(true);
  };

  const closeMenu = (): void => {
    setShowUserContextMenu(false);
  };

	useEffect(() => {
		async function refetchUserInfo(currentUser: User): Promise<void> {
			try {
				const idTokenResult = await currentUser.getIdTokenResult();
				const token = idTokenResult.token;
				if (token) {
					await handleRefetchUserInfo(token, currentUser.uid);
				}
			} catch {
				throw new Error('refetchUserInfo: Unexpected error');
			} finally {
				setIsLoading(false);
			}
		}
		const auth = getAuth();
		const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
			if (userAuth) {
				void refetchUserInfo(userAuth);
			} else {
				router.push('/login');
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const menuRef = useRef<any>(null);

	useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
			event.stopPropagation();
      if (showUserContextMenu && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    if (showUserContextMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserContextMenu]); 

	if (isLoading) {
		return (
			<div className="bg-white flex flex-row justify-center items-center h-screen">
				<Loading />
			</div>
		);
	}

	const renderFullName = `${userInfo?.displayName}`;

	const fullNameInitials =
		userInfo?.displayName
			? getInitials(userInfo.displayName?.split(' ')[0], userInfo.displayName?.split(' ')[1])
			: undefined;

	const renderLogOutModal = showLogOutModal ? (
		<LogOutModal
			onClose={() => {
				setShowLogOutModal(false);
			}}
		/>
	) : null;

	return (
		<section>
			<div className="flex flex-row bg-white">
				<div className='h-content bg-[#093239]'>
					<SideMenu />
				</div>
				<div className="w-full">
					<div className="w-full">
						<div className="flex justify-end items-center px-6 py-4">
							{fullNameInitials ? (
								<InitialsAvatar initials={fullNameInitials} />
							) : null}
							<div
								className="flex items-center justify-start py-2 px-0.5 rounded"
								onClick={openMenu}
								onKeyDown={undefined}
								role="button"
								tabIndex={0}
							>
								<div className="pl-4 text-base text-black font-lato font-medium leading-[normal]">
									{renderFullName}
								</div>
								<div>
									<SubMenuToggleButton
										color="black"
										toggled={showUserContextMenu}
									/>
								</div>
							</div>
							{showUserContextMenu ? (
									<div
										className="absolute z-20 w-44 divide-y divide-gray-100 rounded-lg bg-white text-right shadow dark:divide-gray-600 dark:bg-white"
										ref={menuRef}
										style={{
											top: 60,
											right: 30,
										}}
									>
										<ul className="py-2 text-base font-lato text-black dark:text-black">
											<li>
												<button
													className="block w-full cursor-pointer px-4 py-2 text-left font-lato"
													onClick={() => {
														router.push('/chat')
													}}
													type="button"
												>
													Chat
												</button>
											</li>
											<hr className="border-[#d9d9d9] dark:border-[#d9d9d9]" />
											<li className="mt-1">
												<button
													className="text-[#df4848] font-lato leading-[normal] block w-full cursor-pointer px-4 py-2 text-left font-lato"
													onClick={() => {
														setShowLogOutModal(true);
														setShowUserContextMenu(false);
													}}
													type="button"
												>
													Cerrar sesion
												</button>
											</li>
										</ul>
									</div>
								) : null}
						</div>
					</div>
					<div className="w-full">{children}</div>
				</div>
			</div>
			{renderLogOutModal}
		</section>
	);
}

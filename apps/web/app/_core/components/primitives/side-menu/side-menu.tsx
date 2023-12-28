import Link from 'next/link';
import { useState } from 'react';
import { SubMenuToggleButton } from '../../sub-menu-toggle-button/sub-menu-toggle-button';
import { SubItems } from './sub-items/sub-items';

export interface MenuSubItem {
	label: string;
	route: string;
}

export interface MenuItem {
	label: string;
	icon: string;
	route: string;
	subItems?: MenuSubItem[];
}

export default function SideMenu(): JSX.Element {
	const [showAdminSubMenu, setShowAdminSubMenu] = useState(false);

	const handleSetShowAdminSubMenu = (): void => {
		setShowAdminSubMenu(!showAdminSubMenu);
	};

	const linkItems = [
		{
			label: 'Inicio',
			icon: 'home',
			route: '/dashboard',
		},
		{
			label: 'Clientes',
			icon: 'account_circle',
			route: '/dashboard/clientes',
		},
		{
			label: 'Casos',
			icon: 'switch_account',
			route: '/dashboard/casos',
		},
		{
			label: 'Administración',
			icon: 'badge',
			route: '/dashboard/administracion',
			subItems: [
				{
					label: 'Etiquetas',
					route: '/dashboard/administracion/etiquetas',
				},
				// {
				// 	label: 'Usuarios',
				// 	route: '/dashboard/administracion/usuarios',
				// },
			],
		},
	];

	const renderLinkItems = linkItems.map((linkItem) => {
		const renderSubItems =
			linkItem.subItems?.length && showAdminSubMenu ? (
				<SubItems subItems={linkItem.subItems} />
			) : null;

		const renderSubMenuToggleButton = linkItem.subItems ? (
			<SubMenuToggleButton color="white" toggled={showAdminSubMenu} />
		) : null;

		return linkItem.subItems ? (
			<li className="mb-4" key={linkItem.route}>
				<button
					className="flex items-center justify-start p-2 hover:bg-[#368d9d] rounded"
					onClick={handleSetShowAdminSubMenu}
					type="button"
				>
					<img
						alt="Home"
						className="w-[20px] h-[20px] mr-1 2xl:w-[30px] 2xl:h-[30px] 2xl:mr-2 text-[#d9d9d9]"
						src={`/icons/${linkItem.icon}.svg`}
					/>
					<span className="text-[#d9d9d9] mt-[0.110rem] mt-1 font-lato text-md 2xl:text-lg leading-[normal]">
						{linkItem.label}
					</span>
					<div className="flex justify-center items-center">
						{renderSubMenuToggleButton}
					</div>
				</button>
				<div className="border-l px-3.5 ml-[22px] my-5">{renderSubItems}</div>
			</li>
		) : (
			<li className="mb-4" key={linkItem.route}>
				<Link
					className="flex items-center justify-start p-2 hover:bg-[#368d9d] rounded"
					href={linkItem.route}
				>
					<img
						alt="Home"
						className="w-[20px] h-[20px] mr-1 2xl:w-[30px] 2xl:h-[30px] 2xl:mr-2 text-[#d9d9d9]"
						src={`/icons/${linkItem.icon}.svg`}
					/>
					<span className="text-[#d9d9d9] mt-[0.110rem] mt-1 font-lato text-md 2xl:text-lg leading-[normal]">
						{linkItem.label}
					</span>
				</Link>
			</li>
		);
	});

	return (
		<aside className="md:block md:w-56 lg:w-56 2xl:w-60 h-screen top-0 left-0 bg-[#093239] text-white">
			<div className="flex flex-col p-4 bg-[#093239]">
				<div className="static mb-4 2xl:mb-10">
					<Link href="#">
						<div className="font-gothic text-white text-center text-lg 2xl:text-2xl leading-[normal] uppercase">
							Sunday <br /> Social
						</div>
					</Link>
					{/* <button className='absolute top-0 left-0' type='button'>
					<img
						alt="Home"
						className="w-[20px] h-[20px] mr-1 2xl:w-[30px] 2xl:h-[30px] 2xl:mr-2 text-[#d9d9d9]"
						src="/icons/side-menu-button.svg"
					/>
					</button> */}
				</div>

				<nav>
					<ul>{renderLinkItems}</ul>
				</nav>
			</div>
		</aside>
	);
}

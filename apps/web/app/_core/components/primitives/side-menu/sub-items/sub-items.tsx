import Link from "next/link";
import type { MenuSubItem } from "../side-menu"

export interface SideMenuItemsProps {
  subItems: MenuSubItem[]
}

export function SubItems(props: SideMenuItemsProps):JSX.Element {
  const { subItems } = props;

  const renderSubItems = subItems.map((subItem) => {
    return <li className="mb-4" key={subItem.route}>
    <Link
      className="flex items-center justify-start p-2 hover:bg-[#368d9d] rounded"
      href={subItem.route}
    >
      <span className="text-[#d9d9d9] mt-[0.110rem] mt-1 font-lato text-md 2xl:text-lg leading-[normal]">
        {subItem.label}
      </span>
    </Link>
  </li>
  })

  return <ul>{renderSubItems}</ul>
}
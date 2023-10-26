import { SidebarItem } from "./SideBarIteam";
import { InfoIdComponent } from "./InfoIdComponent";
import { LastMessagesInfo } from "./LastMessagesInfo";
import { LabelsComponent } from "./LabelsComponent";

const Sidebar = () => {
  return (
    <div className="fixed right-0 top-0 z-40 flex h-full max-h-screen overflow-hidden w-[431px] flex-none flex-col space-y-4 bg-[#202123] p-4 text-[14px] transition-all sm:relative sm:top-0">
      <div className="flex max-h-screen flex-row-reverse items-center bg-[#555759] rounded-md">
        <SidebarItem />
      </div>
      <div className="flex max-h-screen flex-row-reverse items-center bg-[#555759] rounded-md">
        <LastMessagesInfo />
      </div>

      <div className="flex max-h-screen flex-row-reverse items-center bg-[#555759] rounded-md">
        <InfoIdComponent />
      </div>

      <div className="flex max-h-screen flex-row-reverse items-center bg-[#555759] rounded-md">
        <LabelsComponent />
      </div>
    </div>
  );
};

export { Sidebar };

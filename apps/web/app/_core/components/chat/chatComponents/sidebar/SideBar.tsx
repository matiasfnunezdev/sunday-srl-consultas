import InfoIdComponent from "./InfoIdComponent";
import LabelsComponent from "./LabelsComponent";

export function Sidebar(): JSX.Element {
  return (
    <div className="right-0 top-0 z-40 flex h-screen overflow-hidden flex-none flex-col space-y-4 bg-[#202123] p-4 text-[14px] transition-all sm:relative sm:top-0">
      {/* <div className="flex max-h-screen flex-row-reverse items-center bg-[#555759] rounded-md">
        <LastMessagesInfo />
      </div> */}

      <div className="flex h-content flex-row-reverse items-center bg-[#555759] rounded-md">
        <InfoIdComponent />
      </div>

      <div className="flex h-content flex-row-reverse items-center bg-[#555759] rounded-md">
        <LabelsComponent />
      </div>
    </div>
  );
}
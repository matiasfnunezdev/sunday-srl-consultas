/* eslint-disable unicorn/filename-case -- description */
 
/* eslint-disable @typescript-eslint/explicit-function-return-type -- description */
 
 
import { Button } from "./ButtonChat";

interface FooterComponentProps {
  onRespond: () => void
}

export function FooterComponent(props: FooterComponentProps) {

  const { onRespond } = props;

  return (
    <div className="bg-[#202123] w-full bottom-0 flex items-center justify-end space-x-4 p-2">
      <div className="flex flex-col gap-4">
        <Button backgroundColor="[#F2EC4C]"  icon={undefined} onClick={onRespond} padding="3" text="RESPONDER" />
      </div>
      {/* <div className="flex flex-col gap-4">
        <Button backgroundColor="[#F2EC4C]" icon={undefined} padding="3" text="ETIQUETAR" />
      </div>
      <div className="flex flex-col gap-4">
        <button className="px-14 rounded-md bg-[#D9D9D975] cursor-pointer select-none p-3 text-[14px] leading-normal text-white transition-colors duration-200 hover:bg-gray-200">
          DESCARTAR
        </button>
      </div> */}
    </div>
  );
}

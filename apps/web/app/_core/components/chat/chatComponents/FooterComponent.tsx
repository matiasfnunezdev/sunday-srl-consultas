import { Button } from "./ButtonChat";

export const FooterComponent = () => {
  return (
    <div className="bg-[#555759] w-3/4  h-[100px] absolute bottom-0 flex items-center overflow-hidden fixed justify-end space-x-4 p-4">
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Button backgroundColor="[#F2EC4C]" text="RESPONDER" padding="3" icon={null} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Button backgroundColor="[#F2EC4C]" text="RESPONDER Y DESCARTAR" padding="3" icon={null} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Button backgroundColor="[#F2EC4C]" text="ETIQUETAR" padding="3" icon={null} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <button className="flex px-14 mb-2 rounded-md  bg-[#D9D9D975] flex-shrink-0 cursor-pointer select-none   p-3 text-[14px] leading-normal text-white transition-colors duration-200 hover:bg-gray-200">
          <div className="flex ">
            <div className="flex flex-col">
              <span> DESCARTAR</span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

"use client";

const SidebarItem = () => {
  return (
    <div className="w-full bg-[#555759] rounded-md ">
      <div className="w-full "></div>

      <button
        type="button"
        className="flex w-full flex-shrink-0 cursor-pointer select-none items-center justify-between p-12 text-[14px] leading-normal text-white transition-colors duration-200 hover:bg-gray-500/10"
      >
        <div className="flex justify-between">
          <div className="flex flex-col text-left">
            <span>campos jeje</span>
          </div>
        </div>
      </button>
    </div>
  );
};

export { SidebarItem };

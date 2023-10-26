export default function Header() {
  return (
    <div className="z-40 flex fixed w-full items-center justify-between  py-5 text-sm text-neutral-500 shadow-custom   bg-[#202123] dark:text-neutral-200">
      <div className="flex items-center">
        {/* <Image src="/logo.png" height={40} width={40} alt="Logo" /> */}
        <p className="text-lg font-bold text-white ml-2">SundaySocial</p>
        <div className="flex justify-start">
          <div className="flex px-6">
            <div className="relative mr-4">
              <div className=" h-10 w-10 rounded-md flex items-center justify-center text-white text-bold">
                <img className="rounded-md" src="/wpIcon.png" alt="whatsapp icon" />
              </div>
              <span className="absolute top-0 right-0 bg-red-500 rounded-full h-3 w-3"></span>{" "}
              {/* Badge rojo */}
            </div>
            <div className="relative">
              <div className=" h-10 w-10 rounded-md flex items-center justify-center text-white text-bold">
                <img className="rounded-md" src="/wpIcon.png" alt="whatsapp icon" />
              </div>
              {/* Badge amarillo */}
              <span className="absolute top-0 right-0 bg-yellow-500 rounded-full h-3 w-3"></span>{" "}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center px-4">
        <div className="relative rounded-md shadow-sm ml-10">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className="fas fa-search text-white"></i>
          </div>
          <input
            type="text"
            className="pl-10 w-[335px] pr-4 py-2 text-white rounded-md text-sm focus:outline-none bg-[#555759]"
            placeholder="Buscar..."
          />
        </div>
        <div className="relative pl-6">
          <div className=" bg-[#BFD1E1] text-lg h-10 w-10 rounded-md flex items-center justify-center text-white text-bold ">
            J
          </div>
          <span className="absolute bottom-8 left-[55px] bg-[#F2EC4C] rounded-full h-3 w-3"></span>{" "}
        </div>
      </div>
    </div>
  );
}

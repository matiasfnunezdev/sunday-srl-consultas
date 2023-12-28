"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faDownload } from "@fortawesome/free-solid-svg-icons";

export default function InfoIdComponent(): JSX.Element {
  const handleTogglePanel = (): void => {};

  return (
    <div className="w-full bg-[#555759] rounded-md ">
      <div className="w-full " />

      <button
        className="flex w-full flex-shrink-0 cursor-pointer select-none items-center justify-between p-2 text-[14px] leading-normal text-white transition-colors duration-200 hover:bg-gray-500/10"
        onClick={handleTogglePanel}
        type="button"
      >
        <div className="flex justify-between">
          <div className="flex flex-col text-left">
            <span>ID -</span>
          </div>
        </div>
        <div className="flex justify-between gap-2">
          <FontAwesomeIcon icon={faDownload} />
          <FontAwesomeIcon icon={faPencil} />
        </div>
      </button>

      <div className="flex gap-6 py-4 px-2 justify-start text-white  shadow ">
        <div className="flex flex-col ">
          <span>Servicio: WhatsApp</span>
          <span>Duracion: -</span>
          <span>Respondidos: -</span>
        </div>
        <div className="flex flex-col">
          <span>Inicio: -</span>
          <span>Mensajes: -</span>
          <span>Descartados: -</span>
        </div>
      </div>
    </div>
  );
}
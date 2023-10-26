"use client";
"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const LastMessagesInfo = () => {
  const [expandedPanel, setExpandedPanel] = useState(false);

  const handleTogglePanel = () => {
    setExpandedPanel((prevExpandedPanel) => !prevExpandedPanel);
  };

  return (
    <>
      <div className="w-full bg-[#555759] rounded-md ">
        <div className="w-full "></div>

        <button
          type="button"
          onClick={handleTogglePanel}
          className="flex w-full flex-shrink-0 cursor-pointer select-none items-center justify-between gap-3 p-2 text-[14px] leading-normal text-white transition-colors duration-200 hover:bg-gray-500/10"
        >
          <div className="flex justify-between">
            <div className="flex flex-col text-left">
              <span>Ultimos mensajes</span>
            </div>
          </div>
          {expandedPanel ? (
            <FontAwesomeIcon icon={faChevronUp} />
          ) : (
            <FontAwesomeIcon icon={faChevronDown} />
          )}
        </button>
        {expandedPanel ? (
          <div className="flex gap-6 py-2 px-2 justify-start text-white shadow">
            <div className="flex flex-col">
              <span className="font-bold pb-2">ID</span>
              <span>543534</span>
              <span>213213</span>
              <span>5671234</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold pb-2">Fecha de inicio</span>
              <span>14/10/2023</span>
              <span>13/10/2023</span>
              <span>13/10/2023</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold pb-2">Estado</span>
              <span className="text-red-600 ">
                Cerrado{" "}
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="text-white pl-4 cursor-pointer"
                />
              </span>
              <span className="text-red-600 ">
                Cerrado{" "}
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="text-white pl-4 cursor-pointer"
                />
              </span>
              <span className="text-red-600 ">
                Cerrado{" "}
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="text-white pl-4 cursor-pointer"
                />
              </span>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export { LastMessagesInfo };

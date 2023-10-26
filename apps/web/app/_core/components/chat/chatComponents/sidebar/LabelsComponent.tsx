"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faMagnifyingGlass,
  faTags,
} from "@fortawesome/free-solid-svg-icons";

const LabelsComponent = () => {
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
              <span>Etiquetas</span>
            </div>
          </div>
          {expandedPanel ? (
            <FontAwesomeIcon icon={faChevronUp} />
          ) : (
            <FontAwesomeIcon icon={faChevronDown} />
          )}
        </button>
        {expandedPanel ? (
          <div className="flex gap-6 py-2 px-2 justify-start text-white shadow ">
            <div className="flex flex-col">
              <button
                type="button"
                className="flex w-full mb-2 rounded-md px-16 text-left bg-[#F2EC4C] flex-shrink-0 cursor-pointer select-none items-start justify-start  p-2 text-[14px] leading-normal text-[#555759] transition-colors duration-200 hover:bg-yellow-300"
              >
                <div className="flex justify-start">
                  <div className="flex flex-col text-left">
                    <span className="text-left">
                      {" "}
                      <FontAwesomeIcon icon={faTags} /> Vendido
                    </span>
                  </div>
                </div>
              </button>
              <button
                type="button"
                className="flex w-full rounded-md mb-2 px-16 text-left bg-[#F2EC4C] flex-shrink-0 cursor-pointer select-none items-start justify-start  p-2 text-[14px] leading-normal text-[#555759] transition-colors duration-200 hover:bg-yellow-300"
              >
                <div className="flex justify-start">
                  <div className="flex flex-col text-left">
                    <span className="text-left">
                      {" "}
                      <FontAwesomeIcon icon={faTags} /> No responde
                    </span>
                  </div>
                </div>
              </button>
              <button
                type="button"
                className="flex w-full mb-2 rounded-md px-16 text-left bg-[#F2EC4C] flex-shrink-0 cursor-pointer select-none items-start justify-start  p-2 text-[14px] leading-normal text-[#555759] transition-colors duration-200 hover:bg-yellow-300"
              >
                <div className="flex justify-start">
                  <div className="flex flex-col text-left">
                    <span className="text-left">
                      {" "}
                      <FontAwesomeIcon icon={faTags} /> Vendido
                    </span>
                  </div>
                </div>
              </button>
              <button
                type="button"
                className="flex w-full mb-2 rounded-md px-16 text-left bg-[#F2EC4C] flex-shrink-0 cursor-pointer select-none items-start justify-start  p-2 text-[14px] leading-normal text-[#555759] transition-colors duration-200 hover:bg-yellow-300"
              >
                <div className="flex justify-start">
                  <div className="flex flex-col text-left">
                    <span className="text-left">
                      {" "}
                      <FontAwesomeIcon icon={faTags} /> No responde
                    </span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export { LabelsComponent };

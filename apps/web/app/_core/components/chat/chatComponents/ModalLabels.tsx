"use client";

import { faTags } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ModalLabels = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#000000CC",
        color: "#F2EC4C",
        padding: "30px",
        borderRadius: "10px",
        zIndex: 1000,
        // puedes ajustar
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "4rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",

          width: "100%",
          gap: "4rem",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Button backgroundColor="[#F2EC4C]" text="Vendido" />
          <Button backgroundColor="[#F2EC4C]" text="No responde" />
          <Button backgroundColor="[#F2EC4C]" text="No vendido" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Button backgroundColor="[#F2EC4C]" text="Evalúa propuesta" />
          <Button backgroundColor="[#F2EC4C]" text="Vendido" />
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Button
              backgroundColor="[#555759]"
              text="Evalúa propuesta"
              textColor="white"
              hoverColor="gray-300"
            />
          </div>
        </div>
      </div>
      <button className="flex px-14 mb-2 rounded-md  bg-[#F2EC4C] flex-shrink-0 cursor-pointer select-none   p-3 text-[14px] leading-normal text-[#555758] transition-colors duration-200 hover:bg-yellow-100">
        <div className="flex ">
          <div className="flex flex-col">
            <span> Etiquetar</span>
          </div>
        </div>
      </button>
    </div>
  );
};

const Button = ({
  text,
  backgroundColor = "[#F2EC4C]",
  textColor = "[#555759]",
  hoverColor = "yellow-100",
}) => {
  return (
    <button
      className={`flex w-full mb-2 rounded-md px-16 text-left bg-${backgroundColor} flex-shrink-0 cursor-pointer select-none   p-2 text-[14px] leading-normal text-${textColor} transition-colors duration-200 hover:bg-${hoverColor}`}
    >
      <div className=" ">
        <div className=" ">
          <span className="">
            {" "}
            <FontAwesomeIcon icon={faTags} /> {text}
          </span>
        </div>
      </div>
    </button>
  );
};

export default ModalLabels;

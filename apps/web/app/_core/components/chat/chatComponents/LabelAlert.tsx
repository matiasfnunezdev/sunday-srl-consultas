"use client";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LabelAlert(): JSX.Element {

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: "100px",
        width: "auto",
        backgroundColor: "#DBD638CC", // el "CC" al final es para la transparencia
        border: "1px solid #DBD638",
        borderRadius: "5px",
        zIndex: 1000,
        textAlign: "center",
      }}
    >
      <p style={{ color: "black", fontSize: 24 }}>
        <FontAwesomeIcon className="pr-2" icon={faCircleExclamation} />
        Debe etiquetar antes de cerrar
      </p>
    </div>
  );
};

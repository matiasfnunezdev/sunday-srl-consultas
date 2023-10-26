"use client";
import { useRef, useState } from "react";
import Header from "./chatComponents/Header";

import ChatMessages from "./chatComponents/chatMessages";

import InputChat from "./chatComponents/InputChat";
import { FooterComponent } from "./chatComponents/FooterComponent";
import { Sidebar } from "./chatComponents/sidebar/SideBar";
import LabelAlert from "./chatComponents/LabelAlert";
import ModalLabels from "./chatComponents/ModalLabels";

export default function Chat(): JSX.Element {
  const handleSend = (message: string) => {
    // Añade tu lógica para manejar el envío del mensaje aquí
  };
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messages = [
    { role: "assistant", content: "Hola, esto es un mensaje del asistente." },
    { role: "user", content: "Hola, esto es un mensaje del usuario." },

    { role: "assistant", content: "Hola, esto es un mensaje del asistente." },
    { role: "user", content: "Hola, esto es un mensaje del usuario." },
    { role: "assistant", content: "¿Cómo puedo ayudarte hoy?" },

    { role: "user", content: "Hola, esto es un mensaje del usuario." },
    { role: "assistant", content: "Hola, esto es un mensaje del asistente." },
    { role: "user", content: "Hola, esto es un mensaje del usuario." },
    { role: "assistant", content: "¿Cómo puedo ayudarte hoy?" },

    { role: "user", content: "Hola, esto es un mensaje del usuario." },
    { role: "assistant", content: "¿Cómo puedo ayudarte hoy?" },

    { role: "user", content: "Hola, esto es un mensaje del usuario." },
    { role: "assistant", content: "Hola, esto es un mensaje del asistente." },
    { role: "user", content: "Hola, esto es un mensaje del usuario." },

    { role: "assistant", content: "Hola, esto es un mensaje del asistente." },
    { role: "user", content: "Hola, esto es un mensaje del usuario." },
    { role: "assistant", content: "¿Cómo puedo ayudarte hoy?" },

    { role: "user", content: "Hola, esto es un mensaje del usuario." },
    { role: "assistant", content: "Hola, esto es un mensaje del asistente." },
    { role: "user", content: "Hola, esto es un mensaje del usuario." },
    { role: "assistant", content: "¿Cómo puedo ayudarte hoy?" },

    { role: "user", content: "Hola, esto es un mensaje del usuario." },
    { role: "assistant", content: "¿Cómo puedo ayudarte hoy?" },

    { role: "user", content: "Hola, esto es un mensaje del usuario." },

    // más mensajes aquí...
  ];
  return (
    <>
      <div>
        <Header />
        <div className="pt-20 fixed right-0 h-full">
          <Sidebar />
        </div>
      </div>
      <div className="fixed bottom-0 w-full pl-4">
        <div className="w-3/4 bg-[#343541] h-full overflow-y-auto fixed bottom-16 ">
          {messages.map((message, index) => (
            <ChatMessages key={index} message={message} />
          ))}
          <div ref={messagesEndRef}></div>
        </div>
        <div className="w-3/4 bg-[#343541] h-16 fixed bottom-0">
          <InputChat placeholder="Type your message" onSend={handleSend} />
        </div>
      </div>
      <div className="pl-4">
        <FooterComponent />
      </div>
      {/* <LabelAlert /> */}
      <ModalLabels />
    </>
  );
}

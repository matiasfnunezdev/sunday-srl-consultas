import React, { FC, memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

interface Props {
  message: {
    role: "assistant" | "user";
    content: string;
  };
}

const ChatMessages: FC<Props> = memo(({ message }) => {
  return (
    <div
      className={
        message.role === "assistant"
          ? "group px-10 border-b  bg-[#444654] text-gray-100 justify-start flex ml-auto"
          : "group px-10 border-b bg-[#343541] text-gray-100 justify-end flex mr-auto"
      }
    >
      <div className="relative flex gap-4 p-4 text-base md:max-w-2xl md:gap-6 md:py-6 lg:max-w-2xl lg:px-0 xl:max-w-3xl">
        <div className="min-w-[40px] text-right font-bold">
          {message.role === "assistant" ? (
            <FontAwesomeIcon icon={faRobot} size={"lg"} />
          ) : (
            <FontAwesomeIcon icon={faWhatsapp} size={"lg"} />
          )}
        </div>
        <div className="prose mt-[-2px] w-full prose-invert">
          <div className="prose whitespace-pre-wrap prose-invert">{message.content}</div>
        </div>
      </div>
    </div>
  );
});

export default ChatMessages;

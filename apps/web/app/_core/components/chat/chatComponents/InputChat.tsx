/* eslint-disable unicorn/filename-case */
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, KeyboardEvent, ChangeEvent, useState } from "react";

export interface TextAreaInputProps {
  placeholder?: string;
  onSend?: (message: string) => void;
}

const ImputChat: React.FC<TextAreaInputProps> = ({ placeholder, value, onChange, onSend }) => {
  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSend = () => {
    if (onSend && content) {
      onSend(content);
      setContent("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="absolute  left-0  border-transparent  from-transparent via-white to-white pt-6 border-white/20 via-[#343541] to-[#343541] md:pt-2">
      <div className="relative flex w-full flex-grow flex-row items-center rounded-md border border-black/10 bg-white px-2 shadow-[0_0_10px_rgba(0,0,0,0.10)] border-gray-900/50 bg-[#40414F] text-white dark:shadow-[0_0_15px_rgba(0,0,0,0.10)] sm:mx-[10px]">
        <textarea
          ref={textareaRef}
          className="m-0 w-full resize-none border-0 bg-transparent p-0 py-2 pl-10 pr-8 text-white focus:outline-none dark:bg-transparent text-white md:py-3 md:pl-10"
          style={{ resize: "none", maxHeight: "400px", overflow: "auto" }}
          placeholder={placeholder || ""}
          value={content || ""}
          rows={1}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />

        <button
          className="right-2 top-2 flex items-center rounded-sm p-1 text-neutral-800 opacity-80 hover:text-neutral-900 hover:opacity-60 bg-opacity-60 text-neutral-100 hover:text-neutral-200"
          onClick={handleSend}
        >
          <FontAwesomeIcon icon={faCircleArrowRight} className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ImputChat;

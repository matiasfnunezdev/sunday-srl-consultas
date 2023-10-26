import { faTags } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Button = ({
  text,
  icon = faTags,
  backgroundColor = "[#F2EC4C]",
  textColor = "[#555759]",
  hoverColor = "yellow-100",
  padding = "2",
}) => {
  return (
    <button
      className={`flex w-full mb-2 rounded-md px-16 text-left bg-${backgroundColor} flex-shrink-0 cursor-pointer select-none   p-${padding} text-[14px] leading-normal text-${textColor} transition-colors duration-200 hover:bg-${hoverColor}`}
    >
      <span className="flex items-center gap-2">
        {icon && <FontAwesomeIcon icon={icon} />} {text}
      </span>
    </button>
  );
};

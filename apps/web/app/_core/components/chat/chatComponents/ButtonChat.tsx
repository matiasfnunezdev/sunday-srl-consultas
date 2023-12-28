import { faTags } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Button({
  text,
  icon = faTags,
  backgroundColor = "[#F2EC4C]",
  textColor = "[#555759]",
  hoverColor = "yellow-100",
  padding = "2",
  onClick = () => {},
}): JSX.Element {
  return (
    <button
    className={`flex w-content rounded-md px-16 text-left bg-${backgroundColor} flex-shrink-0 cursor-pointer select-none p-${padding} text-[14px] leading-normal text-${textColor} transition-colors duration-200 hover:bg-${hoverColor}`} 
    onClick={onClick}
      type="button"
    >
      <span className="flex items-center gap-2">
        {icon ? <FontAwesomeIcon icon={icon} /> : null} {text}
      </span>
    </button>
  );
}

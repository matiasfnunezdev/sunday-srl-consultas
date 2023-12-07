import React from 'react';

interface InputProps {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  inputClassName?: string;
}

function Input({
  label,
  id,
  type = 'text',
  value,
  onChange,
  className = '',
  inputClassName = '',
}): React.ReactElement<InputProps> {
  return (
    <div className={className}>
      <label
        className="text-black font-lato text-lg 2xl:text-xl font-medium leading-[normal]"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        autoComplete='current-password'
        className={`w-full px-4 py-2 my-2 focus:outline-none focus:ring-2 focus:ring-[#368d9d] h-[2.75rem] 2xl:h-[3.75rem] rounded-[0.3125rem] border border-[#d9d9d9] bg-white text-black ${inputClassName}`}
        id={id}
        onChange={onChange}
        type={type}
        value={value}
      />
    </div>
  );
};

export default Input;
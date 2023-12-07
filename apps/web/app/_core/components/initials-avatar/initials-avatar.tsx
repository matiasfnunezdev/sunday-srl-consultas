import React from 'react';

interface InitialsAvatarProps {
  initials: string;
}

export default function InitialsAvatar(props: InitialsAvatarProps): JSX.Element {
  const { initials } = props;
  const sizeClass = `h-[45px] w-[45px]`;
  const baseClasses = `flex items-center justify-center rounded-full bg-[#368D9D] text-white`;

  return (
    <div className={`${baseClasses} ${sizeClass}`}>
      {initials.toUpperCase()}
    </div>
  );
};
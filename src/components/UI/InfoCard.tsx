import React from 'react';
import { InfoIcon } from "../Icons";

type Props = {
  children?: any;
  className?: string;
  label?: string;
}

const InfoCard = ({ children, className = '', label = 'Info' }: Props) => {
  return (
    <div className={`rc-px-5 rc-py-4 rc-rounded rc-bg-white rc-border rc-border-gray-200 rc-relative ${className}`}>
      <div className="rc-flex rc-gap-x-3">
        <div className="rc-flex-shrink-0">
          <InfoIcon className="rc-w-[18px] rc-h-[18px] rc-text-gray-700"/>
        </div>
        <div>
          <span className={`rc-text-gray-700 rc-text-caption-2 rc-block ${children ? 'rc-mb-2' : ''}`}>
            {label}
          </span>
          <div className="rc-text-black rc-text-body-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;

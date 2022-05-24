import React from 'react';

type Props = {
  name: string,
  checked: boolean,
  onChange: () => void,
  label?: string,
  disabled?: boolean,
  className?: string,
}

const CheckboxInput = (props: Props) => {
  const { name, checked, onChange, label, disabled, className = '' } = props;
  return (
    <div className={className}>
      <div className={`rc-flex`}>
        <input
          id={name}
          name={name}
          type="checkbox"
          className="rc-mt-1 rc-h-[18px] rc-w-[18px] rc-rounded-[6px] rc-text-primary rc-border rc-border-gray-700 focus:rc-ring-0 focus:rc-border-primary disabled:rc-opacity-50 disabled:rc-cursor-not-allowed"
          disabled={disabled}
          checked={checked}
          onChange={onChange}
        />
        {label && (
          <label
            htmlFor={name}
            className={`rc-ml-2.5 rc-block rc-text-body-2 ${disabled ? 'rc-text-gray-500 rc-cursor-not-allowed' : 'rc-text-gray-700'}`}
          >
            {label}
          </label>
        )}
      </div>
    </div>
  );
};

export default CheckboxInput;
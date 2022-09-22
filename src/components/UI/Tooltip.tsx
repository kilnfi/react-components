import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

type Props = {
  children: any,
  className?: string,
};

const Trigger = ({ children }: Props) => (
  <TooltipPrimitive.TooltipTrigger asChild>
    {children}
  </TooltipPrimitive.TooltipTrigger>
);

const Content = ({ children, className = '' }: Props) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content sideOffset={5}
                              className={`rc-animate-fade-in rc-rounded-md rc-p-4 rc-text-sm rc-bg-white rc-font-sans rc-shadow ${className}`}
    >
      {children}
      <TooltipPrimitive.Arrow className="rc-fill-white"/>
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
);

const Tooltip = ({ children }: Props) => {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root delayDuration={0}>
        {children}
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};

Tooltip.Trigger = Trigger;
Tooltip.Content = Content;

export default Tooltip;
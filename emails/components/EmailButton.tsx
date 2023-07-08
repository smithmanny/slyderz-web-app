import {
  Button,
} from '@react-email/components';
import * as React from 'react';

interface EmailButtonProps {
  pX?: number
  pY?: number
  link: string;
  className?: string
  children: React.ReactNode
  style?: any
}

export const EmailButton = ({
  link = "http://localhost:3000",
  children,
  ...props
}: EmailButtonProps) => {
  return (
    <Button
      pX={20}
      pY={12}
      className="bg-[#F6644A] rounded text-white text-[12px] font-semibold no-underline text-center"
      href={link}
      {...props}
    >
      {children}
    </Button>
  );
};

export default EmailButton;
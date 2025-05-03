import React, {
  ButtonHTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from 'react';
import cn from 'classnames';
import styles from './Button.module.scss';

export type ButtonSize = 'lg' | 'md' | 'sm';
export type ButtonVariant = 'grayscale1' | 'purple';

export interface ButtonProps
  extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  rounded?: boolean;
  fullWidth?: boolean;
}

export default function Button({
  children,
  size = 'md',
  variant = 'grayscale1',
  disabled = false,
  fullWidth,
  className,
  ...props
}: ButtonProps) {
  const classNames = cn(
    styles.button,
    className,
    styles[`button--size-${size}`],
    styles[`button--variant-${variant}`],
    {
      [styles['button--disabled']]: disabled,
      [styles['button--fullWidth']]: fullWidth,
    },
  );

  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  );
}

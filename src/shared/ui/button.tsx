import * as React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
};
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, onClick, className, disabled, type, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={classNames(
          "rounded-2xl border border-black bg-gradient-to-b from-white to-[#90dc4c] px-2 py-1 font-semibold",
          className
        )}
        onClick={onClick}
        disabled={disabled}
        type={type}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export default Button;

function classNames(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

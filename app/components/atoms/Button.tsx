type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button {...props} className={`btn ${props.className ?? ""}`.trim()}>
      {children}
    </button>
  );
}
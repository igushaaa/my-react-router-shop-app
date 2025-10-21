type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: InputProps) {
  return (
    <input {...props} className={`input-basic ${props.className ?? ""}`.trim()} />
  );
}
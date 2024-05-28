import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface InputProps<T extends FieldValues> {
  label: string;
  type: string;
  name: Path<T>;
  id: string;
  placeholder: string;
  className: string;
  register: UseFormRegister<T>;
  options?: object;
  error?: string;
}

const Input = <T extends FieldValues>({
  label,
  type,
  name,
  id,
  placeholder,
  className,
  register,
  options,
  error,
}: InputProps<T>) => {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        {...register(name, options)}
        type={type}
        id={id}
        placeholder={placeholder}
        className={className}
      />
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
};

export default Input;

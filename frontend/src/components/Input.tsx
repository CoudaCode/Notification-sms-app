import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface InputProps<T extends FieldValues> {
  label: string;
  type: string;
  name: Path<T>;
  id: string;
  placeholder: string;
  className: string;
  register: UseFormRegister<T>;
  options?: object; // Optionnel : pour passer des options supplémentaires à register
  error?: string; // Ajoutez une prop error de type string optionnelle
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
        {...register(name, options)} // Passez les options supplémentaires à register
        type={type}
        id={id}
        placeholder={placeholder}
        className={className}
      />
      {error && <p className="mt-2 text-red-500">{error}</p>}{" "}
      {/* Affichez le message d'erreur */}
    </div>
  );
};

export default Input;

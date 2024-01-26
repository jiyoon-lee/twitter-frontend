import { FieldError, FieldErrors, useFormContext } from "react-hook-form";
import { LoginFormInput } from "./Login";
import ErrorMessage from "./ErrorMessage";

interface PropsType {
  readonly type: keyof LoginFormInput;
  readonly label: string;
  readonly errorMsg: string;
}

export default function Input({ type, label, errorMsg }: PropsType) {
  const {
    register,
    formState: { errors },
  } = useFormContext<LoginFormInput>();
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={type}
      >
        {label}
      </label>
      <input
        {...register(type, { required: errorMsg })}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        aria-invalid={errors[type] ? "true" : "false"}
        id={type}
        type="text"
      />
      {errors && <ErrorMessage message={errors[type]?.message} />}
    </div>
  );
}

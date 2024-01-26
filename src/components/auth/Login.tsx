import { useForm, FormProvider } from "react-hook-form";
import Input from "./Input";

export type LoginFormInput = {
  username: string;
  password: string;
  name: string;
  email: string;
  url: string;
};

export default function Login() {
  const methods = useForm<LoginFormInput>();

  return (
    <FormProvider {...methods}>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8"
        onSubmit={methods.handleSubmit(() => console.log("몰라"))}
      >
        <Input type="username" label="UserName" errorMsg="필수 입력값입니다." />
        <Input type="password" label="Password" errorMsg="필수 입력값입니다." />
        <Input type="name" label="Name" errorMsg="필수 입력값입니다." />
        <Input type="email" label="Email" errorMsg="필수 입력값입니다." />
        <Input type="url" label="Url" errorMsg="필수 입력값입니다." />
        <input type="submit" />
      </form>
    </FormProvider>
  );
}

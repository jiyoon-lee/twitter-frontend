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
  const { isDirty } = methods.formState;
  console.log(isDirty);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(() => console.log("몰라"))}>
        <Input type="username" label="UserName" errorMsg="필수 입력값입니다." />
        <Input type="username" label="UserName" errorMsg="필수 입력값입니다." />
        <Input type="username" label="UserName" errorMsg="필수 입력값입니다." />
        <input type="submit" />
      </form>
    </FormProvider>
  );
}

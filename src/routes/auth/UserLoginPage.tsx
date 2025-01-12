import styled from "@emotion/styled";
import { useForm, SubmitHandler } from "react-hook-form";

const LoginWrapper = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;
  max-width: 300px;
  margin: 0 auto;
  gap: 10px; /* 입력 필드 간 간격 */
`;

const Input = styled.input`
  padding: 10px;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const SubmitButton = styled.button`
  padding: 10px;
  width: 70px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

type Inputs = {
  email: string;
  password: string;
};

function UserLoginPage() {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data); // 폼 제출 시 데이터 출력
  };

  return (
    <LoginWrapper onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="email"
        placeholder="Email"
        {...register("email", { required: "Email is required" })}
      />
      <Input
        type="password"
        placeholder="Password"
        {...register("password", { required: "Password is required" })}
      />
      <SubmitButton type="submit">Login</SubmitButton>
    </LoginWrapper>
  );
}

export default UserLoginPage;

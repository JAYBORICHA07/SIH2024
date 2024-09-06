import { Button, Form, Input, message } from "antd";
import {
  LoginStateEnum,
  useLoginStateContext,
} from "./providers/LoginStateProvider";
import { useForm } from "antd/es/form/Form";
import { useRouter } from "@/router/hooks";

interface LoginFormType {
  email: string;
  userName: string;
  password: string;
  role: string;
}

// biome-ignore lint/style/noDefaultExport: <explanation>
export default function LoginForm() {
  const { loginState } = useLoginStateContext();
  const [form] = useForm<LoginFormType>();
  const router = useRouter();

  if (loginState !== LoginStateEnum.LOGIN) {
    return null;
  }
  if (loginState !== LoginStateEnum.LOGIN) {
    return null;
  }
  const onFinish = async (values: LoginFormType) => {
    console.info(values);
    await fetch(import.meta.env.VITE_BE_URL + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.info(data);
        router.replace("/auth/success");
      })
      .catch((err) => message.error(err.message));
    message.success("Successfully Login");
  };

  return (
    <>
      <div className="flex justify-center items-center  ">
        <Form
          form={form}
          className="flex flex-col justify-center items-center gap-4 w-full"
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="userName"
            label="UserName"
            rules={[
              {
                required: true,
                message: "Please input your userName!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[
              {
                required: true,
                message: "Please input your role!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form>
      </div>
    </>
  );
}

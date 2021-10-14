import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../actions/userActions";

import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function LoginForm({ history }) {
  const { loading, isAuthanticated, error, user } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const onFinish = (values) => {
    console.log(values);
    dispatch(login(values.login, values.password));
  };

  useEffect(() => {
    if (isAuthanticated) {
      history.push("/");
    }
    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }
  }, [history, isAuthanticated, dispatch, error]);

  return (
    <div className="container">
      <Form
        name="normal_login"
        className="login-form form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="login"
          rules={[
            {
              required: true,
              message: "Iltimos Loginni kiriting!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Login"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Parolingizni kiriting!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        {/* <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item> */}

        <Form.Item>
          {!loading ? (
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          ) : (
            <Button type="primary" loading>
              Loading
            </Button>
          )}
          Or <Link to="/signup">register now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
}

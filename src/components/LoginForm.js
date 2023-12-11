"use client";

import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Link from "next/link";
import { api } from "@/services/api";
import variable from "@/styles/variables.module.scss";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "@/redux/slice/userSlice";
import Swal from "sweetalert2";
import { useRouter, useSearchParams } from "next/navigation";
import createJWT from "@/utils/createJWT";

const LoginForm = () => {
  const search = useSearchParams();
  const from = search.get("redirectUrl" || "/");
  const { replace } = useRouter();
  const { login, getUserInfo } = api;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogin = async (values) => {
    const email = values.email;
    setLoading(true);
    try {
      const response = await login(values);
      createJWT({ email });
      if (response.data) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        dispatch(setToken(token));

        if (token) {
          const user = await getUserInfo();
          if (user.data.user) {
            console.log(user);
            dispatch(setUser(user));
            Swal.fire({
              position: "center center",
              icon: "success",
              title: "Congratulation!!",
              text: "Now Login successful",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          replace(from);
        }
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
    setLoading(false);
  };
  return (
    <div className={variable.FormStyle}>
      <div className={variable.titleSection}>
        <h2 style={{color:"black"}} className={variable.title}>Welcome Back</h2>
        <p style={{color:"black"}} className={variable.subTitle}>Please login</p>
      </div>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={handleLogin}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email",
            },
          ]}
        >
          <Input
            type="email"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <p className={variable.redirectText}>
            Forgot your{" "}
            <span className="redirectLink">
              <Link style={{color:"black"}} href="/forgotpass">Password</Link>
            </span>
          </p>
        </Form.Item>
        <div>
          <Form.Item>
            <Button disabled={loading} htmlType="submit">
              {loading ? "Login..." : "Log In"}
            </Button>
          </Form.Item>
          <Form.Item>
            <p className={variable.redirectText}>
              Don.t Have an Account{" "}
              <span className="redirectLink">
                <Link style={{color:"black"}} href="/register">register now!</Link>
              </span>
            </p>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;

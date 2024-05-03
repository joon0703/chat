import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { Breadcrumb } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@config/firebaseConfig";
import { useAtom } from "jotai";
import authAtom from "@stores/authAtom";
import { useRouter } from "next/router";

interface loginProps {}

function login({}: loginProps) {
  const router = useRouter();
  const [, setUserAtom] = useAtom(authAtom);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputs;
  const onChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const SignInButton = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (userCredential && userCredential.user) {
          const user = userCredential.user;
          const uid = user.uid;
          setUserAtom({
            email: userCredential.user.email as string,
            nickName: userCredential.user.displayName as string,
            uid: userCredential.user.uid as string,
          });
        }
        router.push("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        console.error(errorCode);
      });
    setInputs({
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Login</Breadcrumb.Item>
      </Breadcrumb>
      <div className="grid grid-col-1 text-2xl w-full text-center">
        <img className="ml-auto mr-auto" src="/images/logo.png" />
        <span>⚡ Login ⚡</span>
      </div>
      <form action="" onSubmit={SignInButton}>
        <div className="flex flex-col justify-center mx-auto w-80 border-4 rounded-2xl">
          <input
            type="email"
            name="email"
            placeholder="이메일 주소"
            required
            className="rounded-2xl p-2 m-1"
            value={email}
            onChange={onChange}
          />
          <input
            name="password"
            type="password"
            placeholder="비밀번호"
            required
            className="rounded-2xl p-2 m-1"
            value={password}
            onChange={onChange}
          />
          <input
            type="submit"
            className="btn-blue m-1 rounded-2xl"
            value="Login"
          />
          <Link href="/signup">
            <input
              type="button"
              className="btn-blue m-1 rounded-2xl"
              value="SignUp"
            />
          </Link>
        </div>
      </form>
    </div>
  );
}

export default login;

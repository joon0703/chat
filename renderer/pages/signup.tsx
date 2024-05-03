import Head from "next/head";
import React, { useState } from "react";
import { Breadcrumb } from "antd";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@config/firebaseConfig";
import { useAtom } from "jotai";
import authAtom from "@stores/authAtom";
import { useRouter } from "next/router";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

interface SignUpProps {}

function SignUp({}: SignUpProps) {
  const router = useRouter();
  const [, setUserAtom] = useAtom(authAtom);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    nickName: "",
  });
  const { email, password, nickName } = inputs;
  const onChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    if (name === "nickName") {
      setInputs({
        ...inputs,
        [name]: value.slice(0, 20),
      });
    } else {
      setInputs({
        ...inputs,
        [name]: value,
      });
    }
  };

  const Register = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const uid = user.uid;
        const data = {
          uid,
          email,
          nickName,
        };
        setUserAtom(() => ({
          ...data,
        }));

        const addData = (async () => {
          try {
            const res = await setDoc(doc(db, "users", uid), {
              email,
              displayName: nickName,
              lastLogin: serverTimestamp(),
            });
          } catch (e) {
            console.error(e);
          }
        })();

        updateProfile(user, {
          displayName: nickName,
        }).then(() => {
          router.push("/home");
        });
      })
      .catch((error) => {
        const errorCode = error.code;
      });
    setInputs({
      email: "",
      password: "",
      nickName: "",
    });
  };

  return (
    <div>
      <Head>
        <title>SignUp</title>
      </Head>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>SignUp</Breadcrumb.Item>
      </Breadcrumb>
      <div className="grid grid-col-1 text-2xl w-full text-center">
        <img className="ml-auto mr-auto" src="/images/logo.png" />
        <span>⚡ SignUp ⚡</span>
      </div>
      <form action="" onSubmit={Register}>
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
            type="nickName"
            name="nickName"
            placeholder="닉네임"
            required
            className="rounded-2xl p-2 m-1"
            value={nickName}
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
            value="SignUp"
          />
        </div>
      </form>
    </div>
  );
}

export default SignUp;

import { db } from "@config/firebaseConfig";
import authAtom from "@stores/authAtom";
import { Breadcrumb, Layout } from "antd";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { useAtom } from "jotai";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";

interface UIDProps {}
interface ChatProps {
  nanoseconds: number;
  createdAt: Date;
  // createdAt: { seconds: number; nanoseconds: number };
  id: string;
  message: string;
  user: string;
}
function UID({}: UIDProps) {
  const { Content } = Layout;
  const [userAtom, setUserAtom] = useAtom(authAtom);
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const router = useRouter();
  const PchatId = router.query.uid;
  const scrollRef = useRef<HTMLUListElement>();

  const sendMessage = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (userInput === "") return;
    const messageRef = collection(db, "Pchats", `${PchatId}`, "message");
    await addDoc(messageRef, {
      createdAt: serverTimestamp(),
      message: userInput,
      user: userAtom.nickName,
    });
    setUserInput("");
  };
  const removeMessage = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (confirm("나가시겠습니까?")) {
      await deleteDoc(doc(db, "Pchats", `${PchatId}`));
      router.push("/home");
    }
  };
  const scrollToBottom = () => {
    if (scrollRef && scrollRef.current) {
      const scrollBottom =
        scrollRef.current?.scrollHeight - scrollRef.current?.clientHeight;
      const currentScroll = scrollRef.current?.scrollTop;
      const isBottom = scrollBottom - currentScroll;
      if (isBottom === 63) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }
  };
  useEffect(() => {
    if (!userAtom.uid) {
      router.push("/login");
    }
    const messageRef = collection(db, "Pchats", `${PchatId}`, "message");
    const q = query(messageRef, orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc?.id,

          createdAt: dayjs(doc.data().createdAt?.toDate()).format(
            "MM월DD일 HH:mm"
          ),
        })) as []
      );
      scrollToBottom();
    });
    return () => {
      unsubscribe();
    };
  }, [router.query]);

  return (
    <>
      <Head>
        <title>Home - User</title>
      </Head>
      <Layout className="site-layout" style={{}}>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>User</Breadcrumb.Item>
          </Breadcrumb>
          <ul
            className="overflow-auto"
            style={{ height: `calc(100vh - 100px)` }}
            ref={() => scrollRef}
          >
            {messages?.map((message: ChatProps, index) => {
              return (
                <li key={index}>
                  {userAtom.nickName !== message.user ? (
                    <>
                      <div className="flex items-center">
                        <div className="font-bold">{message.user}</div>
                        <small className="ml-1 ">{message.createdAt}</small>
                      </div>
                      <div className="">{message.message}</div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-end">
                        <small className="mr-1 ">{message.createdAt}</small>
                        <div className="font-bold">{message.user}</div>
                      </div>
                      <div className="text-right">{message.message}</div>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </Content>

        <form action="" onSubmit={sendMessage}>
          <div className="flex ">
            <input
              className="w-full h-7 rounded-2xl p-2 m-1"
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <input
              className="h-7 m-1 btn-blue leading-none"
              type="submit"
              value="입력"
            />
            <input type="button" value="나가기" onClick={removeMessage} />
          </div>
        </form>
      </Layout>
    </>
  );
}

export default UID;

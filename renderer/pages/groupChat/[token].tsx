import authAtom from "@stores/authAtom";
import { Breadcrumb, Layout } from "antd";
import { useAtom } from "jotai";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@config/firebaseConfig";

interface TokenProps {}
interface ChatProps {
  createdAt: Timestamp;
  id: string;
  message: string;
  user: string;
  system?: string;
}
function Token({}: TokenProps) {
  const { Content } = Layout;
  const [userAtom, setUserAtom] = useAtom(authAtom);
  const [userInput, setUserInput] = useState("");
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [onUser, setOnUser] = useState<DocumentData | undefined>({});
  const [userName, setUserName] = useState([]);
  const [userUid, setUserUid] = useState([]);
  const router = useRouter();
  const GchatId = router.query.token;
  const scrollRef = useRef<HTMLUListElement>(null);

  const sendMessage = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (userInput === "") return;
    const messageRef = collection(db, "Gchats", `${GchatId}`, "message");
    await addDoc(messageRef, {
      createdAt: serverTimestamp(),
      message: userInput,
      user: userAtom.nickName,
    });
    setUserInput("");
  };

  const scrollToBottom = () => {
    if (scrollRef && scrollRef.current) {
      const scrollBottom =
        scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
      const currentScroll = scrollRef.current.scrollTop;
      const isBottom = scrollBottom - currentScroll;
      if (isBottom < 80) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }
  };

  useEffect(() => {
    //유저리스트 전용
    if (!userAtom.uid) {
      router.push("/login");
    }
    const userRef = doc(db, "Gchats", `${GchatId}`);
    const querySnapshot = onSnapshot(userRef, (doc) => {
      setOnUser(doc.data());
    });
  }, []);

  useEffect(() => {
    //유저출입 전용
    const fetchUserData = (async () => {
      const groupRef = doc(db, "Gchats", `${GchatId}`);
      const querySnapshot = await getDoc(groupRef);
      setUserName(
        querySnapshot
          .data()
          ?.name.filter((elem: string) => elem !== userAtom.nickName)
      );
      setUserUid(
        querySnapshot
          .data()
          ?.users.filter((elem: string) => elem !== userAtom.uid)
      );
    })();
  }, [onUser]);

  const leaveMessage = async () => {
    if (confirm("나가시겠습니까?")) {
      if (userName.length >= 1) {
        const enterRef = doc(db, "Gchats", `${GchatId}`);
        updateDoc(enterRef, {
          name: userName,
          users: userUid,
        });
        const messageRef = collection(db, "Gchats", `${GchatId}`, "message");
        addDoc(messageRef, {
          createdAt: serverTimestamp(),
          system: `${userAtom.nickName}님이 퇴장하셨습니다.`,
        });
      } else {
        await deleteDoc(doc(db, "Gchats", `${GchatId}`));
      }
      router.push("/home");
    }
  };

  useEffect(() => {
    const messageRef = collection(db, "Gchats", `${GchatId}`, "message");
    const q = query(messageRef, orderBy("createdAt"));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot: QuerySnapshot<DocumentData>) => {
        const data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          createdAt: dayjs(doc.data().createdAt?.toDate()).format(
            "MM월DD일 HH:mm"
          ),
        }));
        setMessages(data as []);
        scrollToBottom();
      }
    );
    return () => {
      unsubscribe();
    };
  }, [router.query]);
  return (
    <>
      <Head>
        <title>Home - Group</title>
      </Head>
      <Layout className="site-layout" style={{}}>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>
              <div
                className="cursor-pointer hover:visible"
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
              >
                Group
              </div>
              {open && (
                <div className="absolute bg-yellow-100 opacity-80 p-2 rounded-md">
                  {onUser?.name?.map((user: string, index: number) => {
                    return <div key={index}>{user}</div>;
                  })}
                </div>
              )}
            </Breadcrumb.Item>
          </Breadcrumb>
          <ul
            className="overflow-auto"
            style={{ height: `calc(100vh - 100px)` }}
            ref={scrollRef}
          >
            {messages?.map((message: ChatProps, index: number) => {
              return (
                <li key={index}>
                  {userAtom.nickName !== message.user ? (
                    <>
                      <div className="flex items-center">
                        <div className="font-bold">{message.user}</div>
                        {!message.system && (
                          <small className="ml-1 ">
                            <small className="ml-1 ">{message.createdAt}</small>
                          </small>
                        )}
                      </div>
                      <div className="">{message.message}</div>

                      {message.system && (
                        <div className="text-center text-blue-800 font-bold">
                          {message.system}
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-end">
                        {!message.system && (
                          <small className="ml-1 ">{message.createdAt}</small>
                        )}
                        <div className="font-bold ml-1">{message.user}</div>
                      </div>
                      <div className="text-right">{message.message}</div>
                      {message.system && (
                        <div className="text-center text-blue-800 font-bold">
                          {message.system}
                        </div>
                      )}
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
            <input type="button" value="나가기" onClick={leaveMessage} />
          </div>
        </form>
      </Layout>
    </>
  );
}

export default Token;

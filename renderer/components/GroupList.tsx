import React, { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "@config/firebaseConfig";
import { useAtom } from "jotai";
import authAtom from "@stores/authAtom";
import { useRouter } from "next/router";

interface GroupListProps {}
interface GroupProps {
  id: string;
  name: [];
  title?: string;
  users: [];
}
interface GroupItemProps {
  [key: string]: {
    id: string;
    name: string[];
    title: string;
    users: string[];
  };
}

function GroupList({}: GroupListProps) {
  const router = useRouter();
  const [userAtom, setUserAtom] = useAtom(authAtom);
  const [group, setGroup] = useState([{}]);
  const [openCreate, setOpenCreate] = useState(false);
  const [title, setTitle] = useState("");
  useEffect(() => {
    const fetchUserData = (async () => {
      const groupRef = collection(db, "Gchats");
      const querySnapshot = await getDocs(groupRef);
      setGroup(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    })();
  }, [openCreate]);

  const createGroup = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!title) return;
    if (auth?.currentUser?.uid === undefined) return;
    const chatRef = collection(db, "Gchats");
    addDoc(chatRef, {
      title,
      users: [auth.currentUser.uid],
      name: [auth.currentUser.displayName],
    });
    setOpenCreate(false);
  };

  const enterGroup = (group: GroupProps) => {
    if (auth?.currentUser?.uid === undefined) return;

    const alreadyExist = !!!group.users.find((doc) => doc === userAtom.uid);
    if (alreadyExist) {
      const enterRef = doc(db, "Gchats", `${group?.id}`);
      updateDoc(enterRef, {
        name: [...group.name, userAtom.nickName],
        users: [...group.users, userAtom.uid],
      });
      const messageRef = collection(db, "Gchats", `${group?.id}`, "message");
      addDoc(messageRef, {
        createdAt: serverTimestamp(),
        system: `${userAtom.nickName}님이 참가하셨습니다.`,
      });
    } else {
      router.push(`/groupChat/${group.id}`);
    }
  };
  return (
    <>
      <input
        type="button"
        className="btn-blue w-5/6 m-1 rounded-2xl cursor-pointer"
        value="Create Group"
        onClick={() => setOpenCreate(!openCreate)}
      />
      {openCreate && (
        <form action="" onSubmit={createGroup}>
          <input
            type="text"
            placeholder="제목을 입력 하세요"
            className="w-5/6 m-1 p-2 rounded-2xl bg-red-200"
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <input
            type="submit"
            value="Create"
            className="btn-blue w-5/6 m-1 rounded-2xl cursor-pointer"
          />
        </form>
      )}

      {group.map((groupItem: GroupItemProps, index) => {
        return (
          <div
            key={index}
            className="p-1 cursor-pointer hover:text-blue-700"
            onClick={() => enterGroup(groupItem as any)}
          >{`${groupItem.title}`}</div>
        );
      })}
    </>
  );
}

export default GroupList;

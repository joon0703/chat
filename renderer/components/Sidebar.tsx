import React, { useEffect, useState } from "react";
import { Layout, Menu, MenuProps } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import authAtom from "@stores/authAtom";
import { useAtom } from "jotai";
import { signOut } from "firebase/auth";
import { auth, db } from "@config/firebaseConfig";
import { useRouter } from "next/router";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { ItemType } from "antd/lib/menu/hooks/useItems";

interface SidebarProps {
  children: React.ReactNode;
}
interface GroupProps {
  id: string;
  name: [];
  title: string;
  users: [];
}
interface GroupItemProps {
  [key: string]: {
    id: string;
    name: [];
    title: string;
    users: [];
  };
}
interface FetchUserProps {
  id: string;
  name?: string[];
  users?: string[];
}

function Sidebar({ children }: SidebarProps) {
  const router = useRouter();
  const [userAtom, setUserAtom] = useAtom(authAtom);
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState("");
  const [getPersonalUser, SetGetPersonalUser] = useState([]);
  const [getGroupUser, SetGetGroupUser] = useState([]);

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };
  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  const useSignOutButton = () =>
    signOut(auth)
      .then(() => {
        router.push("/login");
        setUserAtom(() => ({
          email: "",
          nickName: "",
          uid: "",
        }));
      })
      .catch((error) => {
        const errorCode = error.code;
        console.error(errorCode);
      });

  const { Header, Content, Footer, Sider } = Layout;
  type MenuItem = Required<MenuProps>["items"][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem {
    return {
      label,
      key,
      icon,
      children,
      type,
    } as MenuItem;
  }

  const initialItem: MenuItem[] = [
    getItem(
      userAtom.nickName ? (
        <div onClick={useSignOutButton}>{userAtom.nickName}</div>
      ) : (
        <Link href="/login">
          <a>Login</a>
        </Link>
      ),
      "1",
      <PieChartOutlined />
    ),
    getItem(
      <Link href="/home">
        <a>Home</a>
      </Link>,
      "2",
      <DesktopOutlined />
    ),
  ];

  const items: MenuItem[] = [
    ...initialItem,
    getItem("User", "sub1", <UserOutlined />, getPersonalUser),
    getItem("Team", "sub2", <TeamOutlined />, getGroupUser),
  ];
  //* user
  useEffect(() => {
    if (auth?.currentUser?.uid === undefined) {
      return SetGetPersonalUser([]);
    }
    const chatRef = collection(db, "Pchats");
    const q = query(
      chatRef,
      where("users", "array-contains", auth?.currentUser?.uid)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchUser = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      let userItems: ItemType[] = [];
      fetchUser.forEach((user: FetchUserProps, index) => {
        if (userAtom.nickName === undefined) return;
        if (user && user.name) {
          userItems.push(
            getItem(
              <Link href={`/chat/${user.id}`}>
                <a>{user.name[user.name[0] === userAtom.nickName ? 1 : 0]}</a>
              </Link>,

              `user-${index}`
            )
          );
        }
      });
      SetGetPersonalUser(userItems as []);
    });
    return () => {
      unsubscribe;
    };
  }, [collapsed, router.query]);
  //* group
  useEffect(() => {
    if (auth?.currentUser?.uid === undefined) {
      return SetGetGroupUser([]);
    }
    const chatRef = collection(db, "Gchats");
    const q = query(
      chatRef,
      where("users", "array-contains", auth?.currentUser?.uid)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchGroup = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      let userGroup: ItemType[] = [];
      fetchGroup.forEach((group: { id: string; title?: string }, index) => {
        if (userAtom.nickName === undefined) return;
        userGroup.push(
          getItem(
            <Link href={`/groupChat/${group.id}`}>
              <a>{group.title}</a>
            </Link>,

            `group-${index}`
          )
        );
      });

      SetGetGroupUser(userGroup as []);
    });
    return () => {
      unsubscribe;
    };
  }, [collapsed, router.query]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>

      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>{children}</Content>
        {router.pathname.length < 8 && (
          <Footer style={{ textAlign: "center" }}>
            Tera ChatApp ©2022 Created by LazyJun
          </Footer>
        )}
      </Layout>
    </Layout>
  );
}

export default Sidebar;

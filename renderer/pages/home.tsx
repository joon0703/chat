import React, { useState } from "react";
import Head from "next/head";
import { Breadcrumb, Layout, Radio, RadioChangeEvent } from "antd";
import UserList from "@components/UserList";
import GroupList from "@components/GroupList";

function Home() {
  const [value, setValue] = useState("Group");
  const { Content } = Layout;
  const optionsWithDisabled = [
    { label: "Users", value: "Users" },
    { label: "Group", value: "Group" },
  ];
  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb>
          <div className="grid grid-col-1 text-2xl w-full text-center">
            <img className="ml-auto mr-auto" src="/images/logo.png" />
            <span>⚡ Tera ChatApp ⚡</span>
          </div>
          <div className="text-center">
            <Radio.Group
              options={optionsWithDisabled}
              onChange={(e) => onChange(e)}
              value={value}
              optionType="button"
              buttonStyle="solid"
            />
            <div
              className="mx-auto w-80 border-4 rounded-2xl overflow-auto"
              style={{ height: `calc(100vh - 450px)`, minHeight: "100px" }}
            >
              {value === "Users" ? <UserList /> : <GroupList />}
            </div>
          </div>
        </Content>
      </Layout>
    </>
  );
}

export default Home;

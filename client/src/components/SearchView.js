import React from "react";
import { Input, Space } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
const { Search } = Input;

export default function SearchView() {
  const onSearch = (value) => console.log(value);
  return (
    <Space direction="vertical">
      <Search
        placeholder="input search text"
        onSearch={onSearch}
        enterButton
        color="#111"
        // loading={true}
      />
    </Space>
  );
}

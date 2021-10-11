import { useState } from "react";
import { Modal, Button } from "antd";
import React from "react";
import { Input, Space } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
const { Search } = Input;

export const ModalView = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const onSearch = (value) => {
    console.log(value);
    setModalVisible(false);
  };

  const setmodalVisible = (e) => {
    setModalVisible(e);
  };
  return (
    <>
      <Button
        type="primary"
        onClick={() => setmodalVisible(true)}
        className="navbar-search"
      >
        {props.children}
      </Button>
      <Modal
        title={props.title}
        centered
        visible={modalVisible}
        onOk={() => setmodalVisible(false)}
        onCancel={() => setmodalVisible(false)}
      >
        <Space direction="vertical">
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            enterButton
            color="#111"
            style={{ width: "100%" }}

            // loading={true}
          />
        </Space>
      </Modal>
    </>
  );
};

import React, { useEffect } from "react";
import { useState } from "react";
import { Form, Input, message, Button, Space } from "antd";
import { DatePicker, TimePicker } from "antd";
import { Checkbox, Divider } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { register, clearErrors } from "../actions/userActions";
import "antd/dist/antd.css";
import { InputNumber, Cascader, Select, Row, Col, AutoComplete } from "antd";
const { Option } = Select;
const CheckboxGroup = Checkbox.Group;
const residences = [
  {
    value: "Davlat qomitalari",
    label: "davlatQomitalari",
    children: [
      {
        value: "o'zb Res statistikasi qomitasi",
        label: "statis",
      },
    ],
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men",
          },
        ],
      },
    ],
  },
];
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const config = {
  rules: [
    {
      type: "object",
      required: true,
      message: "Please select time!",
    },
  ],
};

const data = ["toshkent", "Andijon", "Xorazm"];
const data2 = [
  { toshkent: ["yunusobod", "chilonzor"] },
  { Andijon: ["qorasuv", "dexqonobod"] },
  { Xorazm: ["nukus", "bekobod"] },
];
const plainOptions = ["Apple", "Pear", "Orange"];
const defaultCheckedList = ["Apple", "Orange"];

const RegistrationForm = ({ history }) => {
  const [organizationValue, setOrganizationValue] = useState("");
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [form] = Form.useForm();
  const onChange = (list) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
  };
  const { loading, isAuthanticated, error } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthanticated) {
      history.push("/login");
    }
    if (error) {
      return alert();
      dispatch(clearErrors());
    }
  }, [history, isAuthanticated, error, dispatch]);
  const onFinish = (values) => {
    const value = {
      ...values,
      datePicker: values["datePicker"].format("YYYY-MM-DD"),
    };
    const formData = {
      name: value.name,
      Surname: value.surname,
      Fathname: value.secondname,
      dateBirth: value.datePicker,
      Login: value.login,
      Parol: value.password,
      jshshir: value.passportNumber,
      Hudud: value.organizationLocation,
      Tuman: value.organizationLocationCity,
      Sex: value.gender,
      email: value.email,
      wkphone: value.phone,
      mlphone: value.mobilephone,
      Muassasa: "hokimyat",
      Muassasa2: "hokimyat",
      Bol: value.bolinma,
      Lavoz: value.position,
      Course: value.courses,
    };

    dispatch(register(formData));
    message.success("Submit success!");
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <div
        style={{
          width: 70,
        }}
      >
        +998
      </div>
    </Form.Item>
  );
  const onFinishFailed = () => {
    message.error("Submit failed!");
  };
  const dispatch = useDispatch();

  return (
    <div className="container">
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        layout="vertical"
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        // initialValues={{
        //   residence: ["zhejiang", "hangzhou", "xihu"],
        //   prefix: "86",
        // }}
        scrollToFirstError
      >
        <Form.Item
          name="surname"
          label="Familiyasi"
          rules={[
            {
              required: true,
              message: "Iltimos Familiyangizni Kiriting",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="name"
          label="Ismi"
          rules={[
            {
              required: true,
              message: "Iltimos Ismingizni Kiriting",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="secondname"
          label="Otasining Ismi"
          rules={[
            {
              required: true,
              message: "Iltimos Sharifingizni Kiriting",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="datePicker" label="DatePicker" {...config}>
          <DatePicker />
        </Form.Item>
        <Form.Item
          name="login"
          label="Login"
          rules={[
            {
              required: true,
              message: "Iltimos username kiriting",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Parol"
          rules={[
            {
              required: true,
              message: "Parol kiriting!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Parol Tekshiruv"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Iltimos parolni qayta kiriting",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("Parolni qayta kiritishda hatolik!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="passportNumber"
          label="JSHSHIR raqami"
          rules={[
            {
              required: true,
              message: "JSHSHIR raqamini kiriting!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="organizationLocation"
          label="Tashkilotingiz joylashgan hudud"
          rules={[
            {
              required: true,
              message: "Iltimos Tashkilotingiz joylashgan hudud!",
            },
          ]}
        >
          <Select
            placeholder="Hududingizni tanlang ..."
            onChange={(e) => setOrganizationValue(e)}
          >
            {data.map((d, index) => (
              <Option key={index} value={d}>
                {d}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="organizationLocationCity"
          label="Tashkilotingiz joylashgan tuman(shahar)"
          dependencies={["organizationLocation"]}
          rules={[
            {
              required: true,
              message: "Iltimos Tashkilotingiz joylashgan hudud!",
            },
          ]}
        >
          <Select
            placeholder="Tumaningizni tanlang ..."
            disabled={organizationValue ? false : true}
          >
            {data2.map((d) => {
              return d[`${organizationValue}`]
                ? d[`${organizationValue}`].map((item, index) => (
                    <Option key={index} value={item}>
                      {item}
                    </Option>
                  ))
                : " ";
            })}
          </Select>
        </Form.Item>
        <Form.Item
          name="gender"
          label="Jinsi"
          rules={[
            {
              required: true,
              message: "Iltimos Jinsni tanlang!",
            },
          ]}
        >
          <Select placeholder="Jinsingizni tanglang...">
            <Option value="male">Erkak</Option>
            <Option value="female">Ayol</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="email"
          label="Elektron Manzilingizni kiriting"
          rules={[
            {
              type: "email",
              message: "Iltimos to'g'ri elektron manzilni kriting!",
            },
            {
              required: true,
              message: "Iltimos elektron manzilingizni kriting!",
            },
          ]}
        >
          <Input placeholder="example@gmail.com" />
        </Form.Item>

        {/* <Form.Item
        name="residence"
        label="Habitual Residence"
        rules={[
          {
            type: "array",
            required: true,
            message: "Please select your habitual residence!",
          },
        ]}
      >
        <Cascader options={residences} />
      </Form.Item> */}

        <Form.Item
          name="phone"
          label="Ish Telefoni"
          rules={[
            {
              required: true,
              message: "Iltimos Ish telefonini kiriting!",
            },
          ]}
        >
          <Input
            placeholder="7122233344"
            addonBefore={prefixSelector}
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
        <Form.Item
          name="mobilephone"
          label="Mobil Telefoni"
          rules={[
            {
              required: true,
              message: "Iltimos mobil telefonini kiriting!",
            },
          ]}
        >
          <Input
            placeholder="112223344"
            addonBefore={prefixSelector}
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
        <Form.Item
          name="residence"
          label="Habitual Residence"
          rules={[
            {
              type: "array",
              required: true,
              message: "Please select your habitual residence!",
            },
          ]}
        >
          <Cascader options={residences} />
        </Form.Item>
        <Form.Item
          name="bolinma"
          label="Bo'linma"
          rules={[
            {
              required: true,
              message: "Iltimos Bo'linmangizni Kiriting",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="position"
          label="Lavozimlar"
          rules={[
            {
              required: true,
              message: "Iltimos Lavozimingizni Kiriting",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="courses"
          label="Kurslaringiz"
          valuePropName="checked"
          style={{ display: "flex", flexDirection: "column" }}
          rules={[
            {
              type: "array",
            },
          ]}
        >
          {/* <Checkbox
            style={{
              width: "100%",
            }}
          >
            Davlat xaridlarini tashkil etish va amalga oshirish tartibi
          </Checkbox>
          <Checkbox
            style={{
              width: "100%",
            }}
          >
            Budjet tashkilotlarida budjet hisobi va hisoboti
          </Checkbox>
          <Checkbox
            style={{
              width: "100%",
            }}
          >
            G‘aznachilik boshqarmasi va g‘aznachilik bo‘linmalari boshliqlari
          </Checkbox>
           */}
          <CheckboxGroup
            options={plainOptions}
            value={checkedList}
            onChange={onChange}
          />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegistrationForm;

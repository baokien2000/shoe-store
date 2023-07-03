import React, { useEffect, useState } from "react";
import adminSlice from "../../../redux/Slice/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, DatePicker, Form, Input, Radio } from "antd";
import moment from "moment";
import { userDetails } from "../../../redux/selector";
import { lowcase, symbols, upcase } from "../../Login/RegisterPage";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import axios from "axios";

const ChangePass = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState("")
    const [loadding, setLoading] = useState(false)
    useEffect(() => {
        dispatch(adminSlice.actions.setTab("Change Password"));
    }, []);

    const [form] = Form.useForm();
    const Old = Form.useWatch("Old", form);
    const New = Form.useWatch("New", form);
    const Confirm = Form.useWatch("Confirm", form);

    const onFinish = async (values) => {

        if (values.Old.length < 8 || values.New.length < 8 || values.Confirm.length < 8) {
            setError("Password must have at least 8 character")
            return;
        }
        if (!lowcase.some((substring) => values.New.includes(substring)) ||
            !upcase.some((substring) => values.New.includes(substring)) ||
            !symbols.some((substring) => values.New.includes(substring))) {
            setError("Password must have symbol, upper and lower case character")
            return;
        }
        if (values.New !== values.Confirm) {
            setError("Your New password not match")
            return;
        }
        try {
            setLoading(true)
            const checkOldPass = await axios({
                method: "post",
                url: 'https://kstore-api.cyclic.app/users/checkPass',
                data: {
                    name: "Admin",
                    password: values.Old
                },

            })
            setLoading(false)
            if (checkOldPass.data) {
                toast.warning("You do not have permission to perform this action")
            } else {
                setError("Your old password is not valid")
            }
        } catch (e) {
            toast.error("An error occurred, please try again later")
        }

    };
    const onFieldsChange = () => {
        setError("")
    }
    return (
        <div className="MyAccount ChangeAccount">
            <Form form={form} onFinish={onFinish} onFieldsChange={onFieldsChange} className="Account_Info">
                <Form.Item name="Old" label={"Old Password"} rules={[{ required: true, message: 'Please input your old password' }]}>
                    <Input.Password
                        placeholder="Old password"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </Form.Item>
                <Form.Item name="New" label={"New Password"} rules={[{ required: true, message: 'Please input your new password' }]}>
                    <Input.Password
                        placeholder="New password"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </Form.Item>
                <Form.Item name="Confirm" label={"Confirm Password"} rules={[{ required: true, message: 'Please input your confirm password' }]}>
                    <Input.Password
                        placeholder="Confirm password"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </Form.Item>
                <Form.Item>
                    <div style={{ justifyContent: "space-between", display: "flex" }}>
                        <span style={{ color: "red", visibility: error.length !== 0 ? 'visible' : "hidden" }}>{error}</span>
                        <Button loading={loadding} htmlType="submit" className="AddButton" style={{ alignItems: "center", display: "flex" }}>
                            Save Change
                        </Button>
                    </div>
                </Form.Item>

            </Form>

            <div className="Account_Pass_Rule RegisterRule">
                <li className={Old && New && Confirm && Old.length >= 8 && New.length >= 8 && Confirm.length >= 8 ? "qualified" : ""}>
                    At least 8 character
                </li>
                <li className={New && lowcase.some((substring) => New.includes(substring)) && upcase.some((substring) => New.includes(substring)) ? "qualified" : ""}>
                    Upper and lower case character
                </li>
                <li className={New && symbols.some((substring) => New.includes(substring)) ? "qualified" : ""}>
                    At least 1 symbol
                </li>
                <li className={New && New === Confirm ? "qualified" : ""}>Password match</li>
            </div>
        </div>
    );
};

export default ChangePass;

import React, { useEffect, useState } from 'react';
import adminSlice from '../../../redux/Slice/adminSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, DatePicker, Input, Radio } from 'antd';
import moment from 'moment';
import { userDetails } from '../../../redux/selector';
import { useNavigate } from 'react-router-dom';

const Account = () => {
    const dispatch = useDispatch()
    const admin = useSelector(userDetails)
    const navigate = useNavigate()
    const [selectedImage, setSelectedImage] = useState(null);
    const [value, setValue] = useState(1);


    const onChange = (e) => {

        setValue(e.target.value);
    };
    const onDateChange = (date, dateString) => {
        // console.log(date, dateString);
    };

    useEffect(() => {
        dispatch(adminSlice.actions.setTab("My Account"))
    }, [])

    return (
        <div className='MyAccount'>
            <div className='Account_Info'>
                <div>
                    <span className='Label'>Username</span>
                    <Input placeholder="Username" defaultValue={admin.name} />
                </div>
                <div>
                    <span className='Label'>Email</span>
                    <Input placeholder="Email" defaultValue={admin.email} />
                </div>
                <div>
                    <span className='Label'>Phone Number</span>
                    <Input placeholder="Phone" type='number' defaultValue={admin.phone} />
                </div>
                <div style={{ display: "flex" }}>

                    <span className='Label'>Role</span>
                    <p>{admin.admin}</p>
                </div>



                <div>
                    <span className='Label'>Gender</span>
                    <Radio.Group onChange={onChange} defaultValue={admin.gender}>
                        <Radio value={"Male"}>Male</Radio>
                        <Radio value={"Female"}>Female</Radio>
                        <Radio value={"Other"}>Other</Radio>
                    </Radio.Group>
                </div>
                <div>
                    <span className='Label'>Date of birth	</span>
                    <DatePicker
                        onChange={onDateChange}
                        disabledDate={(current) => {
                            return moment().add(-1, 'days') <= current
                        }}
                    />
                </div>
                <div style={{ justifyContent: "space-between", display: "flex" }}>
                    <Button className='AddButton' onClick={() => navigate("change-password")}>Change Password</Button>
                    <Button className='AddButton' onClick={() => toast.warning("You do not have permission to perform this action")}>Save</Button>
                </div>
            </div>
            <div className='Account_Avatar'>
                <label htmlFor="files"><img src={selectedImage ? URL.createObjectURL(selectedImage) : '/images/userImage.png'} alt='Account' /></label>


                <label className='UploadBtn' htmlFor="files">Select Image</label>
                <input type='file' style={{ display: "none" }} id="files" onChange={(event) => {
                    if (event.target.files && event.target.files[0]) {

                        if (event.target.files[0].size < 1000000) {
                            if (event.target.files[0].type.split("/")[1] === "jpeg" || event.target.files[0].type.split("/")[1] === "png") {
                                setSelectedImage(event.target.files[0]);
                            } else {
                                toast.error("Your image extension must be JPEG or PNG")
                            }
                        } else {
                            toast.error("Your image size must be less than 1MB")
                        }
                    }
                }} />
                <span>File size: maximum 1 MB</span>
                <span>File extension: .JPEG, .PNG</span>

            </div>
        </div>
    );
};

export default Account;
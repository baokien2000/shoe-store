import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { Input } from 'antd';
import { CreateFeedback } from '../api/admin/feedback';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { userDetails } from '../redux/selector';

const { TextArea } = Input;

const FeedbackModel = () => {
    const [open, setOpen] = useState(false)
    const [status, setStatus] = useState(0)
    const [value, setValue] = useState('');
    const userInfo = useSelector(userDetails)
    const showModal = () => {
        setOpen(true);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    const handleOk = async () => {
        const payload = {
            status: status,
            content: value,
            user: userInfo ? userInfo.name : undefined,
            avatar: userInfo ? userInfo.avatar : undefined,
        }
        const createFeedback = await CreateFeedback(payload)
        if (createFeedback.status === 200) {
            toast.success(<><span>Feedback submitted successfully</span><br /><span> Thanks for your feedback</span></>)
            setOpen(false);
            setStatus(0)
            setValue("")
        } else {
            toast.error(<><span>Submit feedback failed</span><br /><span>Please try again later</span></>);
        }
    };

    return (
        <>
            <button onClick={showModal}>
                <img src="/images/star.png" alt="star" />
                <span>Feed back</span>
            </button>
            <Modal className='FeedbackModel' okText="Send Feedback" onCancel={handleCancel} open={open} onOk={handleOk}>
                <div className='status'>
                    <img className={status === 1 ? "selected" : ""} onClick={() => status === 1 ? setStatus(0) : setStatus(1)} src='/images/Status_1.png' alt='Status_1' />
                    <img className={status === 2 ? "selected" : ""} onClick={() => status === 2 ? setStatus(0) : setStatus(2)} src='/images/Status_2.png' alt='Status_2' />
                    <img className={status === 3 ? "selected" : ""} onClick={() => status === 3 ? setStatus(0) : setStatus(3)} src='/images/Status_3.png' alt='Status_3' />
                    <img className={status === 4 ? "selected" : ""} onClick={() => status === 4 ? setStatus(0) : setStatus(4)} src='/images/Status_4.png' alt='Status_4' />
                    <img className={status === 5 ? "selected" : ""} onClick={() => status === 5 ? setStatus(0) : setStatus(5)} src='/images/Status_5.png' alt='Status_5' />
                </div>
                <div className='FeedbackContent'>
                    <TextArea
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="How was your experience?"
                        autoSize={{ minRows: 5, maxRows: 10 }}
                    />
                </div>
            </Modal>
        </>

    );
};

export default FeedbackModel;
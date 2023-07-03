import React from 'react';
// import Avatar from "../../../../../images/Avatar.jpg"
// import AnonymuosImage from "../../../../../images/AnonymuosImage.PNG"
import { RenderStar } from './Star';
import { UpdateIsRead } from '../../../../../api/admin/feedback';
import { useState } from 'react';
import moment from 'moment';
import { toast } from 'react-toastify';

const FeedbackItem = ({ feedback }) => {
    const [isRead, setIsRead] = useState(feedback.isRead)
    const handleFeedbackClick = async () => {
        if (!isRead) {
            try {
                const read = await UpdateIsRead({ ...feedback, isRead: true })
                setIsRead(read.isRead)
            } catch (error) {
                if (error.response.status === 403) {
                    toast.warning(error.response.data)
                } else {
                    toast.error("Something went wrong. Please try again later");

                }
            }
        }
    }

    return (
        <div className='FeedbackItem' onClick={handleFeedbackClick}>
            <img src={feedback.user === "BaoKien" ? "/images/Avatar.jpg" : "/images/AnonymuosImage.PNG"} alt='Avatar' />
            <div className=''>
                <div className='Title'>


                    <p>{feedback.user ?? "Unknown"}</p>
                    <span >{moment(feedback.createdAt).fromNow()}</span>
                    {feedback.status !== 0 && <RenderStar rate={feedback.status} />}
                    {!isRead ? <b>New</b> : <></>}
                </div>
                <span className='Time_mobile'>{moment(feedback.createdAt).fromNow()}</span>

                <div className='Content'>
                    {feedback.content}
                </div>
            </div>
        </div>
    );
};

export default FeedbackItem;
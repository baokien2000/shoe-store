import React from 'react';
import { StarOutlined, StarFilled } from "@ant-design/icons"
import Star, { RenderStar } from './component/Star';
import { Button, Checkbox, Empty } from 'antd';
import { useState } from 'react';
import FeedbackItem from './component/FeedbackItem';
import { useDispatch } from 'react-redux';
import adminSlice from '../../../../redux/Slice/adminSlice';
import { useEffect } from 'react';
import { Pagination } from 'antd';
import { GetFeedbacks, TestGetFeedback, getAllFeedback } from '../../../../api/admin/feedback';
import Loading from '../../../Loading';
import { useWindowSize } from '../../../../hooks/useWindowSize';

const Feedback = () => {
    const [loading, setLoading] = useState(true)
    const [loadingPage, setLoadingPage] = useState(false)
    const [tab, setTab] = useState(0)
    const [feedbacks, setFeedbacks] = useState([])
    const [feedbacks_NoRen, setFeedbacks_NoRen] = useState([])
    const [rate, setRate] = useState(0)
    const dispatch = useDispatch()
    const [width, height] = useWindowSize()
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [unRead, setUnRead] = useState(false)
    const pageSize = 5
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    const handleTabChange = (i) => {
        setPage(1)
        setTab(i)
    }

    useEffect(() => {
        setLoadingPage(true)
        scrollToTop()
        async function fetchData() {
            const rep = await GetFeedbacks({
                page: page,
                pageSize: pageSize,
                status: tab === 0 ? undefined : tab,
                isRead: unRead ? false : undefined,
            })
            setFeedbacks(rep.data)
            setTotal(rep.total)
            setLoadingPage(false)

        }
        fetchData()

    }, [page, tab, unRead])
    useEffect(() => {

        dispatch(adminSlice.actions.setTab("Feedback"))
        async function fetchData() {
            const rep = await getAllFeedback()

            setFeedbacks_NoRen(rep.data)
            const containNewFeedback = rep.data.filter(i => i.isRead === false).length !== 0

            dispatch(adminSlice.actions.setMewFeedback(containNewFeedback))

            const statusList = rep.data.filter(i => i.status !== 0).map(i => i.status)
            const sum = statusList.reduce((accumulator, value) => {
                return accumulator + value
            }, 0)
            setRate((sum / statusList.length).toFixed(1))
            setLoading(false)
        }
        fetchData()

    }, [])

    const renderRateBtn = () => {
        const btnList = []

        for (let i = 1; i < 6; i++) {
            const count = feedbacks_NoRen.filter(item => item.status === i).length
            btnList.unshift(<Button key={i} className={tab === i ? 'selectedBtn' : ""} onClick={() => handleTabChange(i)}>
                {i} Star ({count})
            </Button>)
        }
        btnList.unshift(<Button key={0} className={tab === 0 ? 'selectedBtn' : ""} onClick={() => handleTabChange(0)}>All</Button>)

        return <div>{btnList}</div>
    }

    const onChange = (e) => {
        // console.log(`checked = ${e.target.checked}`);
        setUnRead(e.target.checked)
    };
    return (
        !loading ? <div className='Feedback_Page'>
            <div className='Feedback_Header'>

                <div className='Rate'>
                    <span><b>{rate}</b> / 5</span>
                    <RenderStar rate={rate} size={width > 516 ? 25 : 20} />
                </div>
                <div className='Rate_Tab'>
                    {renderRateBtn()}
                    <Checkbox onChange={onChange} checked={unRead}>Unread</Checkbox>
                </div>
            </div>
            {feedbacks.length !== 0 ? <div className='FeedbackContent'>
                <div className={loadingPage ? 'FeedbackPageLoading' : ""}>

                    {feedbacks.map((item) => {
                        return <FeedbackItem feedback={item} key={item._id} />
                    })}
                </div>
                {total > pageSize && <div className='Feedback_Pagination'>
                    <Pagination current={page} onChange={(page) => setPage(page)} pageSize={pageSize} total={total} />
                </div>}
            </div> : <div style={{ marginTop: "30px" }}>
                <Empty />
            </div >}
        </div> : <Loading />
    );
};

export default Feedback;
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
// import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CurrentPages } from '../../redux/selector';
import pageSlice from '../../redux/Slice/pageSlice';

export default function PaginationRounded({ PageNum, forwardRef }) {
    const dispatch = useDispatch()
    const HandlePaginationChange = (event, value) => {
        dispatch(pageSlice.actions.PagesChange(value))
        // window.scrollTo({
        //     top: 0,
        //     left: 0,
        //     behavior: 'instant',
        // });
        forwardRef.current.scrollIntoView();

    }
    const page = useSelector(CurrentPages)

    return (
        <Stack spacing={2} >
            <Pagination page={page} onChange={HandlePaginationChange} count={PageNum} variant="outlined" shape="rounded" />
        </Stack>
    );
}
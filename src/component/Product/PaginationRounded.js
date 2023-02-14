import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
// import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CurrentPages } from '../../redux/selector';
import pageSlice from '../../redux/Slice/pageSlice';

export default function PaginationRounded({ PageNum }) {
    const dispatch = useDispatch()
    const HandlePaginationChange = (event, value) => {
        // setCurrentPage(value)
        dispatch(pageSlice.actions.PagesChange(value))
    }
    const page = useSelector(CurrentPages)

    return (
        <Stack spacing={2} >
            <Pagination page={page} onChange={HandlePaginationChange} count={PageNum} variant="outlined" shape="rounded" />
        </Stack>
    );
}
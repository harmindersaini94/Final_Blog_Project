import {configureStore} from '@reduxjs/toolkit'
import HomestatReducer from './Slice/HomestaySlice'

const HomestayStore = configureStore({
    reducer: HomestatReducer
});

export default HomestayStore
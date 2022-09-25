import { configureStore } from '@reduxjs/toolkit'
import calculateSlice from './slice/calculateSlice'

export const store = configureStore({
 reducer: {
    calculate:calculateSlice,
 },
})

// export default store
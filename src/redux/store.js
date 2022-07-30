import { configureStore } from '@reduxjs/toolkit'
import heroesSlice from './slices/heroesSlice'
import modalSlice from './slices/modalSlice'

export const store = configureStore({
    reducer: {
        heroes: heroesSlice,
        modal: modalSlice,
    },
})

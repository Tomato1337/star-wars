import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchModal = createAsyncThunk(
    'modal/fetchModal',
    async ({ request, api }) => {
        const data = await request(api)

        const changeModal = async (data) => {
            const _transformPeoples = async (data) => {
                let otherInfo = [data.species, [data.homeworld], data.films]

                // console.log(otherInfo)

                const filterData = otherInfo.map(async (other) => {
                    return Promise.all(
                        other.map((info) => {
                            return request(info).then((res) => res)
                        })
                    ).then((res) => res)
                })

                return Promise.all(filterData).then((res) => {
                    const obj = {
                        name: data.name,
                        birthYear: data.birth_year,
                        gender: data.gender,
                        eyeColor: data.eye_color,
                        other: res,
                    }
                    return obj
                })
            }

            const filterData = await _transformPeoples(data)

            return Promise.all([filterData]).then((res) => {
                return res
            })
        }

        const changeData = await changeModal(data)

        return changeData
    }
)

const initialState = {
    items: [],
    status: 'loading',
    link: '',
    isFirst: true,
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setLink: (state, action) => {
            state.link = action.payload
        },
        setIsFirst: (state, action) => {
            state.isFirst = action.payload
        },
    },
    extraReducers: {
        [fetchModal.pending]: (state) => {
            state.status = 'loading'
        },

        [fetchModal.fulfilled]: (state, action) => {
            state.items = action.payload
            state.status = 'idle'
        },

        [fetchModal.rejected]: (state, action) => {
            state.status = 'error'
        },
    },
})

const { actions, reducer } = modalSlice

export const { setLink, setIsFirst } = actions
export default reducer

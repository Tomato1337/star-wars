import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes',
    async ({
        request,
        page,
        api = 'https://swapi.dev/api/people/',
        searchValue = '',
    }) => {
        const data = await request(
            `${api}?search=${searchValue}&${page ? `page=${page}` : ''}`
        )

        const changeHeroesList = async () => {
            const _transformPeople = async (data) => {
                // console.log(data)
                const filterData = await data.species.map((item) => {
                    return request(item).then((res) => res)
                })

                return Promise.all(filterData).then((res) => {
                    const obj = {
                        name: data.name,
                        eyeColor: data.eye_color,
                        url: data.url,
                        other: res,
                    }
                    return obj
                })
            }

            const filterData = data.results.map((item) => {
                return _transformPeople(item)
            })

            return Promise.all(filterData).then((res) => {
                return res
            })
        }

        const changeData = await changeHeroesList(data)

        return { changeData, data }
    }
)

const initialState = {
    items: [],
    status: 'loading',
    page: 1,
    countHeroes: 82,
    newItem: false,
    isFirst: true,
    searchValue: '',
}

const herosSlice = createSlice({
    name: 'heros',
    initialState,
    reducers: {
        setNewItem: (state, action) => {
            state.newItem = action.payload
        },
        setSearchValue: (state, action) => {
            state.searchValue = action.payload
        },
        setIsFirst: (state, action) => {
            state.isFirst = action.payload
        },
        clearHeroes: (state) => {
            state.items = []
            state.page = 1
        },
    },
    extraReducers: {
        [fetchHeroes.pending]: (state) => {
            state.status = 'loading'
        },

        [fetchHeroes.fulfilled]: (state, action) => {
            state.items.push(...action.payload.changeData)
            state.countHeroes = action.payload.data.count
            state.status = 'idle'
            state.page = state.page + 1
            state.newItem = false
            state.isFirst = false
        },

        [fetchHeroes.rejected]: (state, action) => {
            state.status = 'error'
        },
    },
})

const { actions, reducer } = herosSlice

export const { setNewItem, setSearchValue, setIsFirst, clearHeroes } = actions
export default reducer

import './appMain.scss'
import Loading from '../LoadingBlock/LoadingBlock'
import Modal from '../ModalBlock/ModalBlock'
import Empty from '../EmptyBlock/EmptyBlock'

import { useEffect, useState, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    clearHeroes,
    fetchHeroes,
    setIsFirst,
    setNewItem,
    setSearchValue,
} from '../../redux/slices/heroesSlice'
import { setLink } from '../../redux/slices/modalSlice'
import { useHttp } from '../../hooks/http.hook'
import debounce from 'lodash.debounce'

const Main = () => {
    const { items, page, status, newItem, isFirst, searchValue, countHeroes } =
        useSelector((state) => state.heroes)
    const dispatch = useDispatch()
    const { request } = useHttp()
    const scrollRef = useRef(null)
    const [searchValueView, setSearchValueView] = useState('')

    useEffect(() => {
        scrollUpdate()
    }, [])

    useEffect(() => {
        if (
            newItem &&
            page !== Math.ceil(countHeroes / 9) &&
            countHeroes > 9 &&
            !isFirst
        ) {
            dispatch(fetchHeroes({ request, page, searchValue }))
        }
    }, [newItem])

    useEffect(() => {
        dispatch(fetchHeroes({ request, page, searchValue }))
    }, [searchValue])

    const scrollUpdate = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    dispatch(setNewItem(true))
                }
            })
        })
        observer.observe(scrollRef.current)
        return () => observer.disconnect()
    }

    const updateSearchValue = useCallback(
        debounce((str) => {
            dispatch(setSearchValue(str))
            dispatch(setIsFirst(true))
            dispatch(clearHeroes())
        }, 500),
        []
    )

    const onChangeInput = (e) => {
        setSearchValueView(e.target.value)
        updateSearchValue(e.target.value)
    }

    const heroesCard = items.map((item, i) => {
        return <View {...item} key={i} />
    })

    return (
        <section className="main">
            <div className="container">
                <div className="main-search">
                    <input
                        id="search"
                        type="text"
                        className={`main-search__name`}
                        autoComplete="off"
                        placeholder="Search by name"
                        value={searchValueView}
                        onChange={onChangeInput}
                    ></input>
                    <button className="main-search__img">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M16.6667 14.6667H15.6133L15.24 14.3067C16.5467 12.7867 17.3333 10.8133 17.3333 8.66667C17.3333 3.88 13.4533 0 8.66667 0C3.88 0 0 3.88 0 8.66667C0 13.4533 3.88 17.3333 8.66667 17.3333C10.8133 17.3333 12.7867 16.5467 14.3067 15.24L14.6667 15.6133V16.6667L21.3333 23.32L23.32 21.3333L16.6667 14.6667ZM8.66667 14.6667C5.34667 14.6667 2.66667 11.9867 2.66667 8.66667C2.66667 5.34667 5.34667 2.66667 8.66667 2.66667C11.9867 2.66667 14.6667 5.34667 14.6667 8.66667C14.6667 11.9867 11.9867 14.6667 8.66667 14.6667Z"
                                fill="#808080"
                            />
                        </svg>
                    </button>
                </div>
                <div className="main__blocks">{heroesCard}</div>
            </div>
            <div className="main__loading">
                {status === 'loading' ? <Loading /> : null}
                {status === 'idle' && items.length === 0 ? <Empty /> : null}
            </div>
            <div ref={scrollRef} className="main__other"></div>
            <Modal />
        </section>
    )
}

const View = ({ eyeColor, name, other, url }) => {
    const dispatch = useDispatch()

    const changeLink = () => {
        dispatch(setLink(url))
    }

    return (
        <div onClick={changeLink} className="main-block">
            <div className="main-block__content">
                <div
                    className="avatar main-block__avatar"
                    style={{ backgroundColor: eyeColor }}
                >
                    <span>{name.slice(0, 1)}</span>
                </div>
                <div className="name main-block__title">{name}</div>
                <div className="main-block__subtitle">
                    {other[0] ? other[0].name : 'None'}
                </div>
            </div>
        </div>
    )
}

export default Main

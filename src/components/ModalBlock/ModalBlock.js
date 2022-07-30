import './modalBlock.scss'
import close from '../../assets/img/close.svg'
import birthDay from '../../assets/img/birth.svg'
import species from '../../assets/img/species.svg'
import genders from '../../assets/img/gender.svg'
import homeworld from '../../assets/img/homework.svg'
import films from '../../assets/img/films.svg'
import Loading from '../LoadingBlock/LoadingBlock'

import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import { fetchModal, setLink } from '../../redux/slices/modalSlice'
import { useHttp } from '../../hooks/http.hook'

const Modal = () => {
    const dispatch = useDispatch()
    const isFirst = useRef(true)
    const { request } = useHttp()
    const { items, status, link } = useSelector((state) => state.modal)

    useEffect(() => {
        if (!isFirst.current && link.length > 0) {
            dispatch(fetchModal({ request, api: link }))
        }
        isFirst.current = false
    }, [link])

    const clazz =
        link.length > 0 ? { visibility: 'visible' } : { visibility: 'hidden' }

    if (link.length > 0) {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = ''
    }

    const modalWindow = items.map((item, i) => {
        return <View key={i} {...item} />
    })

    return (
        <div
            style={clazz}
            className="popup"
            onClick={() => {
                dispatch(setLink(''))
            }}
        >
            {status === 'loading' ? <Loading /> : modalWindow}
        </div>
    )
}

const View = ({ name, birthYear, gender, other, eyeColor }) => {
    const dispatch = useDispatch()

    return (
        <div className="popup__card" onClick={(e) => e.stopPropagation()}>
            <div className="popup__close" onClick={() => dispatch(setLink(''))}>
                <img src={close} alt="close" />
            </div>
            <div className="popup__info">
                <div className="avatar" style={{ backgroundColor: eyeColor }}>
                    <span>{name.slice(0, 1)}</span>
                </div>
                <div className="name popup__name">{name}</div>
            </div>
            <hr className="popup__line" />
            <div className="popup__links-wrapper">
                <div className="popup__links">
                    <div className="popup-link">
                        <div className="popup-link__key">
                            <img src={birthDay} alt="birthYear" />
                            <span>Birth year</span>
                        </div>
                        <div className="popup-link__value">{birthYear}</div>
                    </div>
                    <div className="popup-link">
                        <div className="popup-link__key">
                            <img src={species} alt="species" />
                            <span>Species</span>
                        </div>
                        <div className="popup-link__value">
                            {other[0][0]?.name ? other[0][0].name : 'None'}
                        </div>
                    </div>
                    <div className="popup-link">
                        <div className="popup-link__key">
                            <img src={genders} alt="gender" />
                            <span>Gender</span>
                        </div>
                        <div className="popup-link__value">{gender}</div>
                    </div>
                </div>
                <div className="popup__links">
                    <div className="popup-link">
                        <div className="popup-link__key">
                            <img src={homeworld} alt="homeworld" />
                            <span>Homeworld</span>
                        </div>
                        <div className="popup-link__value">
                            {other[1][0].name}
                        </div>
                    </div>
                    <div className="popup-link">
                        <div className="popup-link__key">
                            <img src={films} alt="films" />
                            <span>Films</span>
                        </div>
                        <div className="popup-link__value">
                            {other[2].map((item) => {
                                return (
                                    <>
                                        {item.title}
                                        <br />
                                    </>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal

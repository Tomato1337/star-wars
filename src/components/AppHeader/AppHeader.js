import './appHeader.scss'
import header1 from '../../assets/img/header-1.png'
import header2 from '../../assets/img/header-2.png'

const Header = () => {
    return (
        <section className="header">
            <div className="container">
                <div className="header__content">
                    <div className="header__block">
                        <div className="header__img">
                            <img src={header1} alt="star" />
                        </div>
                        <div className="header__text">
                            CHARACTER Encyclopedia
                        </div>
                        <div className="header__img">
                            <img src={header2} alt="wars" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Header

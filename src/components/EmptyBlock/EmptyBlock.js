import './emptyBlock.scss'
import empty from '../../assets/img/empty.png'

const Empty = () => {
    return (
        <div className="empty">
            <div className="empty__img">
                <img src={empty} alt="empty" />
            </div>
            <h2>Empty</h2>
        </div>
    )
}

export default Empty

import Header from '../AppHeader/AppHeader'
import Main from '../AppMain/AppMain'
import Footer from '../AppFooter/AppFooter'

import './App.css'

const App = () => {
    return (
        <>
            <div className="app__main">
                <Header />
                <Main />
            </div>
            <Footer />
        </>
    )
}

export default App

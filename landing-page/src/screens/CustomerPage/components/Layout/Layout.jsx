import { Outlet } from 'react-router-dom'
import Header from '../Header'
import './style.css'

const Layout = () => {
    return (
        <div className="layout">
            <Header />
            <main className="layout-content">
                <Outlet />
            </main>
        </div>
    )
}

export default Layout 
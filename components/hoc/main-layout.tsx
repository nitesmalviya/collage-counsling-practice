'use client';
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import {store} from './../../store/store'
const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <ToastContainer />
            <Provider store={store}>
                {children}
            </Provider>
        </>
    )
}

export default Layout;

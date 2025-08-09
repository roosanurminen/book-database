import { ToastContainer, toast } from 'react-toastify';

const ToastProvider = () => {
    return (
        <div>
            <ToastContainer
                position="bottom-center"
                autoClose={1000} // 1seconds
                theme="light"
                hideProgressBar='true'
            />
        </div>
    )
}

export default ToastProvider;
import { ToastContainer, toast } from 'react-toastify';

const ToastProvider = () => {
    return (
        <div>
            <ToastContainer
                position="bottom-center"
                autoClose={2000} // 2seconds
                theme="light"
            />
        </div>
    )
}

export default ToastProvider;
import { ToastContainer, toast } from 'react-toastify';
import './ToastProvider.css';

const ToastProvider = () => {
    return (
        <div>
            <ToastContainer
                position="bottom-center"
                autoClose={1000} // 1seconds
                theme="light"
                hideProgressBar={true}
                icon={false} 
            />
        </div>
    )
}

export default ToastProvider;
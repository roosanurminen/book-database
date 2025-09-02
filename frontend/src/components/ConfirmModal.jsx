import './ConfirmModal.css';

const ConfirmModal = ({ open, title, msg, onConfirm, onCancel}) => {

    if (!open) {
        return null;
    }

    return (
        <div className='confirm-modal'>
            <div className='confirm-content'>
                <h3>{title}</h3>
                <p>{msg}</p>
                <div className='confirm-btns'>
                    <button className='cancel-btn' onClick={onCancel}>Ei</button>
                    <button className='confirm-btn' onClick={onConfirm}>Kyllä</button>
                </div>
            </div>
        </div>
    )
};


export default ConfirmModal;
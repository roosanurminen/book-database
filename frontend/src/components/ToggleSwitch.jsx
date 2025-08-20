import './ToggleSwitch.css';


const ToggleSwitch = ({ checked, onChange }) => {
    return (
        <label className='toggle-switch'>
            <input 
                type='checkbox'
                checked={checked} 
                onChange={onChange} 
            />
            <span className='slider'></span>
            <span className='toggle-label'>Näytä myös puuttuvat osat</span>
        </label>
    )
}

export default ToggleSwitch;
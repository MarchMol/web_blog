import PropTypes from 'prop-types'
import './Input.css'
const Input = ({type, label, value, onChange,size}) => {
    return(

    <div className="field">
        <label>{label}:</label>
        {!(size==='bigInput') ? (
        <input 
        className={size}
        onChange={({target: {value}}) => onChange(value)} 
        value={value} 
        type={type}/>
        ):
         <textarea 
         onChange={({target: {value}}) => onChange(value)}
         value={value} 
         />

        }

    </div>
    )
}

Input.propTypes = {
    size: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
}

export default Input
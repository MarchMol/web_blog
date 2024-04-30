import PropTypes from 'prop-types'
import './Input.css'
const Input = ({type, label, value, onChange}) => {
    return(

    <div className="field">
        <label>{label}:</label>
        <input 
        onChange={({target: {value}}) => onChange(value)} 
        value={value} 
        type={type}/>
    </div>
    )
}

Input.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
}

export default Input
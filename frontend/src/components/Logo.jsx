import './Logo.css'
import logo_amp from '../assets/logo_amp.png';

function Logo() {

    return(
        <>
        
        <div className="logo">
            <p><b>Beat <br /> Buzz</b></p>
            <img src={logo_amp} alt="amp" />
        </div>
        </>

    )

}

export default Logo
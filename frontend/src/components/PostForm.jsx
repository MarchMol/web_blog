import './PostForm.css'
import {PropTypes} from 'prop-types'

function PostForm({type}) {
    return(
        <>
            {

            }
        <h2>{type}</h2>
        </>
    )
}

PostForm.propTypes = {
    type: PropTypes.string,
    id: PropTypes.string,
    currentInfo: PropTypes.object
}

export default PostForm
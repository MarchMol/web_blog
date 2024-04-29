import jwt from 'jsonwebtoken'

const SECRET = 'purple-yellow-red-&-blue'

const generateToken = (username) => {
    return jwt.sign(username, SECRET, {expiresIn: '15min', algorithm: 'HS256'})
}

const validateToken = (token) => {
    return jwt.verify(token, SECRET)
}

export {generateToken, validateToken}
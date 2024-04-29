import jwt from 'jsonwebtoken'

const SECRET = 'purple-yellow-red-&-blue'

const generateToken = (user) => {
    return jwt.sign(user, SECRET, {expiresIn: '15min', algorithm: 'HS256'})
}

const validateToken = (token) => {
    return jwt.verify(token, SECRET)
}

export {generateToken, validateToken}
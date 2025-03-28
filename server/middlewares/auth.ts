import { verify } from 'jsonwebtoken'

function verifyToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1]
  if (!token) {
    return res
      .status(401)
      .json({ header: 'Unathorized', message: 'Please, log in your account or register new' })
  }

  verify(token, 'secret', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: err })
    }

    req.user = decoded
    next()
  })
}

export default verifyToken

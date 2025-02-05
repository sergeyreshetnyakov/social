import { verify } from 'jsonwebtoken'

function verifyToken(req, res, next) {
  const token = req.headers.authorization.split(' ')[1]

  if (!token) {
    return res.status(401).end()
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

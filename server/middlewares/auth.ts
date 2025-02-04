import verify from 'jsonwebtoken'

function verifyToken(req, res, next) {
  const token = req.headers['authorization']
  if (!token) {
    return res.status(401)
  }

  verify(token, 'secret', (err, decoded) => {
    if (err) {
      return res.status(401)
    }

    req.user = decoded
    next()
  })
}

export default verifyToken

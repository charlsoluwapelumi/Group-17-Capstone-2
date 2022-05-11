const jwt = require('jsonwebtoken');

module.exports = function authenticateToken (req, res, next) {
  const get = name => process.env[name];
  const authHeader = req.headers['authorization']
  // Bearer Token
  const token = authHeader && authHeader.split(' ')[1]


  if (token == null){
    return res.sendStatus(401)
  } 

  jwt.verify(token, 'sindosndsno94347374374347374373', (err, user) => {
  

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}

 
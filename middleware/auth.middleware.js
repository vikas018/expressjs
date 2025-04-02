import jwt from 'jsonwebtoken'

export const isLoggedIn = async (req, res, next) => {
  try {
    const token1 = req.cookies?.token
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZWQyZjRiMjcxODE1NDc0YWUxNmE5MyIsImlhdCI6MTc0MzU5NzUyOCwiZXhwIjoxNzQzNjgzOTI4fQ.RBJ9_NURh2oC3L6UQYKuTr3vsVXDjxbvLPuJW_E3N4g'
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication failed not token'
      })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Internal server error in Authentication.'
    })
  }
}
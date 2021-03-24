const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

const userMiddleware = (req, res, next) => {
  if (req.user.role !== 'user') {
    return res.status(400).json({ message: 'User access denied' })
  }
  next()
}

export { errorHandler, notFound, userMiddleware }

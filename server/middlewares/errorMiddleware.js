
const errorHandler = async (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
 await res.status(statusCode)
  await res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}

const notFound = async (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  await res.status(404)
  await next(error)
}

export { errorHandler, notFound }

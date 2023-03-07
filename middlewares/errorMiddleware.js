
const errorHandler = async (err, req, res, next) => {
  try {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    await res.status(statusCode)
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    })
  } catch (error) {
    
  }

}
export { errorHandler}

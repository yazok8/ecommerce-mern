//Will get back to this later

//This is for resetting the password.

exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      return res
        .status(200)
        .send('A password reset token has been emailed to you.')
    }
    user.resetPasswordToken = crypto.randomBytes(20).toString('hex')
    user.resetPasswordExpires = Date.now() + 3600000
    await user.save()
    sendResetEmail(user.email, user.name, user.resetPasswordToken)
    res.status(200).send()
  } catch (err) {
    res.status(500).send(err.message)
  }
}

exports.resetPassword = async (req, res) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    })
    if (!user) {
      throw new Error('Token is invalid or has expired.')
    }
    if (!req.body.password) {
      throw new Error('No new password provided.')
    }
    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpires = undefined
    await user.save()
    res.status(200).send()
  } catch (err) {
    res.status(400).send(err.message)
  }
}

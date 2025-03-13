import User from '../model/User.model.js'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'

const registerUser = async (req, res) => {
  // get data
  const { name, email, password } = req.body;
  
  // validate
  if (!name || !email || !password) {
    return res.status(404).json({
      message: "All fields are required."
    })
  }

  // check if user already exist we need to connect with db
  try {
    const existingUser = await User.findOne({email})
    if (existingUser) {
      return res.status(400).json({
        message: "User already exist."
      })
    }
    const user = await User.create({ name, email, password })

    if (!user) {
      return res.status(400).json({
        message: "User not registered."
      })
    }

    const token = crypto.randomBytes(32).toString("hex")
    console.log(token)
    user.verificationToken = token
    await user.save()

    // send mail
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    const mailOption = {
      from: process.env.MAILTRAP_SENDEREMAIL, // sender address
      to: "vkyadav018@gmail.com", // list of receivers
      subject: "Verification your email", // Subject line
      text: `Please click on the following link:
      ${process.env.BASE_URL}/api/v1/verify/${user.verificationToken}
      `,
    }

    const data1 = await transporter.sendMail(mailOption)
    console.log(data1)
    res.status(201).json({
      message: "User registerd successfully",
      success: true
    })
  } catch (error) {
    res.status(400).json({
      message: "User not registered",
      error,
      success: false,
    })
  }
}

const verifyUser = async (req, res) => {
  const { token } = req.params
  if (!token) {
    return res.status(404).json({
      message: 'token not found.'
    })
  }

  try {
    const user = await User.findOne({ verificationToken: token })
    
    if (!user) {
      return res.status(404).json({
        message: 'user not found.'
      })
    }

    user.isVerified = true
    user.verificationToken = ''
    user.save()
    return res.status(201).json({
      message: 'User verified successfully.'
    })
  } catch (error) {
    return res.status(404).json({
      message: 'verification failed.'
    })
  }

}

const logInUser = async (req, res) => {
  const { email, password } = req.body
  
  if (!email || !password) {
    return res.status(400).json({
      message: "All fields are required."
    })
  }

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        message: "User not found."
      })
    }
    
    const passwordVerified = await bcrypt.compare(password, user.password)
    if (!passwordVerified) {
      return res.status(400).json({
        message: "Passwrod not matched."
      })
    }

    const token = await jwt.sign(
      { id: user._id },
      'shhhh',
      { expiresIn: '24h' }
    )

    if (!token) {
      return res.status(400).json({
        message: "token not generated."
      })
    }

    const cookieOption = {
      httpOlny: true,
      secure: true,
      maxAge: 24*60*600*1000
    }

    res.cookie("token", token, cookieOption)
    res.status(201).json({
      message: "LogIn Successful.",
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
      }
    })

  } catch (error) {
     return res.status(400).json({
      message: "login failed."
    })
  }
}

export { registerUser, verifyUser, logInUser };
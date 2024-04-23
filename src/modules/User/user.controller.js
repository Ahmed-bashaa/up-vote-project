
import User from "../../../DB/models/user.model.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

//================================= SignUp API =====================//

export const SignUpHandeler = async (req, res, next) => {
    const { username, email, password, age, gender,phone } = req.body

    // email check
    const isEmailExists = await User.findOne({ email })
    if (isEmailExists) return next(new Error('Email is already exists', { cause: 409 }))

    // hash password
    const hashPass = bcrypt.hashSync(password, +process.env.SALT_ROUNDS)

    const newUser = await User.create({ username, email, password: hashPass, age, gender ,phone})
    return res.status(201).json({ message: 'User created successfully', newUser })
}

//================================= SignIn API =====================//

export const SignInHandeler = async (req, res, next) => {
    const { email, password } = req.body

    // email check
    const isEmailExists = await User.findOne({ email })
    if (!isEmailExists) return next(new Error('invalid login credentials', { cause: 404 }))

    // hash password
    const isPasswordMatched = bcrypt.compareSync(password, isEmailExists.password)
    if (!isPasswordMatched) return next(new Error('invalid login credentials', { cause: 404 }))
    const token = jwt.sign(
        { id: isEmailExists._id, userEmail: isEmailExists.email },
        process.env.LOGIN_SIGNATURE ,
        { expiresIn: "3h" }
       
    )
    return res.status(200).json({ message: 'User LoggedIn successfully', token })
}
//============================change password==========================
export const ChangePassword =async (req,res,next)=>{
    const { email,new_password, old_password} = req.body
    const { _id } = req.authUser
    const isEmailExists = await User.findOne({ email })
    if (!isEmailExists) return next(new Error('invalid login credentials', { cause: 404 }))

   const isOldPasswordCorrect = bcrypt.compareSync(old_password,isEmailExists.password )
   if (!isOldPasswordCorrect) {
    return res.json({message:"old password rang"})
   }
    const hashPass = bcrypt.hashSync(new_password, +process.env.SALT_ROUNDS)
    const updatedUser = await User.findByIdAndUpdate(_id ,{password:hashPass}, {new: true})

    if (!updatedUser) return next(new Error('update fail'))
    res.status(200).json({ message: 'done change password success', updatedUser })
}

//================================= Update Account API =====================//
export const updateAccount = async (req, res, next) => {
    const { username, email, age } = req.body
    const { _id } = req.authUser

    if (email) {
        // email check
        const isEmailExists = await User.findOne({ email })
        if (isEmailExists) return next(new Error('Email is already exists', { cause: 409 }))
    }
    const updatedUser = await User.findByIdAndUpdate({_id,isDeleted:false}//condition
    ,{ username, email, age}, 
    {new: true}
    )
    if (!updatedUser) return next(new Error('update fail'))
    res.status(200).json({ message: 'done', updatedUser })
}

//============================= Delete Account API =====================//

export const deleteAccount = async (req, res, next) => {
    const { _id } = req.authUser
    const deletedUser = await User.findByIdAndDelete(_id)
    if (!deletedUser) return next(new Error('delete fail'))
    res.status(200).json({ message: 'done' })
}

//=======================delete soft ==========================
export const deleteSoft = async (req, res, next) => {
    const { _id } = req.authUser
    const softDeleat= await User.findOneAndUpdate(
        {_id,isDeleted:false},//condition
        {isDeleted:true},
        {new:true}
    )
    if (!softDeleat) return res.status(400).json({message:"fail"})
    res.status(200).json({message:"success"}) 
}
//===================================================================
export const getUserProfile = async (req, res, next) => {
    res.status(200).json({ message: "User data:", data: req.authUser })
}

//========================fileUpload===========================================

export const fileUpload = (req, res, next) => {
    res.status(200).json({ message: "user data", data: req.files });
  };
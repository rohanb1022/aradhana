import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import generateWebToken from "../lib/util.js";

export const signup = async (req , res) => {

    const {username , email , password} = req.body;
    try {

        if(!username || !email || !password){
            return res.status(400).json({message : "All fields are mandatory for signup"})
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email) || password.length < 5) {
            return res.status(400).json({ message: "Please enter valid credentials." });
        }

        // check if user already exists
        const user = await User.findOne({username});
        if(user){
            return res.status(400).json({message : "username already exists please try another one"})
        }

        // check if email already exists
        const user2 = await User.findOne({email});
        if(user2){
            return res.status(400).json({message : "email already exists please try another one"})
        }

        // check if password is valid
        if(password.length < 5){
            return res.status(400).json({message : "Password must be at least 6 characters long"})
        }

        const salt = await bcrypt.genSalt(10)  // basically encrypt the password 10 times 
        const hashedPassword = await bcrypt.hash(password , salt)

        const newUser = new User({
            username,
            email,
            password : hashedPassword
        })

        const token = generateWebToken(newUser._id , res)

        if(newUser){
            await newUser.save();
            return res.status(201).json({
                token : token,
                id : newUser._id,
                username : username,
                email : email
            })
        }else{
           return  res.status(400).json({message : "Invalid credentials"})
        }
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({message : "Internal server error" })
    }
}

export const signin = async (req , res) => {
    const {username , password} = req.body;
    try {
        const existingUser = await User.findOne({username})
        if(!existingUser){
            return res.status(400).json({message : "User does not exist please try to signup"})
        }

        const passwordCompare = await bcrypt.compare(password , existingUser.password)

        if(!passwordCompare){
            return res.status(404).json({message : "email or password is incorrect"})
        }

        // if everything is fine then generate the token
        // and send the user data
        const token = generateWebToken(existingUser._id , res)
        res.status(200).json({
            token : token,
            _id: existingUser._id,
            firstname: existingUser.firstname,
            lastname : existingUser.lastname,
            username : existingUser.username,
            email: existingUser.email,
          });
    } catch (error) {
        return res.status(500).json({message : "Internal server error"})
    }
}

export async function logout(req, res) {
  try {
    res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });
  return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Logout error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function authCheck(req, res) {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.error("authCheck error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

const User = require('../models/User');

exports.signUp = async (req,res)=>{
    try{
        const {name, email,mobileNumber,password} = req.body;

        if(!name || !email || !mobileNumber || !password){
            return res.status(400).json({
                success:false,
                message:"Please Fill all the fields.",
            })
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already Exists",
            })
        }

        const newUser = new User({
            name,
            email,
            mobileNumber,
            password
        });

        const savedUser = await newUser.save();

        return res.status(201).json({
            success:true,
            message:`Welcome ${name}! User created Successfully`,
        });
    }
    catch(error){
        console.error("Error in signup",error);
        return res.status(500).json({
            success:false,
            message:"Server Error. Please try again later",
            // Error:error
        })
    }
}


exports.login = async(req,res)=>{
    try{
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Please fill all the details carefully"
            })
        }
        let user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User does not exist , Please sign up and then Login!"
            });
        }
        return res.status(201).json({
            success:true,
            userId:user._id,
            message:'Login successfully'
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login Failed!"
        })
    }
}
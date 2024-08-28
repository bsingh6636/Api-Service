import bcrypt from 'bcrypt'
import User from "../models/user.model.js"
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";
import jwt from 'jsonwebtoken'
import { deletePartobject } from '../helper/deletePartobject.js';
import crypto from 'crypto'
import axios from 'axios';

export const userSign = asyncErrorHandler(async (req, res) => {
    const { UserNameorEmail, Password } = req.body;

    try {
        let user = await User.findOne({
            $or: [
                { UserName: UserNameorEmail },
                { Email: UserNameorEmail }
            ]
        });

        if (!user) return res.status(400).json({ success: false, message: "User not found, try signing up." });


        const checkPassword = await bcrypt.compare(Password, user.Password)
        if (!checkPassword) return res.status(400).json({ success: false, message: "Incorrect Password try again." });
        const payload = { id: user.id }
        user = deletePartobject(user)
        const expiresIn = parseInt(process.env.COOKIE_EXPIRES, 10) * 24 * 60 * 60;

        // Generate token
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn });

        res.cookie('userToken', token, { httpOnly: true, secure: true, sameSite: 'strict' })
        return res.status(200).json({ success: 'true', message: "Logging In", data: user })
    } catch (error) {
        console.error(error)
        return res.status(400).json({ success: false, message: "Failed try again" });
    }
})

export const userSignUp = asyncErrorHandler(async (req, res) => {
    const { UserName, Password, Name, Email, Country } = req.body;
    if (!UserName || !Password || !Name || !Email) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [{ UserName }, { Email }]
        });

        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists, try signing in." });
        }


        await User.create({
            UserName, Password, Name, Email, Country
        })

        return res.status(201).json({ success: true, message: "User created successfully", });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error creating user", error });
    }
});

export const userLogOut = asyncErrorHandler(async (req, res, next) => {
    try {
        res.clearCookie('userToken')
        return res.status(200).json({ sucdess: true })
    } catch (error) {
        return res.status(400).json({ sucess: false, error })
    }
})

export const generateApiKey = asyncErrorHandler(async (req, res, next) => {
    const { UserName } = req.body;

    if (!UserName) return res.status(400).json({ success: false, error: 'userName is required' });
    

    try {
        const user = await User.findOne({ UserName });
        if (!user) return res.status(404).json({ success: false, error: 'User not found' });
        
        if (user.ApiKey) {
            return res.json({ success: true, message: 'API key already exists', data: user.ApiKey });
        }

        const ApiKey = crypto.randomBytes(15).toString('hex');

        const updatedUser = await User.findOneAndUpdate(
            { UserName },
            { ApiKey },
            { new: true, runValidators: true }
        );

        return res.json({ success: true, data: updatedUser.ApiKey });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Failed to generate API key' });
    }
});


// export const forwardUrl = async (req, res) => {
//     const { target } = req.body;

//     // Validate the target URL
//     if (!target || !target.startsWith('http')) {
//         return res.status(400).json({ success: false, message: 'Invalid target URL' });
//     }

//     try {
//         // Create an HTTPS agent to enforce TLS settings
//         const agent = new https.Agent({
//             rejectUnauthorized: false, // Disable certificate validation (useful in dev environments)
//             secureProtocol: 'TLSv1_2_method' // Enforce TLS 1.2 (or another version if needed)
//         });

//         // Configure axios request
//         const axiosConfig = {
//             method: req.method,
//             url: target,
//             headers: req.headers,
//             data: ['POST', 'PUT'].includes(req.method) ? req.body : undefined,
//             responseType: 'stream',
//             httpsAgent: agent, // Apply the custom agent
//         };

//         // Make the request to the target URL
//         const response = await axios(axiosConfig);

//         // Forward the response status, headers, and data
//         res.status(response.status);
//         response.headers['content-length'] && res.set('Content-Length', response.headers['content-length']);
//         response.data.pipe(res);

//     } catch (error) {
//         console.error('Error processing request:', error.message);
//         res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
// };



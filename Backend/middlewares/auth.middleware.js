const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blackListTokenModel = require('../models/blacklistToken.model');
const doctorModel = require('../models/doctor.model');

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token)
        return res.status(401).json({ message: 'Unauthorized access' });

    const isBlackListed = await blackListTokenModel.findOne({ token: token });
    if (isBlackListed) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }

        req.user = user;
        req.userModel = 'User'; // Set the user model
        return next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }
}

module.exports.authDoctor = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token)
        return res.status(401).json({ message: 'Unauthorized access' });
    const isBlackListed = await blackListTokenModel.findOne({ token: token });
    if (isBlackListed) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const doctor = await doctorModel.findById(decoded._id);

        if (!doctor) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }

        req.doctor = doctor;
        req.userModel = 'Doctor'; // Set the doctor model
        return next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }
}
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Route to send a message from doctor to patient
router.post('/send-message-from-doctor-to-patient', authMiddleware.authDoctor, messageController.sendMessageFromDoctorToPatient);

// Route to send a message from patient to doctor
router.post('/send', authMiddleware.authUser, messageController.sendMessageFromUserToDoctor);

// Route to get messages between a doctor and a patient
router.get('/conversation/:patientId', authMiddleware.authDoctor, messageController.getConversation);

// Route to get messages between a user and a doctor
router.get('/conversation-with-doctor/:doctorId', authMiddleware.authUser, messageController.getConversationWithDoctor);

module.exports = router;
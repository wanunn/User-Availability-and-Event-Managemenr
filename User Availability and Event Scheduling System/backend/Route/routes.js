const express = require('express');
const router = express.Router();
const { 
    saveAvailability, 
    getAvailability, 
    deleteAvailability, 
    getAllUserAvailabilities, 
    scheduleSession, 
    getSessions, 
    updateSession ,
    getAvailabilityById,
    updateAvailability
} = require('../Ctrl/EventCtrl');
const {registerUser,loginUser,getprofile, getUsers} = require('../Ctrl/UserCtrl');

// Middleware for authentication (adjust as per your auth strategy)
const Userauth = require('../Middleware/userauth');
const adminauth = require('../Middleware/adminauth'); // Admin-specific authentication

// Route to add or update user availability (authenticated user)
router.get('/users/events/',adminauth, getAllUserAvailabilities);

router.post('/event', Userauth, saveAvailability);

// Route to get availability for the current user (authenticated user)
router.get('/event/get', Userauth, getAvailability);

// Route to delete user availability (authenticated user)
router.delete('/event/delete/:eventId', Userauth, deleteAvailability);

// Route to view availability for all users (admin only)
router.get('/events', adminauth, getAllUserAvailabilities);

// Route to schedule a session for a user (admin only)
router.post('/schedule/:eventId', adminauth, scheduleSession);

// Route to get all upcoming sessions for a user (authenticated user or admin)
router.get('/sessions', Userauth, getSessions);

// Route to reschedule or cancel a session (authenticated user)
router.put('/session/update', Userauth, updateSession);
 router.get('/event/:eventId', Userauth, getAvailabilityById);

router.put('/event/update/:eventId', Userauth, updateAvailability);



//Users Controller
router.post('/user/register', registerUser);
router.post('/user/login', loginUser);
router.get('/profile',Userauth,getprofile);
router.get('/users',adminauth,getUsers);
module.exports = router;

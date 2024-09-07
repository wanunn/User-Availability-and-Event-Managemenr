const mongoose = require('mongoose');
const Event = require('../Model/Event'); // Adjust the path as needed

// Add or update user availability
exports.saveAvailability = async (req, res) => {
    try {
        const {title, start, end, duration, scheduledSlots } = req.body;
        const userEmail = req.user.email;

        // Basic validation
        if (!start || !end || !duration,!title) {
            return res.status(400).json({ success: false, message: 'Start, end, and duration are required' });
        }

        if (new Date(start) >= new Date(end)) {
            return res.status(400).json({ success: false, message: 'End time must be after start time' });
        }

        const event = await Event.findOneAndUpdate(
            { user: userEmail,title, start, end },
            { duration, scheduledSlots },
            { new: true, upsert: true }
        );

        res.status(200).json({ success: true, event });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
// Update user availability
exports.updateAvailability = async (req, res) => {
    try {
        const { eventId } = req.params;
        const { title, start, end, duration, scheduledSlots } = req.body;
        const userEmail = req.user.email;

        // Basic validation
        if (!start || !end || !duration) {
            return res.status(400).json({ success: false, message: 'Start, end, and duration are required' });
        }

        if (new Date(start) >= new Date(end)) {
            return res.status(400).json({ success: false, message: 'End time must be after start time' });
        }

        const event = await Event.findOneAndUpdate(
            { _id: eventId, user: userEmail },
            { title, start, end, duration, scheduledSlots },
            { new: true }
        );

        res.status(200).json({ success: true, event });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
// Get availability for the current user
exports.getAvailability = async (req, res) => {
    try {
        const userEmail = req.user.email;
        const events = await Event.find({ user: userEmail });

        res.status(200).json({ success: true, events });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get availability for current user by availability ID
exports.getAvailabilityById = async (req, res) => {
    try {
        const { eventId } = req.params;
        const userEmail = req.user.email;
        const event = await Event.findOne({ _id: eventId, user: userEmail });

        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }

        res.status(200).json({ success: true, event });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}



// Delete user availability
exports.deleteAvailability = async (req, res) => {
    try {
        const { eventId } = req.params;
        const userEmail = req.user.email;

        // Basic validation
        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            return res.status(400).json({ success: false, message: 'Invalid event ID' });
        }

        const result = await Event.deleteOne({ _id: eventId, user: userEmail });

        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }

        res.status(200).json({ success: true, message: 'Event deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// View availability for all users
exports.getAllUserAvailabilities = async (req, res) => {
    try {
        const events = await Event.find();

        res.status(200).json({ success: true, events });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Schedule a session for a user
exports.scheduleSession = async (req, res) => {
    try {
      const {eventId} = req.params;
      const {slot} = req.body;
     const  response = await Event.findOneAndUpdate(
      {_id:eventId},
      {$push:{scheduledSlots:slot}},
      {new:true}
     )
      
   if(!response){
      return res.status(404).json({ success: false, message: 'Event not found' });
   }

        res.status(200).json({ success: true, response });
    } catch (error) {
       
    }
};

// Get all upcoming sessions for a user or admin
exports.getSessions = async (req, res) => {
    try {
        const userEmail = req.user.email;
        const events = await Event.find({ 'scheduledSlots.attendees.email': userEmail });

        res.status(200).json({ success: true, events });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Reschedule or cancel a session
exports.updateSession = async (req, res) => {
    try {
        const { eventId, slotId, newStart, newEnd, cancel } = req.body;
        const userEmail = req.user.email;

        if (!eventId || !slotId || (!cancel && (!newStart || !newEnd))) {
            return res.status(400).json({ success: false, message: 'Event ID, slot ID, and new start/end are required, unless cancelling.' });
        }

        const event = await Event.findOne({ _id: eventId, 'scheduledSlots._id': slotId, 'scheduledSlots.attendees.email': userEmail });

        if (!event) {
            return res.status(404).json({ success: false, message: 'Session not found' });
        }

        const slot = event.scheduledSlots.id(slotId);

        if (cancel) {
            slot.remove(); // Remove the slot if cancelling
        } else {
            slot.start = newStart;
            slot.end = newEnd;
        }

        await event.save();
        res.status(200).json({ success: true, event });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

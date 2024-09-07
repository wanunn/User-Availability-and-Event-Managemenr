const mongoose = require('mongoose');

// Sub-schema for attendees in scheduled slots
const AttendeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

// Sub-schema for scheduled slots
const SlotSchema = new mongoose.Schema({
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  attendees: {
    type: [AttendeeSchema], // Array of attendees for this slot
    required: false, // Optional, as slots may be created without attendees initially
  },
});

// Schema for the main event
const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  user: {
    type: String, // Email of the user
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number, // Duration in minutes
    required: true,
  },
  scheduledSlots: {
    type: [SlotSchema], // Array of slots for the event
    required: false, // Optional, as slots may be added later
  },
});

module.exports = mongoose.model('Event', EventSchema);

const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  mentorName: String,
  title: String,
  companyName: String,
  description: String,
  certificate: String,
  startDate: Date,
  endDate: Date,
});

module.exports = mongoose.model('Internship', internshipSchema);

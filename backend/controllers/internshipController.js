const Internship = require('../models/Internship');

exports.createInternship = async (req, res) => {
  try {
    const { mentorName, title, description, companyName, startDate, endDate } = req.body;
    const certificate = req.file?.filename || '';

    const internship = await Internship.create({
      student: req.user._id,
      mentorName,
      title,
      companyName,
      description,
      certificate,
      startDate,
      endDate,
    });

    res.status(201).json(internship);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getInternships = async (req, res) => {
  try {
    const query = req.user.role === 'student'
      ? { student: req.user._id }
      : {};
    const data = await Internship.find(query).populate('student', 'name email');
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateInternship = async (req, res) => {
  try {
    const updated = await Internship.findOneAndUpdate(
      { _id: req.params.id, student: req.user._id },
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteInternship = async (req, res) => {
  try {
    await Internship.findOneAndDelete({ _id: req.params.id, student: req.user._id });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

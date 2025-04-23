const express = require('express');
const {
  createInternship, getInternships, updateInternship, deleteInternship
} = require('../controllers/internshipController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const router = express.Router();

router.post('/', auth, upload.single('certificate'), createInternship);
router.get('/', auth, getInternships);
router.put('/:id', auth, updateInternship);
router.delete('/:id', auth, deleteInternship);

module.exports = router;

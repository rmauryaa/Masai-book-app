const Review = require('../models/Review');
const User = require('../models/User');

exports.getReviewsForBook = async (req, res) => {
  try {
    const reviews = await Review.find({ bookId: req.params.id }).populate('userId', 'username');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
exports.addReview = async (req, res) => {
  try {
    const { reviewText, rating } = req.body;
    const userId = req.user.id; 
    const bookId = req.params.id;

  
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
    const user = rows[0];

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newReview = new Review({
      bookId,
      userId,
      reviewText,
      rating,
    });

    await newReview.save();

    res.status(201).json({ message: 'Review added successfully', review: newReview });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
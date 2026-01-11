import { Gig } from '../models/gig.model.js';

// @desc    Get all open gigs
// @route   GET /api/gigs
// @access  Public
export const getGigs = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          title: {
            $regex: req.query.search,
            $options: 'i',
          },
        }
      : {};

    const gigs = await Gig.find({ ...keyword, status: 'open' }).populate('ownerId', 'name email');

    res.json(gigs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new gig
// @route   POST /api/gigs
// @access  Private
export const createGig = async (req, res) => {
  const { title, description, budget } = req.body;

  if (!title || !description || !budget) {
     return res.status(400).json({ message: 'Please fill in all fields' });
  }

  try {
    const gig = new Gig({
      title,
      description,
      budget,
      ownerId: req.user._id,
    });

    const createdGig = await gig.save();
    res.status(201).json(createdGig);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

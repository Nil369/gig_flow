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

// @desc    Get my gigs
// @route   GET /api/gigs/my-gigs
// @access  Private
export const getMyGigs = async (req, res) => {
  try {
    const gigs = await Gig.find({ ownerId: req.user._id }).populate('ownerId', 'name email').sort({ createdAt: -1 });
    res.json({ gigs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get gig by ID
// @route   GET /api/gigs/:id
// @access  Public
export const getGigById = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id).populate('ownerId', 'name email');
    
    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }

    res.json({ gig });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

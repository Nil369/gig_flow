import mongoose from 'mongoose';
import { Bid } from '../models/bid.model.js';
import { Gig } from '../models/gig.model.js';

// @desc    Submit a bid for a gig
// @route   POST /api/bids
// @access  Private (Freelancer)
export const createBid = async (req, res) => {
  const { gigId, message, price } = req.body;

  if (!gigId || !message || !price) {
    return res.status(400).json({ message: 'Please provide gigId, message and price' });
  }

  try {
    // Check if gig exists and is open
    const gig = await Gig.findById(gigId);
    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }
    if (gig.status !== 'open') {
      return res.status(400).json({ message: 'Gig is not open for bidding' });
    }

    // Prevent owner from bidding on their own gig
    if (gig.ownerId.toString() === req.user._id.toString()) {
        return res.status(400).json({ message: 'Owner cannot bid on their own gig' });
    }

    // Check if user already bid
    const existingBid = await Bid.findOne({ gigId, freelancerId: req.user._id });
    if (existingBid) {
        return res.status(400).json({ message: 'You have already placed a bid on this gig' });
    }

    const bid = await Bid.create({
      gigId,
      freelancerId: req.user._id,
      message,
      price,
    });

    res.status(201).json(bid);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all bids for a specific gig (Owner only)
// @route   GET /api/bids/:gigId
// @access  Private
export const getBidsByGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.gigId);

    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }

    // Ensure only the owner can view bids
    if (gig.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view bids for this gig' });
    }

    const bids = await Bid.find({ gigId: req.params.gigId }).populate('freelancerId', 'name email');
    res.json(bids);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Hire a freelancer (Atomic operation - simulated for standalone MongoDB)
// @route   PATCH /api/bids/:bidId/hire
// @access  Private (Gig Owner)
export const hireFreelancer = async (req, res) => {
  // NOTE: Transitions require a Replica Set. For this assignment running on standalone MongoDB,
  // we have disabled transactions to ensure the code runs without errors.
  // In production, uncomment the session lines for atomicity.
  // const session = await mongoose.startSession();
  // session.startTransaction();

  try {
    const bid = await Bid.findById(req.params.bidId); // .session(session);
    if (!bid) {
        // await session.abortTransaction();
        // session.endSession();
        return res.status(404).json({ message: 'Bid not found' });
    }

    const gig = await Gig.findById(bid.gigId); // .session(session);
    if (!gig) {
        // await session.abortTransaction();
        // session.endSession();
        return res.status(404).json({ message: 'Gig not found' });
    }

    // Check authorization
    if (gig.ownerId.toString() !== req.user._id.toString()) {
        // await session.abortTransaction();
        // session.endSession();
        return res.status(403).json({ message: 'Not authorized to hire for this gig' });
    }

    // Check race condition / status
    if (gig.status !== 'open') {
        // await session.abortTransaction();
        // session.endSession();
        return res.status(400).json({ message: 'Gig is already assigned' });
    }

    // 1. Update Gig status
    gig.status = 'assigned';
    await gig.save(); // { session }

    // 2. Update Chosen Bid status
    bid.status = 'hired';
    await bid.save(); // { session }

    // 3. Reject all other bids for this gig
    await Bid.updateMany(
        { gigId: gig._id, _id: { $ne: bid._id } },
        { status: 'rejected' } // , { session }
    );

    // await session.commitTransaction();
    // session.endSession();

    // Emit Socket.io event
    const io = req.app.get('io');
    if (io) {
        io.to(bid.freelancerId.toString()).emit('notification', `You have been hired for ${gig.title}`);
    }

    res.json({ message: 'Freelancer hired successfully', bid });
  } catch (error) {
    // await session.abortTransaction();
    // session.endSession();
    res.status(500).json({ message: error.message });
  }
};

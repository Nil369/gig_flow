import mongoose from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     Bid:
 *       type: object
 *       required:
 *         - gigId
 *         - freelancerId
 *         - message
 *         - price
 *       properties:
 *         gigId:
 *           type: string
 *           format: uuid
 *           description: The ID of the gig
 *         freelancerId:
 *           type: string
 *           format: uuid
 *           description: The ID of the freelancer
 *         message:
 *           type: string
 *           description: Bid proposal message
 *         price:
 *           type: number
 *           description: Proposed price
 *         status:
 *           type: string
 *           enum: [pending, hired, rejected]
 *           default: pending
 *           description: Bid status
 *       example:
 *         gigId: 60d0fe4f5311236168a109ca
 *         freelancerId: 60d0fe4f5311236168a109cb
 *         message: I can do this in 2 days.
 *         price: 450
 *         status: pending
 */
const bidSchema = new mongoose.Schema(
  {
    gigId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Gig',
      required: true,
    },
    freelancerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'hired', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export const Bid = mongoose.model('Bid', bidSchema);

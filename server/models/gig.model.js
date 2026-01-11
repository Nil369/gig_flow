import mongoose from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     Gig:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - budget
 *         - ownerId
 *       properties:
 *         title:
 *           type: string
 *           description: Job title
 *         description:
 *           type: string
 *           description: detailed description
 *         budget:
 *           type: number
 *           description: Budget amount
 *         ownerId:
 *           type: string
 *           format: uuid
 *           description: The user ID of the owner
 *         status:
 *           type: string
 *           enum: [open, assigned]
 *           default: open
 *           description: Gig status
 *       example:
 *         title: Build a React App
 *         description: I need a developer to build a portfolio.
 *         budget: 500
 *         ownerId: 60d0fe4f5311236168a109ca
 *         status: open
 */
const gigSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['open', 'assigned'],
      default: 'open',
    },
  },
  { timestamps: true }
);

// Index for search
gigSchema.index({ title: 'text' });

export const Gig = mongoose.model('Gig', gigSchema);

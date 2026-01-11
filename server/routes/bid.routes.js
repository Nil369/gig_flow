import express from 'express';
import { createBid, getBidsByGig, hireFreelancer, getMyBids } from '../controllers/bid.controller.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Bids
 *   description: Bidding process management
 */

/**
 * @swagger
 * /api/bids:
 *   post:
 *     summary: Submit a bid for a gig
 *     tags: [Bids]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - gigId
 *               - message
 *               - price
 *             properties:
 *               gigId:
 *                 type: string
 *                 description: The unique ID of the Gig you want to bid on (Copy this from the GET /gigs response)
 *               message:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Bid submitted successfully
 *       400:
 *         description: Invalid data, gig not open, or self-bidding
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Gig not found
 *       500:
 *         description: Server error
 */
router.post('/', protect, createBid);

/**
 * @swagger
 * /api/bids/my-bids:
 *   get:
 *     summary: Get my submitted bids
 *     tags: [Bids]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of my bids
 *       401:
 *         description: Not authorized
 */
router.get('/my-bids', protect, getMyBids);

/**
 * @swagger
 * /api/bids/{gigId}:
 *   get:
 *     summary: Get all bids for a specific gig (Owner only)
 *     tags: [Bids]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: gigId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the gig
 *     responses:
 *       200:
 *         description: List of bids for the gig
 *       403:
 *         description: Not authorized to view bids
 *       404:
 *         description: Gig not found
 *       500:
 *         description: Server error
 */
router.get('/:gigId', protect, getBidsByGig);

/**
 * @swagger
 * /api/bids/{bidId}/hire:
 *   patch:
 *     summary: Hire a freelancer for a bid
 *     tags: [Bids]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: bidId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the bid to hire
 *     responses:
 *       200:
 *         description: Freelancer hired successfully
 *       400:
 *         description: Gig already assigned or race condition
 *       403:
 *         description: Not authorized to hire
 *       404:
 *         description: Bid or Gig not found
 *       500:
 *         description: Server error
 */
router.patch('/:bidId/hire', protect, hireFreelancer);

export default router;

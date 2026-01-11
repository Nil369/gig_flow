import express from 'express';
import { getGigs, createGig, getMyGigs, getGigById } from '../controllers/gig.controller.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Gigs
 *   description: Gig management
 */

/**
 * @swagger
 * /api/gigs:
 *   get:
 *     summary: Get all open gigs (with optional search)
 *     tags: [Gigs]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search keyword for gig titles
 *     responses:
 *       200:
 *         description: List of open gigs
 *       500:
 *         description: Server error
 */
router.get('/', getGigs);

/**
 * @swagger
 * /api/gigs:
 *   post:
 *     summary: Create a new gig
 *     tags: [Gigs]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - budget
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               budget:
 *                 type: number
 *     responses:
 *       201:
 *         description: Gig created successfully
 *       400:
 *         description: Missing fields
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Server error
 */
router.post('/', protect, createGig);

/**
 * @swagger
 * /api/gigs/my-gigs:
 *   get:
 *     summary: Get my posted gigs
 *     tags: [Gigs]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of my gigs
 *       401:
 *         description: Not authorized
 */
router.get('/my-gigs', protect, getMyGigs);

/**
 * @swagger
 * /api/gigs/:id:
 *   get:
 *     summary: Get a single gig by ID
 *     tags: [Gigs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Gig details
 *       404:
 *         description: Gig not found
 */
router.get('/:id', getGigById);

export default router;

import express from 'express';
import * as magicItem from '../controllers/magicItemController';

const router = express.Router();

/**
 * @swagger
 * /api/magicitems/{id}:
 *   get:
 *     summary: Retrieve a Magic Item by ID
 *     tags: [Magic Item]
 *     description: Fetches a specific Magic Item using its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the Magic Item to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the Magic Item.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 weight:
 *                   type: number
 *       404:
 *         description: Magic Item not found.
 *       500:
 *         description: Server error occurred.
 */
router.get('/:id', magicItem.getItemById);

/**
 * @swagger
 * /api/magicitems/add:
 *   post:
 *     summary: Add a new Magic Item
 *     tags: [Magic Item]
 *     description: Creates a new Magic Item and adds it to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the Magic Item.
 *               weight:
 *                 type: number
 *                 description: The weight of the Magic Item.
 *     responses:
 *       201:
 *         description: Successfully created a new Magic Item.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 weight:
 *                   type: number
 *       400:
 *         description: Invalid data or creation failed.
 *       500:
 *         description: Server error occurred.
 */
router.post('/add', magicItem.addMagicItem);

export default router;

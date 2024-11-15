import express from 'express';
import * as magicMover from '../controllers/magicMoverController';


const router = express.Router();
/**
 * @swagger
 * /api/magicmovers/{id}:
 *   get:
 *     summary: Fetches a Magic Mover by its ID.
 *     tags: [Magic Movers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the Magic Mover.
 *     responses:
 *       200:
 *         description: Magic Mover found and returned.
 *       404:
 *         description: Magic Mover not found.
 *       500:
 *         description: Failed to fetch mover.
 */
router.get('/mover/:id', magicMover.getMoverById);

/**
 * @swagger
 * /api/magicmovers/start/{id}:
 *   post:
 *     summary: Starts a mission for a Magic Mover.
 *     tags: [Magic Movers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the Magic Mover.
 *     responses:
 *       200:
 *         description: Mission started successfully.
 *       400:
 *         description: Cannot start mission.
 *       404:
 *         description: Magic Mover not found.
 *       500:
 *         description: Failed to start mission.
 */
router.get('/start-mission/:id', magicMover.startMission);

/**
 * @swagger
 * /api/magicmovers/end/{id}:
 *   post:
 *     summary: Ends a mission for a Magic Mover.
 *     tags: [Magic Movers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the Magic Mover.
 *     responses:
 *       200:
 *         description: Mission ended successfully.
 *       400:
 *         description: Cannot end mission.
 *       404:
 *         description: Magic Mover not found.
 *       500:
 *         description: Failed to end mission.
 */
router.get('/end-mission/:id', magicMover.endMission);

/**
 * @swagger
 * /api/magicmovers/leaderboard:
 *   get:
 *     summary: Retrieves the top Magic Movers sorted by mission count.
 *     tags: [Magic Movers]
 *     responses:
 *       200:
 *         description: List of top Magic Movers returned successfully.
 *       500:
 *         description: Failed to fetch top movers.
 */
router.get('/leaderboard', magicMover.getTopMovers);

/**
 * @swagger
 * /api/magicmovers/add:
 *   post:
 *     summary: Add a new Magic Mover
 *     tags: [Magic Movers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - weightLimit
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the mover
 *               weightLimit:
 *                 type: integer
 *                 description: The maximum weight limit the mover can carry
 *     responses:
 *       201:
 *         description: Mover added successfully
 *       400:
 *         description: Could not create Magic Mover
 */
router.post('/add', magicMover.addMagicMover);

/**
 * @swagger
 * /api/magicmovers/load/{id}:
 *   post:
 *     summary: Loads items into a Magic Mover.
 *     tags: [Magic Movers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the Magic Mover.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemNames:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Items loaded successfully.
 *       400:
 *         description: Error loading items.
 *       404:
 *         description: Magic Mover or items not found.
 *       500:
 *         description: Failed to load items.
 */
router.post('/load/:id', magicMover.loadMagicMover);

export default router;

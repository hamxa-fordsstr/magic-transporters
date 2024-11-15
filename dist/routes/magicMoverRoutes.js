"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const magicMover = __importStar(require("../controllers/magicMoverController"));
const router = express_1.default.Router();
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
exports.default = router;

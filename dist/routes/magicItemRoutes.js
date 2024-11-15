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
const magicItem = __importStar(require("../controllers/magicItemController"));
const router = express_1.default.Router();
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
exports.default = router;

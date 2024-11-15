"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTopMovers = exports.endMission = exports.startMission = exports.loadMagicMover = exports.addMagicMover = exports.getMoverById = void 0;
const MagicMover_1 = __importDefault(require("../models/MagicMover"));
const MagicItem_1 = __importDefault(require("../models/MagicItem"));
const MoverLog_1 = __importDefault(require("../models/MoverLog"));
/**
 * Fetches a Magic Mover by its ID.
 *
 * @param {Request} req - HTTP request object, expected to contain the mover ID in the route parameters.
 * @param {Response} res - HTTP response object for sending the mover details or an error message.
 * @returns {Promise<void>} - Sends the Magic Mover details if found, otherwise an error message.
 */
const getMoverById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const moverId = req.params.id;
        const mover = yield MagicMover_1.default.findById(moverId);
        if (mover) {
            res.status(200).json(mover);
        }
        else {
            res.status(404).json({ error: 'Magic Mover not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch mover' });
    }
});
exports.getMoverById = getMoverById;
/**
 * Adds a new Magic Mover to the database.
 *
 * @param {Request} req - HTTP request object, expected to contain the mover's name and weight limit in the body.
 * @param {Response} res - HTTP response object for sending back the created mover or an error message.
 * @returns {Promise<void>} - Sends the newly created Magic Mover on success, otherwise an error message.
 */
const addMagicMover = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, weightLimit } = req.body;
        const newMover = new MagicMover_1.default({ name, weightLimit });
        yield newMover.save();
        res.status(201).json(newMover);
    }
    catch (error) {
        res.status(400).json({ error: 'Could not create Magic Mover', details: error });
    }
});
exports.addMagicMover = addMagicMover;
/**
 * Loads items into a Magic Mover if it's in a valid state.
 *
 * @param {Request} req - HTTP request object, expected to contain the mover ID in the route parameters and item names in the body.
 * @param {Response} res - HTTP response object for sending the result or an error message.
 * @returns {Promise<void>} - Sends a success message if items were loaded, otherwise an error message.
 */
const loadMagicMover = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const moverId = req.params.id;
        const { itemNames } = req.body;
        const mover = yield MagicMover_1.default.findById(moverId);
        if (!mover) {
            res.status(404).json({ error: 'Magic Mover not found' });
            return;
        }
        if (mover.state !== 'loading' && mover.state !== 'resting') {
            res.status(400).json({ error: 'Cannot load items while on-mission' });
            return;
        }
        const items = yield MagicItem_1.default.find({ 'name': { $in: itemNames } });
        if (items.length !== itemNames.length) {
            res.status(404).json({ error: 'One or more items not found' });
            return;
        }
        const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
        if (totalWeight > mover.weightLimit) {
            res.status(400).json({ error: 'Items exceed weight limit' });
            return;
        }
        mover.state = 'loading';
        yield mover.save();
        const currentTimestamp = new Date().toISOString();
        const newMoverLog = new MoverLog_1.default({
            moverName: mover.name,
            state: mover.state,
            itemNames: itemNames,
            timestamp: currentTimestamp
        });
        yield newMoverLog.save();
        res.status(200).json({ message: 'Items loaded successfully', mover });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to load items', details: error });
    }
});
exports.loadMagicMover = loadMagicMover;
/**
 * Starts a mission for a Magic Mover if it's in the loading state.
 *
 * @param {Request} req - HTTP request object, expected to contain the mover ID in the route parameters.
 * @param {Response} res - HTTP response object for sending the mission start result or an error message.
 * @returns {Promise<void>} - Sends a success message if mission started, otherwise an error message.
 */
const startMission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const moverId = req.params.id;
        const mover = yield MagicMover_1.default.findById(moverId);
        if (!mover) {
            res.status(404).json({ error: 'Magic Mover not found' });
            return;
        }
        if (mover.state !== 'loading') {
            res.status(400).json({ error: 'Cannot start mission unless in loading state' });
            return;
        }
        mover.state = 'on-mission';
        mover.missionCount += 1;
        yield mover.save();
        const currentTimestamp = new Date().toISOString();
        const newMoverLog = new MoverLog_1.default({
            moverName: mover.name,
            state: mover.state,
            timestamp: currentTimestamp
        });
        yield newMoverLog.save();
        res.status(200).json({ message: 'Mission started', mover });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to start mission', details: error });
    }
});
exports.startMission = startMission;
/**
 * Ends a mission for a Magic Mover if it's in the on-mission state.
 *
 * @param {Request} req - HTTP request object, expected to contain the mover ID in the route parameters.
 * @param {Response} res - HTTP response object for sending the mission end result or an error message.
 * @returns {Promise<void>} - Sends a success message if mission ended, otherwise an error message.
 */
const endMission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const moverId = req.params.id;
        const mover = yield MagicMover_1.default.findById(moverId);
        if (!mover) {
            res.status(404).json({ error: 'Magic Mover not found' });
            return;
        }
        if (mover.state !== 'on-mission') {
            res.status(400).json({ error: 'Cannot end mission unless in on-mission state' });
            return;
        }
        mover.state = 'resting';
        yield mover.save();
        const currentTimestamp = new Date().toISOString();
        const newMoverLog = new MoverLog_1.default({
            moverName: mover.name,
            state: mover.state,
            timestamp: currentTimestamp
        });
        yield newMoverLog.save();
        res.status(200).json({ message: 'Mission ended and items unloaded', mover });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to end mission', details: error });
    }
});
exports.endMission = endMission;
/**
 * Retrieves the top movers sorted by their mission count in descending order.
 *
 * @param {Request} req - HTTP request object.
 * @param {Response} res - HTTP response object for sending back the sorted movers or an error message.
 * @returns {Promise<void>} - Sends the list of top movers on success, otherwise an error message.
 */
const getTopMovers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const topMovers = yield MagicMover_1.default.find().sort({ missionCount: -1 });
        res.status(200).json(topMovers);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch top movers' });
    }
});
exports.getTopMovers = getTopMovers;

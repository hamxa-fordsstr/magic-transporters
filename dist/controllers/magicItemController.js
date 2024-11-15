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
exports.addMagicItem = exports.getItemById = void 0;
const MagicItem_1 = __importDefault(require("../models/MagicItem"));
/**
 * Fetches a Magic Item by its ID.
 *
 * @param {Request} req - HTTP request object, expected to contain the item ID as a route parameter.
 * @param {Response} res - HTTP response object for sending back the retrieved item or an error.
 * @returns {Promise<void>} - Sends the Magic Item if found, otherwise an error message.
 */
const getItemById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemId = req.params.id;
        const item = yield MagicItem_1.default.findById(itemId);
        if (item) {
            res.status(200).json(item);
        }
        else {
            res.status(404).json({ error: 'Magic Item not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch Item' });
    }
});
exports.getItemById = getItemById;
/**
 * Adds a new Magic Item to the database.
 *
 * @param {Request} req - HTTP request object, expected to contain the item name and weight in the body.
 * @param {Response} res - HTTP response object for sending back the created item or an error.
 * @returns {Promise<void>} - Sends the newly created Magic Item on success, otherwise an error message.
 */
const addMagicItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, weight } = req.body;
        const newItem = new MagicItem_1.default({ name, weight });
        yield newItem.save();
        res.status(201).json(newItem);
    }
    catch (error) {
        res.status(400).json({ error: 'Could not create Magic Item', details: error });
    }
});
exports.addMagicItem = addMagicItem;

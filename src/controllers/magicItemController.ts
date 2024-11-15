import { Request, Response, RequestHandler } from 'express';
import MagicItem from '../models/MagicItem';

/**
 * Fetches a Magic Item by its ID.
 *
 * @param {Request} req - HTTP request object, expected to contain the item ID as a route parameter.
 * @param {Response} res - HTTP response object for sending back the retrieved item or an error.
 * @returns {Promise<void>} - Sends the Magic Item if found, otherwise an error message.
 */
export const getItemById: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const itemId = req.params.id;
    const item = await MagicItem.findById(itemId);
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ error: 'Magic Item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Item' });
  }
};

/**
 * Adds a new Magic Item to the database.
 *
 * @param {Request} req - HTTP request object, expected to contain the item name and weight in the body.
 * @param {Response} res - HTTP response object for sending back the created item or an error.
 * @returns {Promise<void>} - Sends the newly created Magic Item on success, otherwise an error message.
 */
export const addMagicItem: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, weight } = req.body;
    const newItem = new MagicItem({ name, weight });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error: 'Could not create Magic Item', details: error });
  }
};

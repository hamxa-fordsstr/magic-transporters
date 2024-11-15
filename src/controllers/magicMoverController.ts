import { Request, Response, RequestHandler } from 'express';
import MagicMover from '../models/MagicMover';
import MagicItem from '../models/MagicItem';
import MoverLog from '../models/MoverLog';

/**
 * Fetches a Magic Mover by its ID.
 *
 * @param {Request} req - HTTP request object, expected to contain the mover ID in the route parameters.
 * @param {Response} res - HTTP response object for sending the mover details or an error message.
 * @returns {Promise<void>} - Sends the Magic Mover details if found, otherwise an error message.
 */
export const getMoverById: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const moverId = req.params.id;
    const mover = await MagicMover.findById(moverId);
    if (mover) {
      res.status(200).json(mover);
    } else {
      res.status(404).json({ error: 'Magic Mover not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch mover' });
  }
};

/**
 * Adds a new Magic Mover to the database.
 *
 * @param {Request} req - HTTP request object, expected to contain the mover's name and weight limit in the body.
 * @param {Response} res - HTTP response object for sending back the created mover or an error message.
 * @returns {Promise<void>} - Sends the newly created Magic Mover on success, otherwise an error message.
 */
export const addMagicMover: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, weightLimit } = req.body;
    const newMover = new MagicMover({ name, weightLimit });
    await newMover.save();
    res.status(201).json(newMover);
  } catch (error) {
    res.status(400).json({ error: 'Could not create Magic Mover', details: error });
  }
};

/**
 * Loads items into a Magic Mover if it's in a valid state.
 *
 * @param {Request} req - HTTP request object, expected to contain the mover ID in the route parameters and item names in the body.
 * @param {Response} res - HTTP response object for sending the result or an error message.
 * @returns {Promise<void>} - Sends a success message if items were loaded, otherwise an error message.
 */
export const loadMagicMover: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const moverId = req.params.id;
    const { itemNames } = req.body;

    const mover = await MagicMover.findById(moverId);
    if (!mover) {
      res.status(404).json({ error: 'Magic Mover not found' });
      return;
    }

    if (mover.state !== 'loading' && mover.state !== 'resting') {
      res.status(400).json({ error: 'Cannot load items while on-mission' });
      return;
    }

    const items = await MagicItem.find({ 'name': { $in: itemNames } });
    if (items.length !== itemNames.length) {
      res.status(404).json({ error: 'One or more items not found' });
      return;
    }

    const totalWeight = items.reduce((sum: number, item: { weight: number }) => sum + item.weight, 0);

    if (totalWeight > mover.weightLimit) {
      res.status(400).json({ error: 'Items exceed weight limit' });
      return;
    }

    mover.state = 'loading';
    await mover.save();

    const currentTimestamp = new Date().toISOString();
    const newMoverLog = new MoverLog({
      moverName: mover.name,
      state: mover.state,  
      itemNames: itemNames,
      timestamp: currentTimestamp
    });
    await newMoverLog.save();

    res.status(200).json({ message: 'Items loaded successfully', mover });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load items', details: error });
  }
};

/**
 * Starts a mission for a Magic Mover if it's in the loading state.
 *
 * @param {Request} req - HTTP request object, expected to contain the mover ID in the route parameters.
 * @param {Response} res - HTTP response object for sending the mission start result or an error message.
 * @returns {Promise<void>} - Sends a success message if mission started, otherwise an error message.
 */
export const startMission: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const moverId = req.params.id;

    const mover = await MagicMover.findById(moverId);
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
    await mover.save();

    const currentTimestamp = new Date().toISOString();
    const newMoverLog = new MoverLog({
      moverName: mover.name,
      state: mover.state,
      timestamp: currentTimestamp
    });
    await newMoverLog.save();

    res.status(200).json({ message: 'Mission started', mover });
  } catch (error) {
    res.status(500).json({ error: 'Failed to start mission', details: error });
  }
};

/**
 * Ends a mission for a Magic Mover if it's in the on-mission state.
 *
 * @param {Request} req - HTTP request object, expected to contain the mover ID in the route parameters.
 * @param {Response} res - HTTP response object for sending the mission end result or an error message.
 * @returns {Promise<void>} - Sends a success message if mission ended, otherwise an error message.
 */
export const endMission: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const moverId = req.params.id;

    const mover = await MagicMover.findById(moverId);
    if (!mover) {
      res.status(404).json({ error: 'Magic Mover not found' });
      return;
    }

    if (mover.state !== 'on-mission') {
      res.status(400).json({ error: 'Cannot end mission unless in on-mission state' });
      return;
    }

    mover.state = 'resting';
    await mover.save();

    const currentTimestamp = new Date().toISOString();
    const newMoverLog = new MoverLog({
      moverName: mover.name,
      state: mover.state,
      timestamp: currentTimestamp
    });
    await newMoverLog.save();

    res.status(200).json({ message: 'Mission ended and items unloaded', mover });
  } catch (error) {
    res.status(500).json({ error: 'Failed to end mission', details: error });
  }
};

/**
 * Retrieves the top movers sorted by their mission count in descending order.
 *
 * @param {Request} req - HTTP request object.
 * @param {Response} res - HTTP response object for sending back the sorted movers or an error message.
 * @returns {Promise<void>} - Sends the list of top movers on success, otherwise an error message.
 */
export const getTopMovers: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const topMovers = await MagicMover.find().sort({ missionCount: -1 });
    res.status(200).json(topMovers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch top movers' });
  }
};

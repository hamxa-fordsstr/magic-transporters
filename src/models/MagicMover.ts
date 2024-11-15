import mongoose, { Schema, Document } from 'mongoose';

export interface IMagicMover extends Document {
  name: string;
  weightLimit: number;
  state: 'resting' | 'loading' | 'on-mission';
  missionCount: number;
}

const MagicMoverSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  weightLimit: { type: Number, required: true },
  state: { type: String, enum: ['resting', 'loading', 'on-mission'], default: 'resting' },
  missionCount: { type: Number, default: 0 },
});

export default mongoose.model<IMagicMover>('MagicMover', MagicMoverSchema);
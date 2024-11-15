import mongoose, { Schema, Document } from 'mongoose';

export interface IMoverLog extends Document {
  moverName: string;
  state: string;
  itemNames: string[];
  timestamp: string;
}

const MoverLogSchema: Schema = new Schema({
  moverName: { type: String, required: true },
  state: { type: String, required: true },
  itemNames: { type: [String], required: false },
  timestamp: { type: String, required: true }
});

const MoverLog = mongoose.model<IMoverLog>('MoverLog', MoverLogSchema);
export default MoverLog;
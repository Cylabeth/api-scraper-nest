//Esquema para datos MongoDB
import * as mongoose from 'mongoose';

export const ScraperSchema = new mongoose.Schema({
  url: { type: String, required: true },
  title: { type: String, required: false, default: 'No title available' },
  imageUrl: { type: String, required: false },
  text: { type: String, required: false },
}, { timestamps: true });

export interface Data extends mongoose.Document {
  url: string;
  title?: string;
  imageUrl?: string;
  text?: string;
}
export const DataModel = mongoose.model<Data>('Data', ScraperSchema, 'Data');
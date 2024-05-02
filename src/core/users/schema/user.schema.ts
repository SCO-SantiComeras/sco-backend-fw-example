import { Schema } from 'mongoose';
import { IUser } from '../interface/iuser.interface';

export const USERS_SCHEMA = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);
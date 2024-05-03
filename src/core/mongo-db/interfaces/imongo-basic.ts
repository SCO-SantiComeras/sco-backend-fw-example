import { Model } from "mongoose";

export interface IMongoBasic {
    getModel(): Model<any>;
    findById(_id: string): Promise<any>;
}
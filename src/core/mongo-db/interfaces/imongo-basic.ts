import { Model, Schema } from "mongoose";

export interface IMongoBasic {
    createModel(model: string, schema: Schema<any>, table: string): Model<any>;
    getModel(): Model<any>;
    findById(_id: string): Promise<any>;
}
import { MongoDbService } from '../mongo-db/mongo-db.service';
import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { IUser } from "./interface/iuser.interface";
import { USERS_CONSTANTS } from "./constants/user.constants";
import { USERS_SCHEMA } from "./schema/user.schema";


@Injectable()
export class UsersService {

    public readonly USERS_CONSTANTS = USERS_CONSTANTS;

    private _UserModel: Model<IUser>;

    constructor(private readonly mongodbService: MongoDbService) { 
        this._UserModel = this.mongodbService.getModelBySchema(
            this.mongodbService.MONGODB_CONSTANTS.USERS.MODEL, 
            USERS_SCHEMA, 
            this.mongodbService.MONGODB_CONSTANTS.USERS.TABLE
        );
    }

    private async onModuleInit(): Promise<void> {
        const userValues: any[] = Object.values(this.USERS_CONSTANTS);
        if (!userValues || (userValues && userValues.length == 0)) {
            return;
        }
        
        for (const value of userValues) {
            if (!await this._UserModel.findOne({ name: value.NAME })) {
                const userCreated: IUser = await this._UserModel.create({
                    name: value.NAME,
                    email: value.EMAIL,
                });

                if (userCreated) {
                    console.log(`[Users] User '${value.NAME}' created successfully`);
                }
            }
        }
    }

    public async getModel(): Promise<Model<IUser>> {
        return this._UserModel;
    }

    public async findUser(_id): Promise<IUser> {
        try {
            return await this._UserModel.findOne({ _id: _id });
        } catch (error) {
            console.log(`[findUser] Error: ${JSON.stringify(error)}`);
            return undefined;
        }
    }

    public async findUserByName(name: string): Promise<IUser> {
        try {
          return await this._UserModel.findOne({ name: name });
        } catch (error) {
          console.log(`[findUserByName] Error: ${JSON.stringify(error)}`);
          return undefined;
        }
    }
    
    public async findUserByEmail(email: string): Promise<IUser> {
        try {
          return await this._UserModel.findOne({ email: email });
        } catch (error) {
          console.log(`[findUserByEmail] Error: ${JSON.stringify(error)}`);
          return undefined;
        }
    }
}

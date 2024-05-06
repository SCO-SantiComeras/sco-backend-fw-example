import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { IUser } from "./interface/iuser.interface";
import { USERS_SCHEMA } from "./schema/user.schema";
import { WebsocketsService } from '../../core/websockets/websockets.service';
import { IMongoBasic } from '../../core/mongo-db/interfaces/imongo-basic';
import { MongoDbService } from '../../core/mongo-db/mongo-db.service';
import { FileFunctionsService } from "sco-backend-fw";
import { USERS_CONSTANTS } from "./constants/user.constants";
import { USERS_ROUTES_NAMES, USERS_ROUTES_PATH } from "../../controller-routes/users.routes";
import { HttpErrorsService } from "../../core/shared/http-errors/http-errors.service";

@Injectable()
export class UsersService implements IMongoBasic {

    public readonly USERS_ROUTES_PATH = USERS_ROUTES_PATH;
    public readonly USERS_ROUTES_NAMES = USERS_ROUTES_NAMES;
    public readonly USERS_CONSTANTS = USERS_CONSTANTS;
    
    private _UserModel: Model<IUser>;

    constructor(
        private readonly fileFunctionsService: FileFunctionsService,
        private readonly mongodbService: MongoDbService,
        private readonly websocketsService: WebsocketsService,
        private readonly httpErrorsService: HttpErrorsService,
    ) { 
        this._UserModel = this.mongodbService.getModelBySchema(
            this.mongodbService.MONGODB_CONSTANTS.USERS.MODEL, 
            USERS_SCHEMA, 
            this.mongodbService.MONGODB_CONSTANTS.USERS.TABLE
        );
    }

     /* On Load Module (Populate) */
     private async onModuleInit(): Promise<void> {
        await this.fileFunctionsService.exec(
            this.USERS_ROUTES_PATH,
            this.USERS_ROUTES_NAMES.POPULATE,
            {},
            this.fileFunctionsService.createProviders(this.fileFunctionsService.getContextname(this), this),
        );
    }

    /* Mongodb */
    public getModel(): Model<IUser> {
        return this._UserModel;
    }

    public async findById(_id): Promise<IUser> {
        try {
            return await this._UserModel.findOne({ _id: _id });
        } catch (error) {
            console.log(`[findById] Error: ${JSON.stringify(error)}`);
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

    /* Websockets */
    public notifyWebsockets(): boolean {
        return this.websocketsService.notifyWebsockets(
            this.websocketsService.getEvent(this.USERS_ROUTES_PATH)
        );
    }
}

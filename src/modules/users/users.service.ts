import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { IUser } from "./interface/iuser.interface";
import { USERS_SCHEMA } from "./schema/user.schema";
import { WebsocketsService } from '../../core/websockets/websockets.service';
import { IWsNotificator } from '../../core/websockets/interfaces/iws-notificator.interface';
import { IMongoBasic } from '../../core/mongo-db/interfaces/imongo-basic';
import { MongoDbService } from '../../core/mongo-db/mongo-db.service';
import { FileFunctionsService, ProvidersService } from "sco-backend-fw";
import { USERS_CONSTANTS } from "./constants/user.constants";
import { USERS_ROUTES_NAMES, USERS_ROUTES_PATH } from "../../controller-routes/users.routes";

@Injectable()
export class UsersService implements IWsNotificator, IMongoBasic {

    private readonly USERS_ROUTES_PATH = USERS_ROUTES_PATH;
    private readonly USERS_ROUTES_NAMES = USERS_ROUTES_NAMES;
    private readonly USERS_CONSTANTS = USERS_CONSTANTS;
    
    private _UserModel: Model<IUser>;

    constructor(
        private readonly mongodbService: MongoDbService,
        private readonly websocketsService: WebsocketsService,
        private readonly fileFunctionsService: FileFunctionsService,
        private readonly providersService: ProvidersService,
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
            this.providersService.createProviders(this.providersService.getContextname(this), this),
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
    public getWebsocketEvent(): string {
        return this.websocketsService.WEBSOCKETS_CONSTANTS.WS_USERS;
    }

    public notifyWebsocketEvent(): boolean {
        return this.websocketsService.notifyWebsockets(this.getWebsocketEvent());
    }
}

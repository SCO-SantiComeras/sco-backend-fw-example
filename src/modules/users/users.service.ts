import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { FileFunctionsService } from 'sco-backend-fw';
import { IUser } from "./interface/iuser.interface";
import { USERS_SCHEMA } from "./schema/user.schema";
import { WebsocketsService } from '../../core/websockets/websockets.service';
import { HttpErrorsService } from '../../core/shared/http-errors/http-errors.service';
import { IWsNotificator } from '../../core/websockets/interfaces/iws-notificator.interface';
import { IMongoBasic } from '../../core/mongo-db/interfaces/imongo-basic';
import { MongoDbService } from '../../core/mongo-db/mongo-db.service';

@Injectable()
export class UsersService implements IWsNotificator, IMongoBasic {

    private _providers: any;
    private _UserModel: Model<IUser>;

    constructor(
        private readonly mongodbService: MongoDbService,
        private readonly websocketsService: WebsocketsService,
        private readonly httpErrorsService: HttpErrorsService,
        private readonly fileFunctionsService: FileFunctionsService,
    ) { 
        this._providers = {
            usersService: this,
            mongodbService: this.mongodbService,
            httpErrorsService: this.httpErrorsService,
            websocketsService: this.websocketsService,
            functionFilesService: this.fileFunctionsService,
        };

        this._UserModel = this.mongodbService.getModelBySchema(
            this.mongodbService.MONGODB_CONSTANTS.USERS.MODEL, 
            USERS_SCHEMA, 
            this.mongodbService.MONGODB_CONSTANTS.USERS.TABLE
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

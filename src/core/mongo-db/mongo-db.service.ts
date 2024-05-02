import { MONGODB_CONSTANTS } from './mongo-db.constants';
import { HTTP_ERRORS_CONSTANTS } from '../shared/http-errors/http-errors.constants';
import { Injectable } from '@nestjs/common';
import { MongoDbConfig } from './mongo-db-config';
import { ConfigService } from '@nestjs/config';
import * as mongoose from 'mongoose';

@Injectable()
export class MongoDbService {

  public readonly MONGODB_CONSTANTS = MONGODB_CONSTANTS;

  private _dbConnection: mongoose.Connection;
  private _options: MongoDbConfig;

  constructor(private readonly configService: ConfigService) {
    this._options = {
      enabled: this.configService.get('mongo.enabled') || false,
      ip: this.configService.get('mongo.ip') || 'localhost',
      port: this.configService.get('mongo.port') || 27017,
      database: this.configService.get('mongo.database') || 'sco-backend-fw-example',
      user: this.configService.get('mongo.user') || '',
      pass: this.configService.get('mongo.pass') || '',
    };

    if (!this._options) {
      console.error('[MongoDB] MongoDB options not provided');
      throw new Error(HTTP_ERRORS_CONSTANTS.MONGODB.MONGODB_OPTIONS_NOT_PROVIDED);
    }

    this.createConnectionDB(this._options);
  }

  async createConnectionDB(options: MongoDbConfig) {
    let url = `mongodb://${options.ip}:${options.port}/${options.database}`;
    if (options.user && options.pass) {
      url = `mongodb://${options.user}:${options.pass}@${options.ip}:${options.port}/${options.database}?authSource=admin`;
    }

    if (this._options.enabled) {
      this._dbConnection = mongoose.createConnection(url, {
        autoCreate: false,
        autoIndex: false,
      });

      this._dbConnection.once('open', () => {
        setTimeout(() => {
          console.log(`[MongoDB] Connected to ${options.database} successfully`);
        }, 100);
      });
  
      this._dbConnection.on('error', () => {
        setTimeout(() => {
          console.error(`[MongoDB] Error connecting to ${options.database}`);
        }, 100);
      });
    }
  }

  public getConnection(): mongoose.Connection {
    return this._dbConnection;
  }

  public getModel(model: string) {
    return this.getConnection().model<any>(model);
  }

  public getModelBySchema(model: string, schema: mongoose.Schema<any>, table: string) {
    return this.getConnection().model<any>(
      model, 
      schema, 
      table
    );
  }
}

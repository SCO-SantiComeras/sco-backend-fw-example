import { DynamicModule, Module } from '@nestjs/common';
import { MongoDbService } from './mongo-db.service';

@Module({
})
export class MongoDbModule {
  static register(): DynamicModule {
    return {
      module: MongoDbModule,
      providers: [
        MongoDbService,
      ],
      exports: [
        MongoDbService,
      ],
      global: true
    };
  }
}

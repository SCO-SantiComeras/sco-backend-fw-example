import { DynamicModule, Module, ModuleMetadata, Provider, Type } from "@nestjs/common";
import { WebsocketsConfig } from "./config/websockets-config";
import { WebsocketsService } from "./websockets.service";

interface WebsocketsConfigFactory {
  createWebsocketsConfig(): Promise<WebsocketsConfig> | WebsocketsConfig;
}

export interface WebsocketsAsyncConfig extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useExisting?: Type<WebsocketsConfigFactory>;
  useClass?: Type<WebsocketsConfigFactory>;
  useFactory?: (...args: any[]) => Promise<WebsocketsConfig> | WebsocketsConfig;
}

@Module({
  controllers: [],
  providers: [WebsocketsService],
  exports: [WebsocketsService],
})
export class WebsocketsModule {
  static register(options: WebsocketsConfig): DynamicModule {
    return {
      module: WebsocketsModule,
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
        WebsocketsService,
      ],
      exports: [WebsocketsService],
      global: true,
    };
  }

  public static registerAsync(options: WebsocketsAsyncConfig): DynamicModule {
    return {
      module: WebsocketsModule,
      providers: [WebsocketsService, ...this.createConnectProviders(options)],
      exports: [WebsocketsService],
      global: true,
    };
  }

  private static createConnectProviders(options: WebsocketsAsyncConfig): Provider[] {
    if (options.useFactory) {
      return [
        {
          provide: 'CONFIG_OPTIONS',
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
      ];
    }

    return [
      {
        provide: 'CONFIG_OPTIONS',
        useFactory: async (optionsFactory: WebsocketsConfigFactory) =>
          await optionsFactory.createWebsocketsConfig(),
        inject: [options.useExisting || options.useClass],
      },
    ];
  }
}

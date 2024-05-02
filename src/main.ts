import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from 'sco-backend-fw';
import { AppModule } from './app.module';
import { WebsocketsAdapter } from './core/websockets/adapter/websockets-adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, 
    { 
      logger: new LoggerService(),
    }
  );

  const configService = app.get<ConfigService>(ConfigService);

  if (configService.get('cors.enabled')) { 
    app.enableCors({
      origin: !configService.get("cors.origin")
        ? []
        : configService.get("cors.origin").split(','),
      credentials: true,
    });
  }

  if (configService.get('ws.enabled')) {
    app.useWebSocketAdapter(
      new WebsocketsAdapter(app, {
        enabled: configService.get('ws.enabled'),
        port: configService.get("ws.port"),
        origin: !configService.get("ws.origin")
          ? []
          : configService.get("ws.origin").split(','),
      })
    );
  }

  await app.listen(configService.get('app.port'));
  console.log(`[App] App started in 'http://${configService.get('app.host')}:${configService.get('app.port')}'`);
  console.log(`[App] Environment loaded is: ${configService.get('app.env')}`);
}
bootstrap();

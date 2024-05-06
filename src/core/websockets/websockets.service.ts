import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import {OnGatewayInit, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, ServerOptions } from 'socket.io';
import { Socket } from 'dgram';
import { WebsocketsConfig } from './config/websockets-config';
import { WEBSOCKETS_CONSTANTS } from './websockets.constants';
import { IWsNotificator } from './interfaces/iws-notificator.interface';

@Injectable()
@WebSocketGateway()
export class WebsocketsService implements OnGatewayInit, OnApplicationBootstrap, IWsNotificator {

  public readonly WEBSOCKETS_CONSTANTS = WEBSOCKETS_CONSTANTS;
  
  constructor(
    @Inject('CONFIG_OPTIONS') private options: WebsocketsConfig,
  ) {}

  @WebSocketServer() server: Server;

  async afterInit(server: Server, options?: ServerOptions) {
    return;
  }

  onApplicationBootstrap() {
    if (this.options.enabled) {
      setTimeout(() => {
        console.log(`[Websockets] Websocket started on port: ${this.options.port}`);
      }, 100);
    }
  }

  handleDisconnect(client: Socket) {
    setTimeout(() => {
      console.log('[Websockets] Client disconnected: ', client['handshake'].headers.origin);
    }, 100);
  }

  handleConnection(client: Socket) {
    setTimeout(() => {
      console.log('[Websockets] Client connected: ', client['handshake'].headers.origin);
    }, 100);
  }

  public notifyWebsockets(wsEvent: string): boolean {
    try {
      return this.server.emit(wsEvent, true);
    } catch (err) {
        console.error(`[Notify] Error in websocket notification '${wsEvent}': ${JSON.stringify(err)}`);
        return false;
    }
  }

  public getEvent(controller: string): string {
    const websocketEvents: string[] = Object.keys(this.WEBSOCKETS_CONSTANTS);
    if (!websocketEvents || (websocketEvents && websocketEvents.length == 0)) {
        return undefined;
    }

    const existEvent: string = websocketEvents.find(e => e.toUpperCase() == controller.toUpperCase());
    if (!existEvent) {
        return undefined;
    }
    
    return existEvent;
  }
}

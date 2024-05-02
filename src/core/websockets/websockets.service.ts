import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import {OnGatewayInit, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, ServerOptions } from 'socket.io';
import { Socket } from 'dgram';
import { WebsocketsConfig } from './config/websockets-config';
import { WEBSOCKETS_CONSTANTS } from './websockets.constants';

@Injectable()
@WebSocketGateway()
export class WebsocketsService implements OnGatewayInit, OnApplicationBootstrap {

  public readonly WEBSOCKETS_CONSTANTS = WEBSOCKETS_CONSTANTS;
  
  constructor(@Inject('CONFIG_OPTIONS') private options: WebsocketsConfig) {}

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

  async handleConnection(client: Socket) {
    setTimeout(() => {
      console.log('[Websockets] Client connected: ', client['handshake'].headers.origin);
    }, 100);
  }

  async notifyWebsockets(wsEvent: string): Promise<boolean> {
    try {
      this.server.emit(wsEvent, true);
      return true;
    } catch (err) {
      console.error(`[Websockets] Error in websocket notification '${wsEvent}': ${JSON.stringify(err)}`);
    } finally {
      return false;
    }
  }
}

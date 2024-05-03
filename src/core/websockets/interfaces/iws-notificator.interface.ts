export interface IWsNotificator {
    getWebsocketEvent(): string;
    notifyWebsocketEvent(): boolean;
}
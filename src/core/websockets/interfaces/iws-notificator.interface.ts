export interface IWsNotificator {
    getEvent(controller: string): string;
    notifyWebsockets(wsEvent: string): boolean;
}
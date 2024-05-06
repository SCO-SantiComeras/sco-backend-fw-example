export interface IWsNotificator {
    getEvent(): string;
    notifyWebsockets(): boolean;
}
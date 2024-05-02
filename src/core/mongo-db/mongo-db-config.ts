export interface MongoDbConfig {
    enabled: boolean;
    ip: string;
    port: number;
    user?: string;
    pass?: string;
    database: string;
}


import { Injectable } from "@nestjs/common";
import { HTTP_STATUS } from "sco-backend-fw";
import { HTTP_ERRORS_CONSTANTS } from "./http-errors.constants";

@Injectable()
export class HttpErrorsService {

    public readonly HTTP_ERRORS_CONSTANTS = HTTP_ERRORS_CONSTANTS;
    public readonly HTTP_STATUS = HTTP_STATUS;

    constructor() { }

    public getMessage(key: string, group?: string): string {
        for (const level of Object.keys(this.HTTP_ERRORS_CONSTANTS)) {
            if (group && group.toUpperCase() != level.toUpperCase()) {
                continue;
            }
            
            const levelKeys: string[] = Object.keys(this.HTTP_ERRORS_CONSTANTS[level]);
            for (const levelKey of levelKeys) {
                if (key.toUpperCase() == levelKey.toUpperCase()) {
                    console.log(this.HTTP_ERRORS_CONSTANTS[level][key])
                    return this.HTTP_ERRORS_CONSTANTS[level][key];
                }
            }
        }

        return undefined;
    }

    public getKey(message: string, group?: string): string {
        for (const level of Object.keys(this.HTTP_ERRORS_CONSTANTS)) {
            if (group && group.toUpperCase() != level.toUpperCase()) {
                continue;
            }
            
            const levelValues: string[] = Object.values(this.HTTP_ERRORS_CONSTANTS[level]);
            for (const levelValue of levelValues) {
                if (message.toUpperCase() == levelValue.toUpperCase()) {
                    const index: number = levelValues.indexOf(levelValue);
                    if (index != -1) {
                        return Object.keys(this.HTTP_ERRORS_CONSTANTS[level])[index];
                    }
                }
            }
        }

        return '';
    }

    public getValuesFromLevel(level: string): any {
        const keys: string[] = Object.keys(this.HTTP_ERRORS_CONSTANTS);
        if (!keys || (keys && keys.length == 0)) {
            return undefined;
        }

        const exitKey: string = keys.find(k => k == level);
        if (!exitKey) {
            return undefined;
        }

        for (const key of keys) {
            if (key.toUpperCase() != level.toUpperCase()) {
                continue;
            }

            return this.HTTP_ERRORS_CONSTANTS[key];
        }

        return undefined;
    }
}

import { Injectable } from "@nestjs/common";
import { VALIDATION_ERRORS_CONSTANTS } from "./validation-errors.constants";

@Injectable()
export class ValidationErrorsService {

    public readonly VALIDATION_ERRORS_CONSTANTS = VALIDATION_ERRORS_CONSTANTS;

    constructor() { }

    public getValidation(key: string, property: string, dtoClass: string): string {
        for (const level of Object.keys(this.VALIDATION_ERRORS_CONSTANTS)) {
            if (dtoClass.toUpperCase() != level.toUpperCase()) {
                continue;
            }
            
            const levelKeys: string[] = Object.keys(this.VALIDATION_ERRORS_CONSTANTS[level]);
            for (const levelKey of levelKeys) {
                if (property.toUpperCase() != levelKey.toUpperCase()) {
                    continue;
                }
                return this.VALIDATION_ERRORS_CONSTANTS[level][levelKey][key];
            }
        }

        return undefined;
    }

    public getKey(message: string, property: string, dtoClass: string): string {
        for (const level of Object.keys(this.VALIDATION_ERRORS_CONSTANTS)) {
            if (dtoClass.toUpperCase() != level.toUpperCase()) {
                continue;
            }
            
            const levelKeys: string[] = Object.keys(this.VALIDATION_ERRORS_CONSTANTS[level]);
            for (const levelKey of levelKeys) {
                if (property.toUpperCase() != levelKey.toUpperCase()) {
                    continue;
                }

                const levelKeyValues: string[] = Object.values(this.VALIDATION_ERRORS_CONSTANTS[level][levelKey]);
                const existMessage: string = levelKeyValues.find(m => m.toUpperCase() == message.toUpperCase());
                if (existMessage) {
                    const index: number = levelKeyValues.indexOf(existMessage);
                    if (index != -1) {
                        return Object.keys(this.VALIDATION_ERRORS_CONSTANTS[level][levelKey])[index];
                    }
                }
            }
        }

        return '';
    }

    public getValidationsFromProperty(property: string, dtoClass: string): any {
        const keys: string[] = Object.keys(this.VALIDATION_ERRORS_CONSTANTS);
        if (!keys || (keys && keys.length == 0)) {
            return undefined;
        }

        const exitKey: string = keys.find(k => k == dtoClass);
        if (!exitKey) {
            return undefined;
        }

        for (const level of keys) {
            if (level.toUpperCase() != dtoClass.toUpperCase()) {
                continue;
            }

            const levelKeys: string[] = Object.keys(this.VALIDATION_ERRORS_CONSTANTS[level]);
            for (const levelKey of levelKeys) {
                if (levelKey.toUpperCase() != property.toUpperCase()) {
                    continue;
                }
                
                return this.VALIDATION_ERRORS_CONSTANTS[level][levelKey];
            }
        }

        return undefined;
    }

}

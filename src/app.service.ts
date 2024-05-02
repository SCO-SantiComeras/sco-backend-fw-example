import { Injectable } from "@nestjs/common";
import { ICore, IFileFunction, TYPES } from "sco-backend-fw";
import { WebsocketsService } from "./core/websockets/websockets.service";
import { MongoDbService } from "./core/mongo-db/mongo-db.service";
import { HttpErrorsService } from "./core/shared/http-errors/http-errors.service";
import { ValidationErrorsService } from "./core/shared/validation-errors/validation-errors.service";
import { UsersService } from "./core/users/users.service";
import { UserDto } from "./core/users/dto/user.dto";

@Injectable()
export class AppService implements ICore {

    /* Add Own Dependencies */
    constructor(
        private readonly websocketsService: WebsocketsService,
        private readonly mongodbService: MongoDbService,
        private readonly httpErrorsService: HttpErrorsService,
        private readonly validationErrorsService: ValidationErrorsService,
        private readonly usersService: UsersService,
    ) {}

    /*  Function Files Constants*/
    getFuntionFilesConstants(): IFileFunction[] {
        return [
            /* Global */
            {
                file: 'hello',
                path: 'global',
                resultType: 'string',
            },

            /* Calculator */
            ...this.createCalculatorFileConstants(),
        
            /* Users */
            ...this.createUsersFileConstants(),
        ];
    }

    private createCalculatorFileConstants(): IFileFunction[] {
        return [
            {
                file: 'add',
                path: 'calculator',
                params: [
                    {
                        name: 'n1',
                        type: 'number',
                        optional: false,
                    },
                    {
                        name: 'n2',
                        type: 'number',
                        optional: false,
                    },
                ],
                resultType: 'number',
            },
            {
                file: 'subtract',
                path: 'calculator',
                params: [
                    {
                        name: 'n1',
                        type: 'number',
                        optional: false,
                    },
                    {
                        name: 'n2',
                        type: 'number',
                        optional: false,
                    },
                ],
                resultType: 'number',
            },
            {
                file: 'multiply',
                path: 'calculator',
                params: [
                    {
                        name: 'n1',
                        type: 'number',
                        optional: false,
                    },
                    {
                        name: 'n2',
                        type: 'number',
                        optional: false,
                    },
                ],
                resultType: 'number',
            },
            {
                file: 'split',
                path: 'calculator',
                params: [
                    {
                        name: 'n1',
                        type: 'number',
                        optional: false,
                    },
                    {
                        name: 'n2',
                        type: 'number',
                        optional: false,
                    },
                ],
                resultType: 'number',
            },
            {
                file: 'rest',
                path: 'calculator',
                params: [
                    {
                        name: 'n1',
                        type: 'number',
                        optional: false,
                    },
                    {
                        name: 'n2',
                        type: 'number',
                        optional: false,
                    },
                ],
                resultType: 'number',
            },
        ];
    }

    private createUsersFileConstants(): IFileFunction[] {
        return [
            {
                file: 'find',
                path: 'users',
                params: [
                    {
                        name: 'query',
                        type: 'any',
                        optional: true,
                    }
                ],
                resultType: 'array',
            },
            {
                file: 'add',
                path: 'users',
                params: [
                    {
                        name: 'user',
                        type: 'object',
                        optional: false,
                        dto: UserDto,
                    }
                ],
                resultType: 'model',
            },
            {
                file: 'update',
                path: 'users',
                params: [
                    {
                        name: '_id',
                        type: 'string',
                        optional: false,
                    },
                    {
                        name: 'user',
                        type: 'object',
                        optional: false,
                        dto: UserDto,
                    }
                ],
                resultType: 'model',
            },
            {
                file: 'delete',
                path: 'users',
                params: [
                    {
                        name: '_id',
                        type: 'string',
                        optional: false,
                    },
                ],
                resultType: 'boolean',
            },
        ];
    }

    /* Validation Passport */ 
    async validationPassportCallback(authorization: string): Promise<boolean> {
        if (!authorization) {
            return false;
        }

        return true;
    }

    /* Types */
    getTypesConstants(): any {
        return {
            ...TYPES,
        }
    }
}

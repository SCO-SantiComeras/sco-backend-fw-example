import { Injectable } from "@nestjs/common";
import { FileFunctionsService, ICore, IFileFunction, TYPES } from "sco-backend-fw";
import { WebsocketsService } from "./core/websockets/websockets.service";
import { MongoDbService } from "./core/mongo-db/mongo-db.service";
import { HttpErrorsService } from "./core/shared/http-errors/http-errors.service";
import { ValidationErrorsService } from "./core/shared/validation-errors/validation-errors.service";
import { CALCULATOR_ROUTES } from "./controller-routes/calculator.routes";
import { USERS_ROUTES } from "./controller-routes/users.routes";
import { GLOBAL_ROUTES } from "./controller-routes/global.routes";
import { UsersService } from "./modules/users/users.service";

@Injectable()
export class AppService implements ICore {

    /* Add Own Dependencies */
    constructor(
        private readonly fileFunctionsService: FileFunctionsService,
        private readonly websocketsService: WebsocketsService,
        private readonly mongodbService: MongoDbService,
        private readonly httpErrorsService: HttpErrorsService,
        private readonly validationErrorsService: ValidationErrorsService,
        private readonly usersService: UsersService,
    ) {
        this.fileFunctionsService.setFileFunctions(this.getFileFunctionsConstants());
    }

    /* Function Files Constants */
    getFileFunctionsConstants(): IFileFunction[] {
        return [
            /* Global */
            ...GLOBAL_ROUTES,

            /* Calculator */
            ...CALCULATOR_ROUTES,
        
            /* Users */
            ...USERS_ROUTES,
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

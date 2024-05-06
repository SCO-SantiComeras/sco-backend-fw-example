import { Injectable } from "@nestjs/common";
import { FileFunctionsService, ICore, IFileFunction, TYPES } from "sco-backend-fw";
import { HttpErrorsService } from "./core/shared/http-errors/http-errors.service";
import { CALCULATOR_ROUTES } from "./controller-routes/calculator.routes";
import { USERS_ROUTES } from "./controller-routes/users.routes";
import { GLOBAL_ROUTES } from "./controller-routes/global.routes";
import { UsersService } from "./modules/users/users.service";

@Injectable()
export class AppService implements ICore {

    /* Add Own Dependencies */
    constructor(
        private readonly fileFunctionsService: FileFunctionsService,
        private readonly httpErrorsService: HttpErrorsService,
        private readonly usersService: UsersService,
    ) {
        this.fileFunctionsService.setFileFunctions(this.createControllerRoutes());
    }

    /* Function Files Constants */
    createControllerRoutes(): IFileFunction[] {
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
    setCustomResultTypes(): any {
        return {
            ...TYPES, // Default Types, you are not required to set default types
        }
    }
}

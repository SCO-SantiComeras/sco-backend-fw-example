import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { FileFunctionsService, ProvidersService } from 'sco-backend-fw';
import { IUser } from "./interface/iuser.interface";
import { USERS_CONSTANTS } from "./constants/user.constants";
import { UsersService } from "./users.service";
import { HttpErrorsService } from "src/core/shared/http-errors/http-errors.service";
import { USERS_ROUTES_NAMES, USERS_ROUTES_PATH } from "src/controller-routes/users.routes";

@Injectable()
export class UsersPopulationService  {

    private readonly USERS_CONSTANTS = USERS_CONSTANTS;

    constructor(
        private readonly usersService: UsersService,
        private readonly fileFunctionsService: FileFunctionsService,
        private readonly providersService: ProvidersService,
        private readonly httpErrorsService: HttpErrorsService,
    ) { }

    /* On Load Module (Populate) */
    private async onModuleInit(): Promise<void> {
       await this.populateDefaultUsers();
    }

    private async populateDefaultUsers(): Promise<void> {
        const userValues: any[] = Object.values(this.USERS_CONSTANTS);
        if (!userValues || (userValues && userValues.length == 0)) {
            return;
        }
        
        for (const value of userValues) {
            if (!await this.usersService.findUserByName(value.NAME)) {
                const createdUser: IUser = await this.fileFunctionsService.exec(
                    USERS_ROUTES_PATH,
                    USERS_ROUTES_NAMES.ADD,
                    {
                        user: {
                            name: value.NAME,
                            email: value.EMAIL,
                        }
                    },
                    this.providersService.createProviders(this.providersService.getContextname(this), this),
                );

                if (createdUser) {
                    console.log(`[Users] User '${value.NAME}' created successfully`);
                }
            }
        }
    }
}

import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { FileFunctionsService } from 'sco-backend-fw';
import { IUser } from "./interface/iuser.interface";
import { USERS_CONSTANTS } from "./constants/user.constants";
import { UsersService } from "./users.service";
import { HttpErrorsService } from "src/core/shared/http-errors/http-errors.service";

@Injectable()
export class UsersPopulationService  {

    private readonly USERS_CONSTANTS = USERS_CONSTANTS;
    private _providers: any;
    private _UserModel: Model<IUser>;

    constructor(
        private readonly usersService: UsersService,
        private readonly fileFunctionsService: FileFunctionsService,
        private readonly httpErrorsService: HttpErrorsService,
    ) { 
        this._providers = {
            usersPopulationService: this,
            usersService: this.usersService,
            fileFunctionsService: this.fileFunctionsService,
            httpErrorsService: this.httpErrorsService,
        };

        this._UserModel = this.usersService.getModel();
    }

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
            if (!await this._UserModel.findOne({ name: value.NAME })) {
                const createdUser: IUser = await this.fileFunctionsService.exec(
                    'users',
                    'add',
                    {
                        user: {
                            name: value.NAME,
                            email: value.EMAIL,
                        }
                    },
                    this._providers
                );

                if (createdUser) {
                    console.log(`[Users] User '${value.NAME}' created successfully`);
                }
            }
        }
    }
}

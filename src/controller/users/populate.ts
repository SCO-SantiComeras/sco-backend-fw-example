import { UsersService } from "src/modules/users/users.service";
import { IUser } from "src/modules/users/interface/iuser.interface";
import { FileFunctionsService } from "sco-backend-fw";

async (body: {}, 
    providers: {
        usersService?: UsersService;
        fileFunctionsService: FileFunctionsService;
        USERS_ROUTES_PATH: string;
        USERS_ROUTES_NAMES: any;
        USERS_CONSTANTS: any;
    },
) => {
    const { 
        usersService, 
        fileFunctionsService, 
        USERS_ROUTES_PATH,
        USERS_ROUTES_NAMES,
        USERS_CONSTANTS,
    } = providers;

    const userValues: any[] = Object.values(USERS_CONSTANTS);
    if (!userValues || (userValues && userValues.length == 0)) {
        return;
    }
    
    for (const value of userValues) {
        if (!await usersService.findOneByProperty('name', value.NAME)) {
            const createdUser: IUser = await fileFunctionsService.exec(
                USERS_ROUTES_PATH,
                USERS_ROUTES_NAMES.ADD,
                {
                    user: {
                        name: value.NAME,
                        email: value.EMAIL,
                    }
                },
                providers,
            );

            if (createdUser) {
                console.log(`[Users] User '${value.NAME}' created successfully`);
            }
        }
    }

    return;
}
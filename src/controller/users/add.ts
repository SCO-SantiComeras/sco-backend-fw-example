import { Model } from "mongoose";
import { UsersService } from "src/modules/users/users.service";
import { IUser } from "src/modules/users/interface/iuser.interface";
import { UserDto } from "src/modules/users/dto/user.dto";
import { HttpError } from "sco-backend-fw";
import { HttpErrorsService } from "src/core/shared/http-errors/http-errors.service";

async (body: { 
        user: UserDto; 
    }, 
    providers: {
        usersService?: UsersService;
        httpErrorsService?: HttpErrorsService;
    },
) => {
    const { usersService, httpErrorsService } = providers;

    const existUserName: IUser = await usersService.findUserByName(body.user.name);
    if (existUserName) {
        console.log(`[Users ADD] User name '${body.user.name}' already exists`);
        return {
            type: httpErrorsService.HTTP_ERRORS_TYPES.HTTP_EXCEPTION, 
            message: httpErrorsService.HTTP_ERRORS_CONSTANTS.USERS.USER_NAME_ALREADY_EXISTS, 
            code: httpErrorsService.HTTP_STATUS.CONFLICT
        } as HttpError;
    }

    const existUserEmail: IUser = await usersService.findUserByEmail(body.user.email);
    if (existUserEmail) {
        console.log(`[Users ADD] User email '${body.user.email}' already exists`);
        return { 
            type: httpErrorsService.HTTP_ERRORS_TYPES.HTTP_EXCEPTION, 
            message: httpErrorsService.HTTP_ERRORS_CONSTANTS.USERS.USER_EMAIL_ALREADY_EXISTS, 
            code: httpErrorsService.HTTP_STATUS.CONFLICT 
        } as HttpError;
    }

    const UserModel: Model<IUser> = usersService.getModel();
    const createdUser: IUser = await UserModel.create({
        name: body.user.name,
        email: body.user.email,
    })
    
    if (!createdUser) {
        console.log(`[Users ADD] User '${body.user.name}' unnable to create`);
        return { 
            type: httpErrorsService.HTTP_ERRORS_TYPES.HTTP_EXCEPTION, 
            message: httpErrorsService.HTTP_ERRORS_CONSTANTS.USERS.USER_UNNABLE_CREATE, 
            code: httpErrorsService.HTTP_STATUS.CONFLICT 
        } as HttpError;
    }

    if (!usersService.notifyWebsockets()) {
        console.log(`[Users ADD] Websocket event '${usersService.USERS_ROUTES_PATH.toUpperCase()} unnable to send'`);
    }

    console.log(`[Users ADD] User ${body.user.name} created successfully`);
    return createdUser;
}
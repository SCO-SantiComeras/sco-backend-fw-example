import { Model } from "mongoose";
import { UsersService } from "src/core/users/users.service";
import { IUser } from "src/core/users/interface/iuser.interface";
import { HttpErrorsService } from "src/core/shared/http-errors/http-errors.service";
import { WebsocketsService } from "src/core/websockets/websockets.service";
import { UserDto } from "src/core/users/dto/user.dto";

async (body: { 
        user: UserDto; 
    }, 
    appService: {
        usersService?: UsersService;
        httpErrorsService? : HttpErrorsService;
        websocketsService? : WebsocketsService;
    },
) => {
    const { usersService, httpErrorsService, websocketsService } = appService;

    const existUserName: IUser = await usersService.findUserByName(body.user.name);
    if (existUserName) {
        console.log(`[Users ADD] User name '${body.user.name}' already exists`);
        return { 
            type: 'HttpException', 
            message: httpErrorsService.HTTP_ERRORS_CONSTANTS.USERS.USER_NAME_ALREADY_EXISTS, 
            code: httpErrorsService.HTTP_STATUS.CONFLICT 
        };
    }

    const existUserEmail: IUser = await usersService.findUserByEmail(body.user.email);
    if (existUserEmail) {
        console.log(`[Users ADD] User email '${body.user.email}' already exists`);
        return { 
            type: 'HttpException', 
            message: httpErrorsService.HTTP_ERRORS_CONSTANTS.USERS.USER_EMAIL_ALREADY_EXISTS, 
            code: httpErrorsService.HTTP_STATUS.CONFLICT 
        };
    }

    const UserModel: Model<IUser> = await usersService.getModel();
    const createdUser: IUser = await UserModel.create({
        name: body.user.name,
        email: body.user.email,
    })
    
    if (!createdUser) {
        console.log(`[Users ADD] User '${body.user.name}' unnable to create`);
        return { 
            type: 'HttpException', 
            message: httpErrorsService.HTTP_ERRORS_CONSTANTS.USERS.USER_UNNABLE_CREATE, 
            code: httpErrorsService.HTTP_STATUS.CONFLICT 
        };
    }

    if (websocketsService.notifyWebsockets(websocketsService.WEBSOCKETS_CONSTANTS.WS_USERS)) {
        console.log(`[Users DELETE] Websocket event '${websocketsService.WEBSOCKETS_CONSTANTS.WS_USERS} unnable to send'`);
    }

    console.log(`[Users ADD] User ${body.user.name} created successfully`);
    return createdUser;
}
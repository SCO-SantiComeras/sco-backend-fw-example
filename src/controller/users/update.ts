import { Model } from "mongoose";
import { UsersService } from "src/core/users/users.service";
import { IUser } from "src/core/users/interface/iuser.interface";
import { HttpErrorsService } from "src/core/shared/http-errors/http-errors.service";
import { WebsocketsService } from "src/core/websockets/websockets.service";
import { UserDto } from "src/core/users/dto/user.dto";

async (body: { 
        _id: string; 
        user: UserDto; 
    }, 
    appService: {
        usersService?: UsersService;
        httpErrorsService? : HttpErrorsService;
        websocketsService? : WebsocketsService;
    },
) => {
    const existUser: IUser = await appService.usersService.findUser(body._id);
    if (!existUser) {
        console.log(`[Users UPDATE] User _id '${body._id}' not found`);
        return { 
            type: 'HttpException', 
            message: appService.httpErrorsService.HTTP_ERRORS_CONSTANTS.USERS.USER_NOT_FOUND, 
            code: appService.httpErrorsService.HTTP_STATUS.NOT_FOUND 
        };
    }

    const existUserName: IUser = await appService.usersService.findUserByName(body.user.name);
    if (existUserName) {
        console.log(`[Users UPDATE] User name '${body.user.name}' already exists`);
        return { 
            type: 'HttpException', 
            message: appService.httpErrorsService.HTTP_ERRORS_CONSTANTS.USERS.USER_NAME_ALREADY_EXISTS, 
            code: appService.httpErrorsService.HTTP_STATUS.CONFLICT 
        };
    }

    const existUserEmail: IUser = await appService.usersService.findUserByEmail(body.user.email);
    if (existUserEmail) {
        console.log(`[Users UPDATE] User email '${body.user.email}' already exists`);
        return { 
            type: 'HttpException', 
            message: appService.httpErrorsService.HTTP_ERRORS_CONSTANTS.USERS.USER_EMAIL_ALREADY_EXISTS, 
            code: appService.httpErrorsService.HTTP_STATUS.CONFLICT 
        };
    }

    const UserModel: Model<IUser> = await appService.usersService.getModel();
    const result = await UserModel.updateOne(
        {
          _id: body._id,
        },
        { 
          $set: {
            name: body.user.name,
            email: body.user.email,
          }
        }
    );

    if (!result || (result && result.modifiedCount != 1)) {
        console.log(`[Users UPDATE] User _id '${body._id}' unnable to update`);
        return { 
            type: 'HttpException', 
            message: appService.httpErrorsService.HTTP_ERRORS_CONSTANTS.USERS.USER_UNNABLE_UPDATE, 
            code: appService.httpErrorsService.HTTP_STATUS.CONFLICT 
        };
    }

    if (!appService.websocketsService.notifyWebsockets(appService.websocketsService.WEBSOCKETS_CONSTANTS.WS_USERS)) {
        console.log(`[Users UPDATE] Websocket event '${appService.websocketsService.WEBSOCKETS_CONSTANTS.WS_USERS} unnable to send'`);
    }
    
    console.log(`[Users UPDATE] User ${body._id} updated successfully`);
    return await appService.usersService.findUser(body._id);
}
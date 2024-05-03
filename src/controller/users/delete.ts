import { Model } from "mongoose";
import { UsersService } from "src/core/users/users.service";
import { IUser } from "src/core/users/interface/iuser.interface";
import { HttpErrorsService } from "src/core/shared/http-errors/http-errors.service";
import { WebsocketsService } from "src/core/websockets/websockets.service";

async (body: { 
        _id: string;
    }, 
    appService: {
        usersService?: UsersService;
        httpErrorsService? : HttpErrorsService;
        websocketsService? : WebsocketsService;
    },
) => {
    const existUser: IUser = await appService.usersService.findUser(body._id);
    if (!existUser) {
        console.log(`[Users DELETE] User _id '${body._id}' not found`);
        return { 
            type: 'HttpException', 
            message: appService.httpErrorsService.HTTP_ERRORS_CONSTANTS.USERS.USER_NOT_FOUND, 
            code: appService.httpErrorsService.HTTP_STATUS.NOT_FOUND 
        };
    }

    const UserModel: Model<IUser> = await appService.usersService.getModel();
    const result = await UserModel.deleteOne({ _id: body._id });

    if (!result || (result && result.deletedCount != 1)) {
        console.log(`[Users DELETE] User _id '${body._id}' unnable to delete`);
        return { 
            type: 'HttpException', 
            message: appService.httpErrorsService.HTTP_ERRORS_CONSTANTS.USERS.USER_UNNABLE_DELETE, 
            code: appService.httpErrorsService.HTTP_STATUS.CONFLICT 
        };
    }

    if (!appService.websocketsService.notifyWebsockets(appService.websocketsService.WEBSOCKETS_CONSTANTS.WS_USERS)) {
        console.log(`[Users DELETE] Websocket event '${appService.websocketsService.WEBSOCKETS_CONSTANTS.WS_USERS} unnable to send'`);
    }

    console.log(`[Users DELETE] User ${body._id} deleted successfully`);
    return true;
}
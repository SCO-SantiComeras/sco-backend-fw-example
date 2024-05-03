import { Model } from "mongoose";
import { UsersService } from "src/modules/users/users.service";
import { IUser } from "src/modules/users/interface/iuser.interface";
import { HttpErrorsService } from "src/core/shared/http-errors/http-errors.service";
import { HttpError } from "sco-backend-fw";

async (body: { 
        _id: string;
    }, 
    appService: {
        usersService?: UsersService;
        httpErrorsService? : HttpErrorsService;
    },
) => {
    const existUser: IUser = await appService.usersService.findById(body._id);
    if (!existUser) {
        console.log(`[Users DELETE] User _id '${body._id}' not found`);
        return { 
            type:  appService.httpErrorsService.HTTP_ERRORS_TYPES.HTTP_EXCEPTION, 
            message: appService.httpErrorsService.HTTP_ERRORS_CONSTANTS.USERS.USER_NOT_FOUND, 
            code: appService.httpErrorsService.HTTP_STATUS.NOT_FOUND 
        } as HttpError;
    }

    const UserModel: Model<IUser> = appService.usersService.getModel();
    const result = await UserModel.deleteOne({ _id: body._id });

    if (!result || (result && result.deletedCount != 1)) {
        console.log(`[Users DELETE] User _id '${body._id}' unnable to delete`);
        return { 
            type: appService.httpErrorsService.HTTP_ERRORS_TYPES.HTTP_EXCEPTION,
            message: appService.httpErrorsService.HTTP_ERRORS_CONSTANTS.USERS.USER_UNNABLE_DELETE, 
            code: appService.httpErrorsService.HTTP_STATUS.CONFLICT 
        } as HttpError;
    }

    if (!appService.usersService.notifyWebsocketEvent()) {
        console.log(`[Users DELETE] Websocket event '${appService.usersService.getWebsocketEvent()} unnable to send'`);
    }

    console.log(`[Users DELETE] User ${body._id} deleted successfully`);
    return true;
}
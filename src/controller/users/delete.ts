import { Model } from "mongoose";
import { UsersService } from "src/modules/users/users.service";
import { IUser } from "src/modules/users/interface/iuser.interface";
import { HttpError } from "sco-backend-fw";
import { HttpErrorsService } from "src/core/shared/http-errors/http-errors.service";

async (body: { 
        _id: string;
    }, 
    providers: {
        usersService?: UsersService;
        httpErrorsService?: HttpErrorsService;
    },
) => {
    const { usersService, httpErrorsService } = providers;

    const existUser: IUser = await usersService.findById(body._id);
    if (!existUser) {
        console.log(`[Users DELETE] User _id '${body._id}' not found`);
        return { 
            type:  httpErrorsService.HTTP_ERRORS_TYPES.HTTP_EXCEPTION, 
            message: httpErrorsService.HTTP_ERRORS_CONSTANTS.USERS.USER_NOT_FOUND, 
            code: httpErrorsService.HTTP_STATUS.NOT_FOUND 
        } as HttpError;
    }

    const UserModel: Model<IUser> = usersService.getModel();
    const result = await UserModel.deleteOne({ _id: body._id });

    if (!result || (result && result.deletedCount != 1)) {
        console.log(`[Users DELETE] User _id '${body._id}' unnable to delete`);
        return { 
            type: httpErrorsService.HTTP_ERRORS_TYPES.HTTP_EXCEPTION,
            message: httpErrorsService.HTTP_ERRORS_CONSTANTS.USERS.USER_UNNABLE_DELETE, 
            code: httpErrorsService.HTTP_STATUS.CONFLICT 
        } as HttpError;
    }

    if (!usersService.notifyWebsockets()) {
        console.log(`[Users DELETE] Websocket event '${usersService.USERS_ROUTES_PATH.toUpperCase()} unnable to send'`);
    }

    console.log(`[Users DELETE] User ${body._id} deleted successfully`);
    return true;
}
import { Model } from "mongoose";
import { UsersService } from "src/modules/users/users.service";
import { IUser } from "src/modules/users/interface/iuser.interface";
import { HttpErrorsService } from "src/core/shared/http-errors/http-errors.service";
import { UserDto } from "src/modules/users/dto/user.dto";
import { HttpError } from "sco-backend-fw";

async (body: { 
        _id: string; 
        user: UserDto; 
    }, 
    appService: {
        usersService?: UsersService;
        httpErrorsService? : HttpErrorsService;
    },
) => {
    const existUser: IUser = await appService.usersService.findById(body._id);
    if (!existUser) {
        console.log(`[Users UPDATE] User _id '${body._id}' not found`);
        return { 
            type: appService.httpErrorsService.HTTP_ERRORS_TYPES.HTTP_EXCEPTION,
            message: appService.httpErrorsService.HTTP_ERRORS_CONSTANTS.USERS.USER_NOT_FOUND, 
            code: appService.httpErrorsService.HTTP_STATUS.NOT_FOUND 
        } as HttpError;
    }

    const existUserName: IUser = await appService.usersService.findUserByName(body.user.name);
    if (existUserName) {
        console.log(`[Users UPDATE] User name '${body.user.name}' already exists`);
        return { 
            type: appService.httpErrorsService.HTTP_ERRORS_TYPES.HTTP_EXCEPTION,
            message: appService.httpErrorsService.HTTP_ERRORS_CONSTANTS.USERS.USER_NAME_ALREADY_EXISTS, 
            code: appService.httpErrorsService.HTTP_STATUS.CONFLICT 
        } as HttpError;
    }

    const existUserEmail: IUser = await appService.usersService.findUserByEmail(body.user.email);
    if (existUserEmail) {
        console.log(`[Users UPDATE] User email '${body.user.email}' already exists`);
        return { 
            type: appService.httpErrorsService.HTTP_ERRORS_TYPES.HTTP_EXCEPTION,
            message: appService.httpErrorsService.HTTP_ERRORS_CONSTANTS.USERS.USER_EMAIL_ALREADY_EXISTS, 
            code: appService.httpErrorsService.HTTP_STATUS.CONFLICT 
        } as HttpError;
    }

    const UserModel: Model<IUser> = appService.usersService.getModel();
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
            type: appService.httpErrorsService.HTTP_ERRORS_TYPES.HTTP_EXCEPTION, 
            message: appService.httpErrorsService.HTTP_ERRORS_CONSTANTS.USERS.USER_UNNABLE_UPDATE, 
            code: appService.httpErrorsService.HTTP_STATUS.CONFLICT 
        } as HttpError;
    }

    if (!appService.usersService.notifyWebsocketEvent()) {
        console.log(`[Users UPDATE] Websocket event '${appService.usersService.getWebsocketEvent()} unnable to send'`);
    }
    
    console.log(`[Users UPDATE] User ${body._id} updated successfully`);
    return await appService.usersService.findById(body._id);
}
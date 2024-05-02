import { Model } from "mongoose";
import { IUser } from "src/core/users/interface/iuser.interface";
import { UsersService } from "src/core/users/users.service";

async (body: { 
        query?: any; 
    }, 
    appService: {
        usersService?: UsersService;
    },
) => {
    const { usersService } = appService;

    const UserModel: Model<IUser> = await usersService.getModel();

    const users: IUser[] = await UserModel.find(body.query ? body.query : undefined);
    if (!users || (users && users.length == 0)) {
        return [];
    }

    return users;
}
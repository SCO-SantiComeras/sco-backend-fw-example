import { Model } from "mongoose";
import { IUser } from "src/modules/users/interface/iuser.interface";
import { UsersService } from "src/modules/users/users.service";

async (body: { 
        query?: any; 
    }, 
    providers: {
        usersService?: UsersService;
    },
) => {
    const { usersService } = providers;

    const UserModel: Model<IUser> = usersService.getModel();

    const users: IUser[] = await UserModel.find(body.query ? body.query : undefined);
    if (!users || (users && users.length == 0)) {
        return [];
    }

    return users;
}
import { IFileFunction, TYPES } from "sco-backend-fw";
import { UserDto } from "../core/users/dto/user.dto";

export const USERS_ROUTES: IFileFunction[] = [
    {
        file: 'find',
        path: 'users',
        params: [
            { name: 'query', type: TYPES.ANY, optional: true }
        ],
        resultType: TYPES.ARRAY,
    },
    {
        file: 'add',
        path: 'users',
        params: [
            { name: 'user', type: TYPES.OBJECT, optional: false, dto: UserDto }
        ],
        resultType: TYPES.MODEL,
    },
    {
        file: 'update',
        path: 'users',
        params: [
            { name: '_id', type: TYPES.STRING, optional: false },
            { name: 'user', type: TYPES.OBJECT, optional: false, dto: UserDto }
        ],
        resultType: TYPES.MODEL,
    },
    {
        file: 'delete',
        path: 'users',
        params: [
            { name: '_id', type: TYPES.STRING, optional: false },
        ],
        resultType: TYPES.BOOLEAN,
    },
];
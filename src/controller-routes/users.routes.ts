import { IFileFunction, TYPES } from "sco-backend-fw";
import { UserDto } from "../modules/users/dto/user.dto";

export const USERS_ROUTES_PATH: string = 'users';

export const USERS_ROUTES_NAMES = {
    FIND: 'find',
    ADD: 'add',
    UPDATE: 'update',
    DELETE: 'delete',
    POPULATE: 'populate',
};

export const USERS_ROUTES: IFileFunction[] = [
    {
        endpoint: true,
        file: USERS_ROUTES_NAMES.FIND,
        path: USERS_ROUTES_PATH,
        params: [
            { name: 'query', type: TYPES.ANY, optional: true }
        ],
        resultType: TYPES.ARRAY,
        validationPipe: false,
        validationPassport: true,
    },
    {
        endpoint: true,
        file: USERS_ROUTES_NAMES.ADD,
        path: USERS_ROUTES_PATH,
        params: [
            { name: 'user', type: TYPES.OBJECT, optional: false, dto: UserDto }
        ],
        resultType: TYPES.MODEL,
        validationPipe: true,
        validationPassport: true,
    },
    {
        endpoint: true,
        file: USERS_ROUTES_NAMES.UPDATE,
        path: USERS_ROUTES_PATH,
        params: [
            { name: '_id', type: TYPES.STRING, optional: false },
            { name: 'user', type: TYPES.OBJECT, optional: false, dto: UserDto }
        ],
        resultType: TYPES.MODEL,
        validationPipe: true,
        validationPassport: true,
    },
    {
        endpoint: true,
        file: USERS_ROUTES_NAMES.DELETE,
        path: USERS_ROUTES_PATH,
        params: [
            { name: '_id', type: TYPES.STRING, optional: false },
        ],
        resultType: TYPES.BOOLEAN,
        validationPipe: false,
        validationPassport: true,
    },
    {
        endpoint: false,
        file: USERS_ROUTES_NAMES.POPULATE,
        path: USERS_ROUTES_PATH,
        resultType: TYPES.VOID,
        validationPipe: false,
        validationPassport: false,
    },
];
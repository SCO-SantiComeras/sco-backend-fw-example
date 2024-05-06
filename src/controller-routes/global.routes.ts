import { IFileFunction, TYPES } from "sco-backend-fw";

export const GLOBAL_ROUTES_PATH: string = 'global';

export const GLOBAL_ROUTES_NAMES = {
    HELLO: 'hello',
};

export const GLOBAL_ROUTES: IFileFunction[] = [
    {
        endpoint: true,
        file: GLOBAL_ROUTES_NAMES.HELLO,
        path: GLOBAL_ROUTES_PATH,
        resultType: TYPES.STRING,
        validationPipe: false,
        validationPassport: false,
    },
];
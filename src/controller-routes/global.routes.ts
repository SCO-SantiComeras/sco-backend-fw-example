import { IFileFunction, TYPES } from "sco-backend-fw";

export const GLOBAL_ROUTES: IFileFunction[] = [
    {
        file: 'hello',
        path: 'global',
        resultType: TYPES.STRING,
    },
];
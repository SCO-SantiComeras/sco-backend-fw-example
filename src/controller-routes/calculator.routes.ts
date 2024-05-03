import { IFileFunction, TYPES } from "sco-backend-fw";

export const CALCULATOR_ROUTES: IFileFunction[] = [
    {
        file: 'add',
        path: 'calculator',
        params: [
            { name: 'n1', type: TYPES.NUMBER, optional: false },
            { name: 'n2', type: TYPES.NUMBER, optional: false },
        ],
        resultType: TYPES.NUMBER,
    },
    {
        file: 'subtract',
        path: 'calculator',
        params: [
            { name: 'n1', type: TYPES.NUMBER, optional: false },
            { name: 'n2', type: TYPES.NUMBER, optional: false },
        ],
        resultType: TYPES.NUMBER,
    },
    {
        file: 'multiply',
        path: 'calculator',
        params: [
            { name: 'n1', type: TYPES.NUMBER, optional: false },
            { name: 'n2', type: TYPES.NUMBER, optional: false },
        ],
        resultType: TYPES.NUMBER,
    },
    {
        file: 'split',
        path: 'calculator',
        params: [
            { name: 'n1', type: TYPES.NUMBER, optional: false },
            { name: 'n2', type: TYPES.NUMBER, optional: false },
        ],
        resultType: TYPES.NUMBER,
    },
    {
        file: 'rest',
        path: 'calculator',
        params: [
            { name: 'n1', type: TYPES.NUMBER, optional: false },
            { name: 'n2', type: TYPES.NUMBER, optional: false },
        ],
        resultType: TYPES.NUMBER,
    },
];
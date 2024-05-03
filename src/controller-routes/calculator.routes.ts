import { IFileFunction, TYPES } from "sco-backend-fw";

export const CALCULATOR_ROUTES_PATH: string = 'calculator';

export const CALCULATOR_ROUTES_NAMES = {
    ADD: 'add',
    SUBTRACT: 'subtract',
    MULTIPLY: 'multiply',
    SPLIT: 'split',
    REST: 'rest',
};

export const CALCULATOR_ROUTES: IFileFunction[] = [
    {
        file: CALCULATOR_ROUTES_NAMES.ADD,
        path: CALCULATOR_ROUTES_PATH,
        params: [
            { name: 'n1', type: TYPES.NUMBER, optional: false },
            { name: 'n2', type: TYPES.NUMBER, optional: false },
        ],
        resultType: TYPES.NUMBER,
        validationPipe: false,
        validationPassport: false,
    },
    {
        file: CALCULATOR_ROUTES_NAMES.SUBTRACT,
        path: CALCULATOR_ROUTES_PATH,
        params: [
            { name: 'n1', type: TYPES.NUMBER, optional: false },
            { name: 'n2', type: TYPES.NUMBER, optional: false },
        ],
        resultType: TYPES.NUMBER,
        validationPipe: false,
        validationPassport: false,
    },
    {
        file: CALCULATOR_ROUTES_NAMES.MULTIPLY,
        path: CALCULATOR_ROUTES_PATH,
        params: [
            { name: 'n1', type: TYPES.NUMBER, optional: false },
            { name: 'n2', type: TYPES.NUMBER, optional: false },
        ],
        resultType: TYPES.NUMBER,
        validationPipe: false,
        validationPassport: false,
    },
    {
        file: CALCULATOR_ROUTES_NAMES.SPLIT,
        path: CALCULATOR_ROUTES_PATH,
        params: [
            { name: 'n1', type: TYPES.NUMBER, optional: false },
            { name: 'n2', type: TYPES.NUMBER, optional: false },
        ],
        resultType: TYPES.NUMBER,
        validationPipe: false,
        validationPassport: false,
    },
    {
        file: CALCULATOR_ROUTES_NAMES.REST,
        path: CALCULATOR_ROUTES_PATH,
        params: [
            { name: 'n1', type: TYPES.NUMBER, optional: false },
            { name: 'n2', type: TYPES.NUMBER, optional: false },
        ],
        resultType: TYPES.NUMBER,
        validationPipe: false,
        validationPassport: false,
    },
];
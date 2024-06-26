export const VALIDATION_ERRORS_CONSTANTS = {
    USERS: {
        ID: {
            NOT_EMPTY: '_id should be not empty',
            INVALID_VALUE: '_id should be string value',
        },
        NAME: {
            NOT_EMPTY: 'Name should be not empty',
            INVALID_VALUE: 'Name should be string value',
            MIN_LENGTH: 'Name minimum length is 4 characteres',
            MAX_LENGTH: 'Name maximum length is 15 characteres',
        },
        EMAIL: {
            NOT_EMPTY: 'Email should be not empty',
            INVALID_VALUE: 'Email should be string value',
            MATCHES: 'Email should be valid',
        },
        CREATED_AT: {
            NOT_EMPTY: 'Created at should be not empty',
            INVALID_VALUE: 'Created at should be Date value',
        },
        UPDATED_AT: {
            NOT_EMPTY: 'Updated at should be not empty',
            INVALID_VALUE: 'Updated at should be Date value',
        },
    },
};
    
/* Body Example 
(body: { n1: number; n2: number; }) => {
    return body.n1 + body.n2;
}
*/

/* Async Example
async () => {
    return 'Hello World!';
} */

/* Providers Example
import { HttpError } from "sco-backend-fw";
import { HttpErrorsService } from "src/core/shared/http-errors/http-errors.service";

async (body: {

    }, 
    appService: {
        httpErrorsService? : HttpErrorsService;
    },
) => {
    return {
        type: appService.httpErrorsService.HTTP_ERRORS_TYPES.HTTP_EXCEPTION, 
        message: appService.httpErrorsService.HTTP_ERRORS_CONSTANTS.USERS.USER_NAME_ALREADY_EXISTS, 
        code: appService.httpErrorsService.HTTP_STATUS.CONFLICT
    } as HttpError;

    // Decostuction providers example
    const { httpErrorsService } = appService;
    return {
        type: httpErrorsService.HTTP_ERRORS_TYPES.HTTP_EXCEPTION, 
        message: httpErrorsService.HTTP_ERRORS_CONSTANTS.USERS.USER_NAME_ALREADY_EXISTS, 
        code: httpErrorsService.HTTP_STATUS.CONFLICT
    } as HttpError;
} */

async () => {
    return 'Hello World!';
}
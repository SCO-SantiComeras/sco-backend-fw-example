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
    providers: {
        httpErrorsService? : HttpErrorsService;
    },
) => {
    return {
        type: providers.httpErrorsService.HTTP_ERRORS_TYPES.HTTP_EXCEPTION, 
        message: providers.httpErrorsService.HTTP_ERRORS_CONSTANTS.USERS.USER_NAME_ALREADY_EXISTS, 
        code: providers.httpErrorsService.HTTP_STATUS.CONFLICT
    } as HttpError;

    // Decostuction providers example
    const { httpErrorsService } = providers;
    return {
        type: httpErrorsService.HTTP_ERRORS_TYPES.HTTP_EXCEPTION, 
        message: httpErrorsService.HTTP_ERRORS_CONSTANTS.USERS.USER_NAME_ALREADY_EXISTS, 
        code: httpErrorsService.HTTP_STATUS.CONFLICT
    } as HttpError;
} */

async () => {
    return 'Hello World!';
}
import { HTTP_ERRORS } from "sco-backend-fw";

export const HTTP_ERRORS_CONSTANTS = {
  ...HTTP_ERRORS,
  WEBSOCKETS: {
    UNNABLE_SEND_NOTIFICATION_EVENT: 'Unnable to send websocket notification event',
  },
  MONGODB: {
    MONGODB_OPTIONS_NOT_PROVIDED: 'MongoDB options not provided',
  },
  USERS: {
    USER_NAME_ALREADY_EXISTS: 'User name already exists',
    USER_EMAIL_ALREADY_EXISTS: 'User email already exists',
    USER_NOT_FOUND: 'User not found',
    USER_UNNABLE_CREATE: 'Unnable to create user',
    USER_UNNABLE_UPDATE: 'Unnable to update user',
    USER_UNNABLE_DELETE: 'Unnable to delete user',
  },
}
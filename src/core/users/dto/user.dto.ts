import { VALIDATION_ERRORS_CONSTANTS } from '../../shared/validation-errors/validation-errors.constants';
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class UserDto {
  @IsOptional()
  @IsString({ message: VALIDATION_ERRORS_CONSTANTS.USERS.ID.INVALID_VALUE })
  _id?: string;

  @IsNotEmpty({ message: VALIDATION_ERRORS_CONSTANTS.USERS.NAME.NOT_EMPTY })
  @IsString({ message: VALIDATION_ERRORS_CONSTANTS.USERS.NAME.INVALID_VALUE })
  @MinLength(4, { message: VALIDATION_ERRORS_CONSTANTS.USERS.NAME.MIN_LENGTH })
  @MaxLength(15, { message: VALIDATION_ERRORS_CONSTANTS.USERS.NAME.MAX_LENGTH })
  name: string;

  @IsNotEmpty({ message: VALIDATION_ERRORS_CONSTANTS.USERS.EMAIL.NOT_EMPTY })
  @IsString({ message: VALIDATION_ERRORS_CONSTANTS.USERS.EMAIL.INVALID_VALUE })
  @Matches(
    /.+@.+\..+/,
    { message: VALIDATION_ERRORS_CONSTANTS.USERS.EMAIL.MATCHES }
  )
  email: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: VALIDATION_ERRORS_CONSTANTS.USERS.CREATED_AT.INVALID_VALUE })
  createdAt?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: VALIDATION_ERRORS_CONSTANTS.USERS.UPDATED_AT.INVALID_VALUE })
  updatedAt?: Date;
}

import { Injectable } from "@nestjs/common";
import { HttpErrorsService } from "./core/shared/http-errors/http-errors.service";
import { UsersService } from "./modules/users/users.service";

@Injectable()
export class AppService {

    /* Add Own Dependencies */
    constructor(
        private readonly httpErrorsService: HttpErrorsService,
        private readonly usersService: UsersService,
    ) {}
}

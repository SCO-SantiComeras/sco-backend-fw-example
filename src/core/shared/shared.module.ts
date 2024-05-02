import { Module } from "@nestjs/common";
import { HttpErrorsService } from "./http-errors/http-errors.service";
import { ValidationErrorsService } from "./validation-errors/validation-errors.service";

@Module({
    imports: [

    ],
    providers: [
        HttpErrorsService,
        ValidationErrorsService,
    ],
    exports: [
        HttpErrorsService,
        ValidationErrorsService,
    ]
})
export class SharedModule { }

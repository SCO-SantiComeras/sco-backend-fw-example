import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { SharedModule } from "../../core/shared/shared.module";
import { UsersPopulationService } from "./users-population.service";

@Module({
  imports: [
    SharedModule,
  ],
  providers: [
    UsersService,
    UsersPopulationService,
  ],
  exports: [
    UsersService,
    UsersPopulationService,
  ]
})
export class UsersModule { }

import { Injectable } from "@nestjs/common";
import { FileFunctionsService, ICore, IFileFunction, TYPES } from "sco-backend-fw";
import { CALCULATOR_ROUTES } from "../controller-routes/calculator.routes";
import { GLOBAL_ROUTES } from "../controller-routes/global.routes";
import { USERS_ROUTES } from "../controller-routes/users.routes";

@Injectable()
export class CoreService implements ICore {

  constructor(private readonly fileFunctionsService: FileFunctionsService) {
    this.fileFunctionsService.setFileFunctions(this.createControllerRoutes());
  }
  
  /* Function Files Constants */
  createControllerRoutes(): IFileFunction[] {
    return [
      /* Global */
      ...GLOBAL_ROUTES,

      /* Calculator */
      ...CALCULATOR_ROUTES,
  
      /* Users */
      ...USERS_ROUTES,
    ];
  }

  /* Validation Passport */ 
  async validationPassportCallback(authorization: string): Promise<boolean> {
    if (!authorization) {
      return false;
    }

    return true;
  }

  /* Types */
  setCustomTypes(): any {
    return {
      ...TYPES, // Default Types, you are not required to set default types
    }
  }
}
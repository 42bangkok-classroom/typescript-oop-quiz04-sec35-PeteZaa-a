import { Get } from "@nestjs/common";
import { UserService } from "./user.service";



export class UserController {

    constructor(private readonly userService: UserService) { }
    @Get("users")
    test() {
        return this.userService.test() 
    }

}
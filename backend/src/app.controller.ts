import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController{
    @Get()
    getUser(){
        return "I am a user";
    }
}
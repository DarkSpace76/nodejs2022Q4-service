/* eslint-disable prettier/prettier */
import { BadRequestException } from "@nestjs/common";
import { MyLogger } from "./my.loger.service";

export class MyBadRequestException extends BadRequestException {
    constructor(response: string | Record<string, any>, private myLogger: MyLogger) {
        super(response);
        this.myLogger.error(`status code: ${this.getStatus()}`);
        this.myLogger.error(this.message);
    }
}
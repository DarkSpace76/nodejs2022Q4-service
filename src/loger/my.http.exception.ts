/* eslint-disable prettier/prettier */
import { HttpException } from "@nestjs/common";
import { MyLogger } from "./my.loger.service";

export class MyHttpException extends HttpException {
    constructor(response: string | Record<string, any>, status: number, private myLogger: MyLogger) {
        super(response, status);
        this.myLogger.error(`status code: ${status}`);
        this.myLogger.error(this.message);
    }
}
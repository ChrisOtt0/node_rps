import { GridFSBucketReadStream } from "mongodb";
import { BaseHandler } from "./BaseHandler";
import { Guard } from "./Guard";

class CheckAuth extends BaseHandler {
    handle(request: any, response: any): any {
        if (Guard.hasSession(request)) {
            super.getNext().handle(request, response);
        }
    }

}

export {CheckAuth}
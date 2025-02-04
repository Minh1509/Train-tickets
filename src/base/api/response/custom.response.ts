import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { Reflector } from "@nestjs/core";




@Injectable()
export class CustomResponseInterceptor implements NestInterceptor {
    constructor(private reflect: Reflector) { }

    //   private getCustomStatusCode(statusCode: number): number {
    //     const statusCodeMapping = {
    //       200: 1000,
    //       201: 1001,
    //       202: 1002,
    //       204: 1004,
    //       400: 1001,
    //       404: 1002,
    //       500: 1003,
    //     };
    //     return statusCodeMapping[statusCode] || statusCode;
    //   }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> | Promise<Observable<any>> {
        const responseMessage = this.reflect.get<string>('response_message', context.getHandler())
        const statusCode = context.switchToHttp().getResponse().statusCode

        return next.handle().pipe(map((response) => ({
            status: 'success',
            statusCode: statusCode, //this.getCustomStatusCode(statusCode),
            message: responseMessage || "",
            data: response.data || {},
            meta: response.metadata || {},
            timestamp: new Date().toISOString(),
        })))

    }
}
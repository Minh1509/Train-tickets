import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import * as _ from "lodash";

export interface IAddParamsToBodyArgs {
    paramSource?: string
    paramDest?: string
    injectDataTo?: string;
}


function modifyRequest(req: Record<string, any>, args: IAddParamsToBodyArgs) {
    const params = req.params;
    const { paramSource, paramDest, injectDataTo = 'body' } = args;

    const setValue = !paramSource ? params : _.get(params, paramSource, null);
    const setKey = paramDest
        ? paramDest
        : paramSource;

    _.set(req[injectDataTo], setKey, setValue);
    return req[injectDataTo];
}

// Body
export const AddParamToBody = createParamDecorator((args: IAddParamsToBodyArgs, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return modifyRequest(req, args);
});
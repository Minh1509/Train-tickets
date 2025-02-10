import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as _ from 'lodash';

interface IAddUserToBodyArgs {
    paramSource?: string,
    paramDest?: string;
}

// Body
export const AddUserToBody = createParamDecorator(
    (args: IAddUserToBodyArgs, ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest();
        const { paramSource, paramDest } = args;

        if (!req.user || !req.user[paramSource]) return req.body;

        const key = paramDest ?? paramSource;
        req.body[key] = req.user[paramSource];

        return req.body;
    },
);

// Query


interface IAddUserToQueryArgs {
    paramSource?: string
    paramDest?: string;
}

export const AddUserToQuery = createParamDecorator(
    (args: IAddUserToQueryArgs, ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest();
        const { paramSource, paramDest } = args;

        if (!req.user || !req.user[paramSource]) return req.query;

        const key = paramDest ?? paramSource;
        req.query[key] = req.user[paramSource];

        return req.query;
    },
);

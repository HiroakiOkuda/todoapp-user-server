import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth.service';

@Injectable()
export class GqlAuthGuard extends AuthGuard('local') {
  constructor(private auth: AuthService) {
    super();
  }

  getRequest(context: ExecutionContext): any {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext();
    request.body = ctx.getArgs();
    console.log(ctx.getArgs());
    return request;
  }
}

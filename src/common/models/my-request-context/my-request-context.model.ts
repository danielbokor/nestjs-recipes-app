import { RequestContext } from '@medibloc/nestjs-request-context';

export class MyRequestContext extends RequestContext {
  params: any;
  query: any;
  headers: any;
  body: any;
}

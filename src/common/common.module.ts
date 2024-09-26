import { RequestContextModule } from '@medibloc/nestjs-request-context';
import { Module } from '@nestjs/common';
import { MyRequestContext } from './models/my-request-context/my-request-context.model';

@Module({
  imports: [
    RequestContextModule.forRoot({
      contextClass: MyRequestContext,
      // isGlobal: true,
    }),
  ],
})
export class CommonModule {}

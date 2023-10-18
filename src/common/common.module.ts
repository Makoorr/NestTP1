import { Global, Module } from '@nestjs/common';
import { CommonService } from './common.service';

@Global()
@Module({
    imports: [],
    controllers: [],
    providers: [CommonService],
    exports: [],
})
export class CommonModule {

}

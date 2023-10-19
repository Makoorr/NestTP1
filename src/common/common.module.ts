import { Global, Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { v4 as uuidv4 } from 'uuid'

@Global()
@Module({
    imports: [],
    controllers: [],
    providers: [
        {
            provide: 'UUID',
            useValue: uuidv4,
        },
        CommonService
    ],
    exports: [],
})
export class CommonModule {

}

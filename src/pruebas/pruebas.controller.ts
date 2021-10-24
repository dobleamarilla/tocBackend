import { Controller, Post } from '@nestjs/common';
import { ese } from '../sockets.gateway';

@Controller('pruebas')
export class PruebasController {
    @Post('test')
    test() {
        ese.test();
    }
}

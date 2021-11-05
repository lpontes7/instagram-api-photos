import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger';
import { InstagramService } from './instagram.service';

@Controller('instagram')
export class InstagramController {
  constructor(private readonly instagramService: InstagramService) {}

  @ApiTags('Instagram')
  @Get()
  getHello(): string {
    return this.instagramService.getHello();
  }
}

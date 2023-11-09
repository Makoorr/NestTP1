import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';

@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Post()
  create(@Body() createCvDto: CreateCvDto) {
    return this.cvService.create(createCvDto);
  }

  @Get()
  findAll(
    @Body() body: {userId: number}
  ) {
    return this.cvService.findAll(body.userId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCvDto: UpdateCvDto) {
    return this.cvService.update(+id, updateCvDto);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Body() body: {userId: number}
    ) {
    const data = {
      cvId: +id,
      userId: body.userId
    }
    return this.cvService.remove(data);
  }
}

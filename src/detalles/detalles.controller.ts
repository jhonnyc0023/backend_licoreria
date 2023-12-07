import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DetallesService } from './detalles.service';
import { CreateDetalleDto } from './dto/create-detalle.dto';
import { UpdateDetalleDto } from './dto/update-detalle.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('detalles')
@Controller('detalles')
export class DetallesController {
  constructor(private readonly detallesService: DetallesService) {}

  @Post()
  create(@Body() createDetalleDto: CreateDetalleDto) {
    return this.detallesService.create(createDetalleDto);
  }

  @Get()
  findAll() {
    return this.detallesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detallesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetalleDto: UpdateDetalleDto) {
    return this.detallesService.update(+id, updateDetalleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detallesService.remove(+id);
  }
}

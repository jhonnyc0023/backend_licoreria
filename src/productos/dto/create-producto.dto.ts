import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateProductoDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nombre no de ser vacío' })
  @IsString({ message: 'El campo nombre debe ser de tipo cadena' })
  @MaxLength(50, {
    message: 'El campo nombre no debe ser mayor a 50 caracteres',
  })
  readonly nombre: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo precio debe estar definido' })
  @IsNumber({}, { message: 'El campo precio debe ser de tipo numérico' })
  readonly precio: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo precio debe estar definido' })
  @IsNumber({}, { message: 'El campo precio debe ser de tipo numérico' })
  readonly stock: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo id categoria debe estar definido' })
  @IsNumber({}, { message: 'El campo id categoria debe ser de tipo numérico' })
  readonly idCategoria: number;
}

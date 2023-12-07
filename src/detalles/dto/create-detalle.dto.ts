import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDetalleDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo cantidad no de ser vacío' })
  @IsNumber({}, { message: 'El campo cantidad debe ser de tipo numérico' })
  readonly cantidad: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo precio unitario no de ser vacío' })
  @IsNumber(
    {},
    { message: 'El campo precio unitario debe ser de tipo numérico' },
  )
  readonly precioUnitario: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo total veta no de ser vacío' })
  @IsNumber(
    {},
    { message: 'El campo precio unitario debe ser de tipo numérico' },
  )
  readonly totalVenta: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo idVEnta debe estar definido' })
  @IsNumber({}, { message: 'El campo idVEnta debe ser de tipo numérico' })
  readonly idCliente: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo idProducto debe estar definido' })
  @IsNumber({}, { message: 'El campo idProducto debe ser de tipo numérico' })
  readonly idProducto: number;
}

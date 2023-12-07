import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDetalleDto } from './dto/create-detalle.dto';
import { UpdateDetalleDto } from './dto/update-detalle.dto';
import { Detalle } from './entities/detalle.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from 'src/productos/entities/producto.entity';
import { Cliente } from 'src/clientes/entities/cliente.entity';

@Injectable()
export class DetallesService {
  constructor(
    @InjectRepository(Detalle)
    private detalleRepository: Repository<Detalle>,
  ) {}

  async create(createDetalleDto: CreateDetalleDto): Promise<Detalle> {
    const existeDetalle = await this.detalleRepository.findOneBy({
      cantidad: createDetalleDto.cantidad.valueOf(),
      precioUnitario: createDetalleDto.precioUnitario.valueOf(),
      totalVenta: createDetalleDto.totalVenta.valueOf(),
      cliente: { id: createDetalleDto.idCliente },
      producto: { id: createDetalleDto.idProducto },
    });

    if (existeDetalle) {
      throw new ConflictException('el detalle de venta  ya existe');
    }

    return this.detalleRepository.save({
      cantidad: createDetalleDto.cantidad.valueOf(),
      precioUnitario: createDetalleDto.precioUnitario,
      totalVenta: createDetalleDto.totalVenta,
      cliente: { id: createDetalleDto.idCliente },
      producto: { id: createDetalleDto.idProducto },
    });
  }

  async findAll(): Promise<Detalle[]> {
    return this.detalleRepository.find({
      relations: ['cliente', 'producto'],
    });
  }

  async findOne(id: number): Promise<Detalle> {
    const existedetalle = await this.detalleRepository.findOne({
      where: { id },
      relations: ['cliente', 'producto'],
    });
    if (!existedetalle) {
      throw new NotFoundException(`No existe detalles de venta ${id}`);
    }
    return existedetalle;
  }

  async update(
    id: number,
    updateDetalleDto: UpdateDetalleDto,
  ): Promise<Detalle> {
    const detalles = await this.detalleRepository.findOneBy({ id });
    if (!detalles) {
      throw new NotFoundException(`No existe detalles de venta ${id}`);
    }
    const detalleUpdate = Object.assign(detalles, updateDetalleDto);
    detalleUpdate.cliente = {
      id: updateDetalleDto.idCliente,
    } as Cliente;
    detalleUpdate.producto = {
      id: updateDetalleDto.idProducto,
    } as Producto;
    return this.detalleRepository.save(detalleUpdate);
  }

  async remove(id: number) {
    const detalles = await this.detalleRepository.findOneBy({ id });
    if (!detalles) {
      throw new NotFoundException(`No existe detalles de venta ${id}`);
    }
    return this.detalleRepository.delete(id);
  }
}

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    const existeCliente = await this.clienteRepository.findOneBy({
      nombre: createClienteDto.nombre,
      apellido: createClienteDto.apellido,
      cedulaIdentidad: createClienteDto.cedulaIdentidad,
    });
    if (existeCliente) {
      throw new ConflictException('el cliente ya existe');
    }
    return this.clienteRepository.save({
      nombre: createClienteDto.nombre.trim(),
      apellido: createClienteDto.apellido.trim(),
      cedulaIdentidad: createClienteDto.cedulaIdentidad.trim(),
    });
  }

  async findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find();
  }

  async findOne(id: number): Promise<Cliente> {
    const existeCliente = await this.clienteRepository.findOneBy({ id });
    if (!existeCliente) {
      throw new NotFoundException(`No existe el cliente ${id}`);
    }
    return existeCliente;
  }

  async update(
    id: number,
    UpdateClienteDto: UpdateClienteDto,
  ): Promise<Cliente> {
    const Cliente = await this.clienteRepository.findOneBy({ id });
    if (!Cliente) {
      throw new NotFoundException(`No existe el cliente ${id}`);
    }
    const ClienteUpdate = Object.assign(Cliente, UpdateClienteDto);
    return this.clienteRepository.save(ClienteUpdate);
  }

  async remove(id: number) {
    const existeCliente = await this.clienteRepository.findOneBy({ id });
    if (!existeCliente) {
      throw new NotFoundException(`No existe el cliente ${id}`);
    }
    return this.clienteRepository.delete(id);
  }
}

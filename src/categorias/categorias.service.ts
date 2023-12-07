import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}
  async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    const existeCategoria = await this.categoriaRepository.findOneBy({
      nombre: createCategoriaDto.nombre,
    });

    if (existeCategoria) {
      throw new ConflictException('la categoria  ya existe');
    }
    return this.categoriaRepository.save({
      nombre: createCategoriaDto.nombre.trim(),
      descripcion: createCategoriaDto.descripcion.trim(),
    });
  }

  async findAll(): Promise<Categoria[]> {
    return this.categoriaRepository.find();
  }

  async findOne(id: number): Promise<Categoria> {
    const existeCategoria = await this.categoriaRepository.findOneBy({ id });
    if (!existeCategoria) {
      throw new NotFoundException(`No existe la categoria ${id}`);
    }
    return existeCategoria;
  }

  async update(
    id: number,
    updateCategoriaDto: UpdateCategoriaDto,
  ): Promise<Categoria> {
    const Categoria = await this.categoriaRepository.findOneBy({ id });
    if (!Categoria) {
      throw new NotFoundException(`No existe la categoria ${id}`);
    }
    const categoriaUpdate = Object.assign(Categoria, updateCategoriaDto);
    return this.categoriaRepository.save(categoriaUpdate);
  }

  async remove(id: number) {
    const existeCategoria = await this.categoriaRepository.findOneBy({ id });
    if (!existeCategoria) {
      throw new NotFoundException(`No existe la categoria ${id}`);
    }
    return this.categoriaRepository.delete(id);
  }
}

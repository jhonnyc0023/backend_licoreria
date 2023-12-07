import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Detalle } from 'src/detalles/entities/detalle.entity';

import {
  Column,
  CreateDateColumn,
  Decimal128,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  nombre: string;

  @Column()
  precio: number;

  @Column()
  stock: number;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @ManyToOne(() => Categoria, (categoria) => categoria.productos)
  @JoinColumn({ name: 'id_categoria', referencedColumnName: 'id' })
  categoria: Categoria;

  @OneToMany(() => Detalle, (detalle) => detalle.producto)
  detalles: Detalle[];
}

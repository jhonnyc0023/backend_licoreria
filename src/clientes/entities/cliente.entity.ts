import { Detalle } from 'src/detalles/entities/detalle.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  nombre: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  apellido: string;

  @Column({
    name: 'cedula_identidad',
    type: 'varchar',
    length: 12,
    nullable: false,
  })
  cedulaIdentidad: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @OneToMany(() => Detalle, (detalles) => detalles.cliente)
  detalles: Detalle[];
}

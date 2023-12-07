import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('detalles-venta')
export class Detalle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cantidad: number;

  @Column({ name: 'precio_unitario' })
  precioUnitario: number;

  @Column({ name: 'total_venta' })
  totalVenta: number;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @ManyToOne(() => Cliente, (cliente) => cliente.detalles)
  @JoinColumn({ name: 'id_cliente', referencedColumnName: 'id' })
  cliente: Cliente;

  @ManyToOne(() => Producto, (producto) => producto.detalles)
  @JoinColumn({ name: 'id_producto', referencedColumnName: 'id' })
  producto: Producto;
}

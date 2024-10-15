import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Cart } from './cart.entity'; // Import your Cart entity

@Entity('menu')
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('json')
  items: { [key: string]: any }[]; // Define menu items structure as JSON or adjust as needed

  @OneToMany(() => Cart, (cart) => cart.menu)
  carts: Cart[];
}

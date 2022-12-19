import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Music {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  author: string;

  @Column()
  duration: number;

  @Column()
  genre: string;
}

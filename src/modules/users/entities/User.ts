import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

export enum Pronouns {
  'el@/del@/-@export',
  'ela/dela/-a',
  'ele/dele/-e',
  'ele/dele/-o',
  'elu/delu/-u',
  'elx/delx/-x',
  'ile/dile',
}

export enum Gender {
  masculino,
  feminino,
  nao_binario,
}

@Entity('users')
export class User {
  @PrimaryColumn()
  id?: string;

  @Column()
  email: string;

  @Column()
  age: number;

  @Column()
  password: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

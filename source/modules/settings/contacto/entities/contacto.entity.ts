import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('contacto')
export class Contacto {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column()
	nombre: string;

	@Column()
	phone: string;

	@Column()
	email: string;

	@Column('text')
	mensaje: string;
}

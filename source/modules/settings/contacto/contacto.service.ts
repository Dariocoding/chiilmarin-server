import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from 'source/mail/mail.service';
import { Repository } from 'typeorm';
import { Contacto } from './entities/contacto.entity';

@Injectable()
export class ContactoService {
	constructor(
		@InjectRepository(Contacto)
		private contactoRepository: Repository<Contacto>,
		private mailService: MailService
	) {}
	async create(data: Contacto) {
		const contacto = await this.contactoRepository.save(data);
		await this.mailService.formContacto(contacto);
	}
}

import { Controller, Post, Body } from '@nestjs/common';
import { ContactoService } from './contacto.service';
import { Contacto } from './entities/contacto.entity';

@Controller('contacto')
export class ContactoController {
	constructor(private readonly contactoService: ContactoService) {}

	@Post()
	async create(@Body() data: Contacto) {
		await this.contactoService.create(data);
		return {
			msg: 'Ha mandado su mensaje correctamente al equipo de ChillMarin, pronto revisaremos su mensaje!',
		};
	}
}

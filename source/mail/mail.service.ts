import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ForgetPassword } from './interfaces';
import { Contacto } from 'source/modules/settings/contacto/entities/contacto.entity';

@Injectable()
export class MailService {
	constructor(private mailerService: MailerService) {}

	async formContacto(contacto: Contacto) {
		const config = { nombre: 'Chillmarin' };
		await this.mailerService.sendMail({
			to: process.env.EMAIL_APP_USER,
			from: `"${config.nombre}" <${process.env.EMAIL_APP_USER}>`,
			subject: `Ha alguien ha tratado de contactar en ${config.nombre}`,
			template: __dirname + '/templates/enviarMensajeContacto',
			context: { contacto, config },
		});
	}
}

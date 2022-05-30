import { PDFModuleOptions, PDFOptionsFactory } from '@t00nday/nestjs-pdf';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PdfConfigService implements PDFOptionsFactory {
	createPdfOptions(): PDFModuleOptions {
		return {
			view: {
				root: '../public/pdf/',
				engine: 'handlebars',
				extension: 'hbs',
			},
		};
	}
}

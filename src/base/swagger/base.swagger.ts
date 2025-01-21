/* eslint-disable prettier/prettier */
import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { config } from "src/config/config.service";

export function InitSwagger(app: INestApplication) {
    const SR = config.SR;
    const configSwagger = new DocumentBuilder()
        .setTitle(SR.PRODUCT_NAME)
        .setDescription("Decription document for Rest API")
        .setVersion(SR.VERSION)
        .setContact(SR.SIGNATURE, SR.SUPPORT.URL, SR.SUPPORT.EMAIL)
        .addServer(config.HOST, 'Currennt Server')
        .addServer('https://' + config.PUBLIC_IP, 'Current server throw nginx')
        .addServer('https://' + config.DOMAIN, 'Server domain throw nginx')
        .addBearerAuth()
        .build()

    const document = SwaggerModule.createDocument(app, configSwagger);
    SwaggerModule.setup('apidoc', app, document);
}
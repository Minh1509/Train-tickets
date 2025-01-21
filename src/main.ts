import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { config } from "./config/config.service";
import { InitSwagger } from "./base/swagger/base.swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = config.PORT;

  // CORS
  app.enableCors(config.CORS);

  // Open API Swagger
  InitSwagger(app);

  await app.listen(port ?? 3000);
  console.log("App in running on port::" + port);
}
bootstrap();

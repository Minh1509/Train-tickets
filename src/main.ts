import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { config } from "./config/config.service";
import { InitSwagger } from "./base/swagger/base.swagger";
import * as morgan from 'morgan';
import helmet from 'helmet';
import { AllExceptionsFilter } from "@base/api/exceptions";
import { ValidationPipe } from "@nestjs/common";
import { useContainer } from "class-validator";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = config.PORT;

  app.setGlobalPrefix("api/v1");
  // middleware
  app.use(morgan('dev'));
  app.use(helmet());

  // CORS
  app.enableCors(config.CORS);

  // Open API Swagger
  InitSwagger(app);

  // pipe validate
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }))

  // validate
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // Exception
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  await app.listen(port ?? 3000);
  console.log("App in running on port::" + port);
}
bootstrap();

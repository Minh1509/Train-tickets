import { HttpAdapterHost, NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as morgan from 'morgan';
import helmet from 'helmet';
import { AllExceptionsFilter, HttpExceptionFilter } from "@base/api/exceptions";
import { ValidationPipe } from "@nestjs/common";
import { useContainer } from "class-validator";
import { InitSwagger } from "@base/swagger/base.swagger";
import { config } from "@config";
import { CustomResponseInterceptor } from "@base/api/response/custom.response";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = config.PORT;
  const reflector = app.get(Reflector)

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

  // Interceptor
  app.useGlobalInterceptors(new CustomResponseInterceptor(reflector));

  // validate
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // Exception
  const httpAdapterHost = app.get(HttpAdapterHost)
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost.httpAdapter),);


  await app.listen(port ?? 3000);
  console.log("App in running on port::" + port);
}
bootstrap();

/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";
import * as dotenv from "dotenv";
import * as ip from 'ip';

dotenv.config();
process.env.NODE_ENV = process.env.NODE_ENV ?? "dev";
// const customEnvName = process.env.DOT_ENV_SUFFIX ?? process.env.NODE_ENV;

console.log("Using NODE_ENV: " + process.env.NODE_ENV);
// console.log('Using customEnvName: ' + customEnvName);

const env = Object.assign({}, process.env);
process.env = {
  DEBUG: env.DEBUG,
  NODE_ENV: env.NODE_ENV,
};

@Injectable()
export class ConfigService {

  OTP_EXPIRE: number = +env.OTP_EXPIRE

  // DB Mongo
  DB_URI: string = env.DB_URI;

  // DB mysql
  DB_HOST: string = env.DB_HOST;
  DB_PORT: number = +env.DB_PORT;
  DB_USERNAME: string = env.DB_USERNAME;
  DB_PASSWORD: string = env.DB_PASSWORD;
  DB_NAME: string = env.DB_NAME;
  DB_TYPE: string = env.TYPE;

  // Redis
  REDIS_HOST: string = env.REDIS_HOST;
  REDIS_PORT: number = +env.REDIS_PORT;

  // JWT
  JWT_SECRET = env.JWT_SECRET
  AC_TOKEN_EXPIRED = env.AC_TOKEN_EXPIRED
  REF_TOKEN_EXPIRED = env.REF_TOKEN_EXPIRED

  // Cookies
  COOKIE_EXPIRED = +env.COOKIE_EXPIRED

  // SPECIAL
  SR = {
    PRODUCT_NAME: 'Bán vé tàu',
    VERSION: 'v1.0',
    SIGNATURE: 'Deverlop train ticket sales',
    SUPPORT: {
      URL: '',
      EMAIL: 'nguyenquangminh15092003@gmail.com'
    }
  }

  // NETWORD
  LOCAL_IP = ip.address();
  PUBLIC_IP = env.PUBLIC_IP ?? this.LOCAL_IP;
  PORT = parseInt(env.PORT) || 3500;
  HOST = `http://${this.LOCAL_IP}:${this.PORT}`;
  DOMAIN = env.DOMAIN ?? 'https://nguyenquangminh.com';


  // CORS
  CORS: CorsOptions = {
    origin: true,
    methods: ['POST', 'PUT', 'GET', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    allowedHeaders: 'content-type, authorization'
  };

  //Providers

  // Nodemailer
  MAIL_HOST: string = env.MAIL_HOST
  MAIL_PORT: number = +env.MAIL_PORT
  MAIL_USER: string = env.MAIL_USER
  MAIL_PASS: string = env.MAIL_PASS

  //SMS TWILIO
  TWILIO_ACCOUNT_SID: string = env.TWILIO_ACCOUNT_SID
  TWILIO_AUTH_TOKEN: string = env.TWILIO_AUTH_TOKEN
  TWILIO_FROM: string = env.TWILIO_FROM
  TWILIO_TO: string = env.TWILIO_TO

  // End providers
}

export const config = new ConfigService();

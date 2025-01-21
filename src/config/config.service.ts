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

  // DB
  DB_URI = env.DB_URI;


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
    origin: "*",
    methods: ['POST', 'PUT', 'GET', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    allowedHeaders: 'content-type, authorization'
  }
}

export const config = new ConfigService();

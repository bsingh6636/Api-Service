import { config } from 'dotenv'

config({ path: './config.env' })

export const DEVELOPMENT_MODE = process.env.DEVELOPMENT_MODE;

export const FRONTENDURL = [
  'https://cors-proxy.brijeshdev.space',
  'https://cors-proxy.brijeshkushwaha.com.np',
  'https://cors-proxy2.brijeshkushwaha.com.np',
];
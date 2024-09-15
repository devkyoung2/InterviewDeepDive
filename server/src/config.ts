import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const required = <T>(key: string, defaultValue?: T) => {
  const value = process.env[key] || defaultValue;

  if (!value) throw new Error(`Key Error : ${key} is undefined`);

  return value;
};

const CONFIG = {
  DB: {
    HOST: required('DB_HOST', 'localhost'),
    PORT: required('DB_PORT', '8080'),
  },
};

export default CONFIG;

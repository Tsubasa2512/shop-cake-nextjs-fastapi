import { Role } from './role';

export interface User {
    name: string;
    email:string;
    is_active:boolean;
    id: number;
    role:Role
  }
  
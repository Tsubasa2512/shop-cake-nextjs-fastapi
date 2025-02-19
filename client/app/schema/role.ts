import { Permission } from "./permission";

export interface Role {
    id: number;
    name: string;
    permissions: Permission[];  
}

export interface CreateRole {
    name: string;
    permission_ids: number[]; 
}

export interface UpdateRole {
    name?: string; 
    permission?: Permission[]; 
}
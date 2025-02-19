import { Type } from './type';

export interface Menu {
    id: number;
    name: string;
    index_menu: number;
    image: string | null;
    is_active: boolean;
    slug: string;
    type: Type;
  }
  
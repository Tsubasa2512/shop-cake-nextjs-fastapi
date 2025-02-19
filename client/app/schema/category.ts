import { Menu } from './menu';

export interface Category {
    id: number;
    name: string;
    slug: string;
    is_active: boolean;
    image: string | null;
    description: string | null;
    menu: Menu;
}
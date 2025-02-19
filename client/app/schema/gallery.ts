import { Category } from "./category";

export interface Gallery{
    id: number;
    name: string;
    slug: string;
    is_active: boolean;
    image: string | null;
    intro: string | null;
    category: Category;
}
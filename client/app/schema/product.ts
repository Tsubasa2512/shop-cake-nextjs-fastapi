import { Category } from "./category";

export interface Product{
    id: number;
    name: string;
    slug: string;
    is_active: boolean;
    image: string | null;
    price:number | null;
    intro: string | null;
    description: string | null;
    keywords:string | null;
    category: Category;
}
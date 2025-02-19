import { Category } from "./category";

export interface Article{
    id: number;
    name: string;
    slug: string;
    is_active: boolean;
    image: string | null;
    intro: string | null;
    description: string | null;
    tag: string | null;
    keywords:string | null;
    category: Category;
}
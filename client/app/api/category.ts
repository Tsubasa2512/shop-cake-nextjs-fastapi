import { Category } from "../schema/category";
import envConfig from "@/app/config";

const BASE_URL = `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/category`;

export async function getCategories() {
    try {
        const res = await fetch(BASE_URL, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data: Category[] = await res.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch categories:", error);
        return [];
    }
}


export async function getCategoryById(id: number) {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        return await res.json();
    } catch (error) {
        console.error(`Failed to fetch category with id ${id}:`, error);
        return null;
    }
}

export async function createCategory(categoryData: object) {
    try {
        console.log(categoryData);
        const res = await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(categoryData),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(`HTTP error! Status: ${res.status}, Details: ${JSON.stringify(errorData)}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Failed to create category:", error);
        return null;
    }
}

export async function updateCategory(id: number, categoryData: object) {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(categoryData),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(`HTTP error! Status: ${res.status}, Details: ${JSON.stringify(errorData)}`);
        }

        return await res.json();
    } catch (error) {
        console.error(`Failed to update category with id ${id}:`, error);
        return null;
    }
}

export async function deleteCategory(id: number) {  
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        return true;
    } catch (error) {
        console.error(`Failed to delete category with id ${id}:`, error);
        return false;
    }
}
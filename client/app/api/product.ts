import { Product } from "../schema/product";
import envConfig from "@/app/config";

const BASE_URL = `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/product`;   

export async function getProducts() {
    try {
        const res = await fetch(BASE_URL, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data: Product[] = await res.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return [];
    }
}

export async function getProductById(id: number) {  
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        return await res.json();
    } catch (error) {
        console.error(`Failed to fetch product with id ${id}:`, error);
        return null;
    }
}

export async function createProduct(productData: object) {
    try {
        console.log(productData);
        const res = await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productData),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(`HTTP error! Status: ${res.status}, Details: ${JSON.stringify(errorData)}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Failed to create product:", error);
        return null;
    }
}

export async function updateProduct(id: number, productData: object) {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productData),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(`HTTP error! Status: ${res.status}, Details: ${JSON.stringify(errorData)}`);
        }

        return await res.json();
    } catch (error) {
        console.error(`Failed to update product with id ${id}:`, error);
        return null;
    }
}

export async function deleteProduct(id: number) {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        return true;
    } catch (error) {
        console.error(`Failed to delete product with id ${id}:`, error);
        return false;
    }
}
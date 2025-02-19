import { Menu } from "../schema/menu";
import envConfig from "@/app/config";

const BASE_URL = `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/menu`;


export async function getMenus() {
    try {
        const res = await fetch(BASE_URL, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data: Menu[] = await res.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch menus:", error);
        return [];
    }
}

export async function getMenuById(id: number) {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        return await res.json();
    } catch (error) {
        console.error(`Failed to fetch menu with id ${id}:`, error);
        return null;
    }
}

export async function createMenu(menuData: object) {
    try {
        const res = await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(menuData),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(`HTTP error! Status: ${res.status}, Details: ${JSON.stringify(errorData)}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Failed to create menu:", error);
        return null;
    }
}

// Cập nhật menu
export async function updateMenu(id: number, menuData: object) {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(menuData),
        });
        console.log(menuData);

        if (!res.ok) {
            const errorResponse = await res.json(); // Lấy thêm thông báo lỗi từ server
            console.error("API Error Response:", errorResponse);
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error(`Failed to update menu with id ${id}:`, error);
        return null;
    }
}

// Xóa menu
export async function deleteMenu(id: number) {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        return true;
    } catch (error) {
        console.error(`Failed to delete menu with id ${id}:`, error);
        return false;
    }
}

import { User } from "../schema/user";
import envConfig from "@/app/config";

const BASE_URL = `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/user`;


export async function getUsers() {
    try {
        const res = await fetch(BASE_URL, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data: User[] = await res.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch users:", error);
        return [];
    }
}

export async function getUserById(id: number) {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        return await res.json() as User;
    } catch (error) {
        console.error(`Failed to fetch user with id ${id}:`, error);
        return null;
    }
}

export async function createUser(userData: Partial<object>) {
    try {
        const res = await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(`HTTP error! Status: ${res.status}, Details: ${JSON.stringify(errorData)}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Failed to create user:", error);
        return null;
    }
}

export async function updateUser(id: number, userData: Partial<User>) {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });
        console.log(userData);
        let errorResponse;

        if (!res.ok) {
            try {
                errorResponse = await res.json();
            } catch {
                errorResponse = "Invalid JSON response";
            }
            console.error("API Error Response:", errorResponse);
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error(`Failed to update user with id ${id}:`, error);
        return null;
    }
}

export async function deleteUser(id: number): Promise<boolean> {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
            let errorResponse;
            try {
                errorResponse = await res.json();
            } catch {
                errorResponse = "Invalid JSON response";
            }
            console.error("API Error Response:", errorResponse);
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        return true;
    } catch (error) {
        console.error(`Failed to delete user with id ${id}:`, error);
        return false;
    }
}

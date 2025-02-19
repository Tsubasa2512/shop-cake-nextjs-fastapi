import { Role, CreateRole ,UpdateRole} from "../schema/role";
import envConfig from "@/app/config";

const BASE_URL = `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/role`;

export async function getRoles() {
    try {
        const res = await fetch(BASE_URL, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data: Role[] = await res.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch roles:", error);
        return [];
    }
}

export async function getRoleById(id: number) {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        return await res.json();
    } catch (error) {
        console.error(`Failed to fetch role with id ${id}:`, error);
        return null;
    }
}

export async function createRole(roleData: Partial<CreateRole>) {
    try {
        const res = await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(roleData),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(`HTTP error! Status: ${res.status}, Details: ${JSON.stringify(errorData)}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Failed to create role:", error);
        return null;
    }
}

export async function updateRole(id: number, roleData:  Partial<UpdateRole>) {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(roleData),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(`HTTP error! Status: ${res.status}, Details: ${JSON.stringify(errorData)}`);
        }

        return await res.json();
    } catch (error) {
        console.error(`Failed to update role with id ${id}:`, error);
        return null;
    }
}

export async function deleteRole(id: number) {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        return true;
    } catch (error) {
        console.error(`Failed to delete role with id ${id}:`, error);
        return false;
    }
}

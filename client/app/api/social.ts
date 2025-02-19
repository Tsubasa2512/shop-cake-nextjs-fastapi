import { Social } from "../schema/social";
import envConfig from "../config";

const BASE_URL = `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/social`

export async function getSocials() {
    try {
        const res = await fetch(BASE_URL, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })
        if (!res.ok) throw new Error(`HTTP error! Status:${res.status}`);
        const data: Social[] = await res.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch Social:", error);
        return [];
    }
}

export async function updateSocial(id: number, socialData: object) {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(socialData)
        });
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(`HTTP error! Status: ${res.status}, Details: ${JSON.stringify(errorData)}`)
        }
        return await res.json();
    } catch (error) {
        console.error(`Failed to update Social with id: ${id}:`, error);
        return null;
    }
}
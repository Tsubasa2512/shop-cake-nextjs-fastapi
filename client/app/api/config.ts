import { Config } from "../schema/config";
import envConfig from "../config";

const BASE_URL = `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/config`

export async function getConfigs() {
    try {
        const res = await fetch(BASE_URL, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })
        if (!res.ok) throw new Error(`HTTP error! Status:${res.status}`);
        const data: Config[] = await res.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch Config:", error);
        return [];
    }
}

export async function updateConfig(id: number, configData: object) {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(configData)
        });
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(`HTTP error! Status: ${res.status}, Details: ${JSON.stringify(errorData)}`)
        }
        return await res.json();
    } catch (error) {
        console.error(`Failed to update Config with id: ${id}:`, error);
        return null;
    }
}

import { Type } from "@/app/schema/type";
import envConfig from "@/app/config";

const BASE_URL = `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/types`;

export async function getTypes() {
    try {
        const res = await fetch(BASE_URL, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data: Type[] = await res.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch types:", error);
        return [];
    }
}

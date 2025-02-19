// api/role.ts

export async function getPermissions() {
    const BASE_URL = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/permission`;
    try {
        const res = await fetch(BASE_URL);
        if (!res.ok) throw new Error("Failed to fetch permissions");
        return await res.json(); 
    } catch (error) {
        console.error(error);
        return [];
    }
}

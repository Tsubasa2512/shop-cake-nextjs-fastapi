import { Gallery } from "../schema/gallery";
import envConfig from "@/app/config";

const BASE_URL = `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/gallery`;

export async function getGalleries() {
    try {
        const res = await fetch(BASE_URL, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data: Gallery[] = await res.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch galleries:", error);
        return [];
    }
}

export async function getGalleryById(id: number) {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        return await res.json();
    } catch (error) {
        console.error(`Failed to fetch gallery with id ${id}:`, error);
        return null;
    }
}

export async function createGallery(galleryData: object) {
    try {
        console.log(galleryData);
        const res = await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(galleryData),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(`HTTP error! Status: ${res.status}, Details: ${JSON.stringify(errorData)}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Failed to create gallery:", error);
        return null;
    }
}

export async function updateGallery(id: number, galleryData: object) {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(galleryData),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(`HTTP error! Status: ${res.status}, Details: ${JSON.stringify(errorData)}`);
        }

        return await res.json();
    } catch (error) {
        console.error(`Failed to update gallery with id ${id}:`, error);
        return null;
    }
}

export async function deleteGallery(id: number) {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(`HTTP error! Status: ${res.status}, Details: ${JSON.stringify(errorData)}`);
        }

        return true;
    } catch (error) {
        console.error(`Failed to delete gallery with id ${id}:`, error);
        return false;
    }
}

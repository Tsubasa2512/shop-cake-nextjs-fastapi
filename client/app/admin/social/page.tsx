"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Social } from "@/app/schema/social";
import { getSocials, updateSocial } from "@/app/api/social";

export default function SocialPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [socials, setSocials] = useState<Social[]>([]);
    const [formData, setFormData] = useState<{
        [id: number]: {
            name: string;
            slug: string;
            is_active: boolean;
            id_user: number;
        }
    }>({});
    const router = useRouter();

    useEffect(() => {
        async function fetchSocials() {
            const data = await getSocials();
            setSocials(data);

            // Khởi tạo formData với dữ liệu từ API
            const initialFormData = data.reduce((acc, social) => {
                acc[social.id] = {
                    name: social.name,
                    slug: social.slug,
                    is_active: social.is_active,
                    id_user: 1,
                };
                return acc;
            }, {} as typeof formData);

            setFormData(initialFormData);
            setIsLoading(false);
        }
        fetchSocials();
    }, []);

    const handleSubmit = (socialId: number) => async (e: React.FormEvent) => {
        setIsLoading(true);

        e.preventDefault();
        const currentData = formData[socialId] || socials.find((s) => s.id === socialId);

        if (!currentData) {
            console.error("Social not found");
            return;
        }
        const updateSocialData = {
            id: socialId, // 🔥 Thêm id vào body request
            name: currentData.name,
            slug: currentData.slug,
            is_active: currentData.is_active,
            id_user: currentData.id_user,
        };
        try {
            const updatedSocial = await updateSocial(socialId, updateSocialData);
            if (updatedSocial) {
                router.push("/admin/social");
            } else {
                console.log("Failed to update Social");
            }
        } catch (error) {
            console.error("Failed to update Social", error);
        }
        setIsLoading(false);

    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                [name]: value,
            },
        }));
    };

    const handleSwitchChange = (id: number, value: boolean) => {
        setFormData((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                is_active: value,
            },
        }));
    };

    if (isLoading) {
        return (
            <Button disabled>
                <Loader2 className="animate-spin" /> Please wait...
            </Button>
        );
    }

    return (
        <div className="space-x-4 md:space-x-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl md:text-3xl font-bold">Social</h1>
            </div>
            <div>
                {socials.map((item) => (
                    <div key={item.id} className="md:p-2 mt-2 space-x-2 mb-6 md:mb-0">
                        <form onSubmit={handleSubmit(item.id)} className="flex items-center gap-3 flex-wrap md:flex-nowrap">
                            <label className="font-semibold md:w-[180px]">{item.name}</label>
                            <Input
                                name="slug"
                                value={formData[item.id]?.slug ?? item.slug}
                                onChange={(e) => handleChange(e, item.id)}
                            />
                            <div className="md:w-[200] text-center">
                                <Label className="mr-2" htmlFor={`is_active_${item.id}`}>Active</Label>
                                <Switch
                                    id={`is_active_${item.id}`}
                                    checked={formData[item.id]?.is_active ?? item.is_active}
                                    onCheckedChange={(value) => handleSwitchChange(item.id, value)}
                                />
                            </div>
                            <div className="flex space-x-2">
                                <Button type="submit">Update</Button>
                            </div>
                        </form>
                    </div>
                ))}
            </div>
        </div>
    );
}

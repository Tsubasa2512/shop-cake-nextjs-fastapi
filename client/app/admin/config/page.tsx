"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Config } from "@/app/schema/config";
import { getConfigs, updateConfig } from "@/app/api/config";

export default function ConfigPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [configs, setConfigs] = useState<Config[]>([]);
    const [formData, setFormData] = useState<{
        [id: number]: {
            name: string;
            description: string;
            is_active: boolean;
        }
    }>({});
    const router = useRouter();

    useEffect(() => {
        async function fetchConfigs() {
            const data = await getConfigs();
            setConfigs(data);

            const initialFormData = data.reduce((acc, config) => {
                acc[config.id] = {
                    name: config.name,
                    description: config.description,
                    is_active: config.is_active,
                };
                return acc;
            }, {} as typeof formData);

            setFormData(initialFormData);
            setIsLoading(false);
        }
        fetchConfigs();
    }, []);

    const handleSubmit = (configId: number) => async (e: React.FormEvent) => {
        setIsLoading(true);

        e.preventDefault();
        const currentData = formData[configId] || configs.find((s) => s.id === configId);

        if (!currentData) {
            console.error("Config not found");
            return;
        }
        const updateConfigData = {
            id: configId,
            name: currentData.name,
            description: currentData.description,
            is_active: currentData.is_active,
        };
        try {
            const updatedConfig = await updateConfig(configId, updateConfigData);
            if (updatedConfig) {
                router.push("/admin/config");
            } else {
                console.log("Failed to update Config");
            }
        } catch (error) {
            console.error("Failed to update Config", error);
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
                <h1 className="text-2xl md:text-3xl font-bold">Config</h1>
            </div>
            <div>
                {configs.map((item) => (
                    <div key={item.id} className="md:p-2 mt-2 space-x-2 mb-6 md:mb-0">
                        <form onSubmit={handleSubmit(item.id)} className="flex items-center gap-3 flex-wrap md:flex-nowrap">
                            <label className="font-semibold md:w-[180px]">{item.name}</label>
                            <Input
                                name="description"
                                value={formData[item.id]?.description ?? item.description}
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

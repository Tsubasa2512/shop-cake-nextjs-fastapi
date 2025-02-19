"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getUsers } from "@/app/api/user"; // Gọi API lấy danh sách user
import { Loader2 } from "lucide-react";
import { User } from "@/app/schema/user";

export function UserDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await getUsers(); // Gọi API lấy danh sách user
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-4">
        <Loader2 className="animate-spin w-6 h-6 text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div key={user.id} className="flex items-center p-2 border rounded-lg">
          <Avatar className="h-10 w-10 bg-gray-200 text-gray-800">
            <AvatarFallback>{user.id}</AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
          <div className="ml-auto font-medium">{user.role.name}</div>
        </div>
      ))}
    </div>
  );
}

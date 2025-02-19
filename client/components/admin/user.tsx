"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function UserDashboard() {
  return (
    <div className="space-y-8">
      {[
        {
          name: "John Doe",
          email: "john@example.com",
          amount: "$250.00",
          initials: "JD"
        },
        {
          name: "Alice Smith",
          email: "alice@example.com",
          amount: "$150.00",
          initials: "AS"
        },
        {
          name: "Bob Johnson",
          email: "bob@example.com",
          amount: "$350.00",
          initials: "BJ"
        },
        {
          name: "Emma Wilson",
          email: "emma@example.com",
          amount: "$450.00",
          initials: "EW"
        },
        {
          name: "Mike Brown",
          email: "mike@example.com",
          amount: "$550.00",
          initials: "MB"
        }
      ].map((sale, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>{sale.initials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.name}</p>
            <p className="text-sm text-muted-foreground">{sale.email}</p>
          </div>
          <div className="ml-auto font-medium">{sale.amount}</div>
        </div>
      ))}
    </div>
  );
}
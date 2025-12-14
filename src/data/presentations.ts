import { createServerFn } from "@tanstack/react-start";
import type { PresentationItem } from "@/types/presentation-item";

export const listPresentations = createServerFn({
  method: "GET",
}).handler(
  (): Array<PresentationItem> => [
    {
      id: "1",
      name: "Q4 Product Roadmap",
      author: "Sarah Chen",
      createdAt: new Date("2024-01-15"),
      modifiedAt: new Date("2024-02-01"),
    },
    {
      id: "2",
      name: "Marketing Strategy 2024",
      author: "Michael Rodriguez",
      createdAt: new Date("2024-01-20"),
      modifiedAt: new Date("2024-01-28"),
    },
    {
      id: "3",
      name: "Engineering Team Onboarding",
      author: "Emily Watson",
      createdAt: new Date("2024-02-05"),
      modifiedAt: new Date("2024-02-10"),
    },
    {
      id: "4",
      name: "Sales Performance Review",
      author: "David Kim",
      createdAt: new Date("2024-02-12"),
      modifiedAt: new Date("2024-02-12"),
    },
    {
      id: "5",
      name: "Design System Guidelines",
      author: "Alex Thompson",
      createdAt: new Date("2024-01-08"),
      modifiedAt: new Date("2024-02-15"),
    },
    {
      id: "6",
      name: "Customer Success Metrics",
      author: "Jessica Park",
      createdAt: new Date("2024-02-01"),
      modifiedAt: new Date("2024-02-08"),
    },
    {
      id: "7",
      name: "Budget Planning FY2024",
      author: "Robert Johnson",
      createdAt: new Date("2023-12-20"),
      modifiedAt: new Date("2024-01-30"),
    },
    {
      id: "8",
      name: "Product Launch Checklist",
      author: "Sarah Chen",
      createdAt: new Date("2024-02-10"),
      modifiedAt: new Date("2024-02-14"),
    },
  ],
);

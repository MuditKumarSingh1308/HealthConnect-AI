export const roles = ["Patient", "Hospital", "Admin"] as const;

export type UserRole = (typeof roles)[number];

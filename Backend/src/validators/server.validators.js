import { z } from 'zod';

export const serverSchema = z.object({
    name: z.string()
        .min(2, "Name is too short")
        .max(30, "Name is too long")
        .trim(),
    url: z.string()
        .url("Invalid URL format. Must include http:// or https://")
        .trim()
        .toLowerCase(),
});

export const patchServerSchema = z.object({
    name: z.string()
        .min(2, "Name is too short")
        .max(30, "Name is too long")
        .trim().optional(),
    url: z.string()
        .url("Invalid URL format. Must include http:// or https://")
        .trim()
        .toLowerCase().optional(),
})
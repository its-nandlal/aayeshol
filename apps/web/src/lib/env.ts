import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
    server: {
        NEST_BACKEND_API_URL: z.string().min(1, "Backend key is required")
    },
    client:{},
    experimental__runtimeEnv: process.env
})
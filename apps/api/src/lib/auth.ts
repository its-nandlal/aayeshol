import { APIError, betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { createAuthMiddleware } from 'better-auth/api';
import { PrismaService } from 'src/prisma/prisma.service';

export const createAuth = (prisma: PrismaService) =>
  betterAuth({
    basePath: '/api/auth',
    baseURL: process.env.BETTER_AUTH_URL,
    secret: process.env.BETTER_AUTH_SECRET,

    database: prismaAdapter(prisma, {
      provider: 'postgresql',
    }),

    trustedOrigins: ['http://localhost:3000', 'http://localhost:3001'],

    user: {
      additionalFields: {
        name: {
          type: 'string',
          required: false,
        },
        lastname: {
          type: 'string',
          required: false,
        },
        role: {
          type: 'string',
          required: false,
          input: false,
        },
      },
    },

    emailAndPassword: {
      enabled: true,
    },

    hooks: {
      before: createAuthMiddleware(async (ctx) => {
        if (ctx.path !== '/sign-up/email') {
          return;
        }
        if (!ctx.body?.name) {
          throw new APIError('BAD_REQUEST', {
            message: 'Name must required',
          });
        }
      }),
    },
  });

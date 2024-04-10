import type { DefaultSession, NextAuthConfig } from 'next-auth';
import CredentialsProvider from '@auth/core/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import bcrypt from 'bcryptjs';

import { db, UserRole } from '@xenous/db';

declare module 'next-auth' {
    interface Session extends DefaultSession {
        user: {
            id: string;
            role: UserRole;
        } & DefaultSession['user'];
    }
}

export const authConfig = {
    adapter: PrismaAdapter(db),
    session: { strategy: 'jwt' },
    callbacks: {
        jwt: async ({ token }) => {
            if (!token.email) return token;

            const user = await db.user.findUnique({
                where: { id: token.sub },
                include: { userProfile: true, partnerProfile: true, adminProfile: true },
            });

            if (!user) return token;

            const name = {
                [UserRole.USER]: user.userProfile?.name,
                [UserRole.PARTNER]: user.partnerProfile?.name,
                [UserRole.ADMIN]: user.adminProfile?.name,
            }[user.role];

            return {
                ...token,
                name: name,
                role: user.role,
            };
        },
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.sub,
                    name: token.name,
                    role: token.role,
                },
            };
        },
    },
    providers: [
        CredentialsProvider({
            id: 'credentials',
            credentials: {
                email: { type: 'email' },
                password: { type: 'password' },
                role: { type: 'text' },
            },
            authorize: async credentials => {
                if (!credentials.email || !credentials.password) {
                    return null;
                }

                const user = await db.user.findUnique({
                    where: { email: credentials.email as string },
                });

                if (!user?.password || user.role !== credentials.role) {
                    return null;
                }

                const passwordsMatch = await bcrypt.compare(credentials.password as string, user.password);

                if (!passwordsMatch) return null;

                return user;
            },
        }),
    ],
} satisfies NextAuthConfig;

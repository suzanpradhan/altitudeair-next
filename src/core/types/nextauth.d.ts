import { DefaultSession } from 'next-auth';

interface IUser {
    id: string;
    name?: string | null;
    email?: string | null;
    token: string;
}

declare module 'next-auth' {
    interface User extends IUser { }

    interface Session extends DefaultSession {
        user?: User;
    }
}

declare module 'next-auth/jwt' {
    interface JWT extends IUser { }
}
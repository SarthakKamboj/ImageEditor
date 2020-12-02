import { Request, Response } from 'express';
import session from 'express-session';
import { SessionDataType } from './SessionDataType';

export type ContextType = {
    req: Request & {
        session: session.Session &
            Partial<session.SessionData> &
            SessionDataType;
    };
    res: Response;
};

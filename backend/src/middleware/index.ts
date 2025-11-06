import { Request, Response, NextFunction } from 'express';
import { z, ZodError, ZodIssue } from 'zod';

export function validateBody(schema: z.ZodObject<any, any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = error.issues.map((issue: ZodIssue) => ({
                    message: issue.message,
                }))
                res.status(400).json(errorMessages[0]);
            } else {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    };
}

export function validateQuery(schema: z.ZodObject<any, any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = schema.parse(req.query);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = error.issues.map((issue: ZodIssue) => ({
                    message: issue.message,
                }))
                res.status(400).json(errorMessages[0]);
            } else {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    };
}

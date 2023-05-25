import type { Request as ExpressRequest } from 'express'

export interface Request extends ExpressRequest {
    user: {
        uid: number
        username: string
        nick: string
        email: string
        permission: number
        status: number
        msg: string
    }
}

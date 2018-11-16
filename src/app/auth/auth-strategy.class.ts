import { NbPasswordAuthStrategy, NbAuthStrategyClass, NbPasswordAuthStrategyOptions, NbAuthJWTToken } from "@nebular/auth";
import { environment } from "src/environments/environment";

export const AUTH_STRATEGY: [NbAuthStrategyClass, NbPasswordAuthStrategyOptions][] = [
    NbPasswordAuthStrategy.setup({
        name: 'email',
        baseEndpoint: environment.apiDir,
        login: {
            endpoint: 'session',
            method: 'post',
            defaultErrors: ['Email/password not valid, please try again.'],
            defaultMessages: ['You have been successfully logged in.'],
            redirect: {
                delay: 500,
                success: '/',
                failure: null,
            },
            
        },
        logout: {
            endpoint: 'session',
            method: 'delete',
            defaultErrors: ['Email/password not valid, please try again.'],
            defaultMessages: ['You have been successfully logged in.'],
            redirect: {
                delay: 500,
                success: '/auth/login',
                failure: '/auth/login',
            },
        },
        token: {
            class: NbAuthJWTToken,
            key: 'session.jwt'
        },
    })
]
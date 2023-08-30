export interface Login {
    username: string,
    password: string
}

export interface LoginRes {
    token: string,
    refreshToken: string,
    scope?: any
}
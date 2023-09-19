export interface Login {
    user_name: string,
    password: string
}

export interface LoginResModel {
    status:string,
    data:LoginRes,
    user:UserRes,
    roles:string,
    permissions:PermissionsRes
}

export interface LoginRes {
    access_token: string,
    refresh_token: string,
    token_type: string,
    expires_in: string,
}
export interface UserRes {
    id?:number,
    first_name:string,
    last_name:string,
    email:string,
    telephone:string,
    user_name:string
}

export interface PermissionsRes {
    id?:number,
    name:string,
    guard_name:string
}
export interface CustomerResModel {
    data: CustomerModel,
    links: LinksModel,
    meta: MetaModel,

}
export interface CustomerModel {
    id?:number,
    mobile:string,
    date:string,
    time:string,
}

export interface LinksModel {
    first: string,
    last:string,
    next?: string,
    prev?:string,
}

export interface MetaModel {
    current_page: number,
    from: number,
    last_page: number,
    total: number
}
export interface TransactionResModel {
    data: TransactionModel,
    links: LinksModel,
    meta: MetaModel,

}
export interface TransactionModel {
    id?:number,
    mobile:string,
    amount:string,
    airtime_for:string,
    payment_status:string,
    airtime_status:string,
    date:string,
    time:string,
    receipt_number: string
}

export interface LinksModel {
    first: string,
    last:string,
    next: string,
}

export interface MetaModel {
    current_page: number,
    from: number,
    last_page: number,
    total: number
}
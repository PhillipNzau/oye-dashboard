export interface DashboardModel {
    total_sales:number;
    average_purchase:number;
    customers:number;
    balance:string

}

export interface CustomersDashboardModel {
    total_customers: number;
    airtime_customers: number;
    monthly_counts: MonthlyCounts[];
    bar_data: BarData;
}

export interface MonthlyCounts {
    month: string;
    total_count: number;
}

export interface BarData {
    categories: string[];
    data: number[]
}

export interface CustomerDashboardModel {
    total_spent:number;
    other_numbers:number;
    highest_spent:number;
    lowest_spent:number;
    average:number;
}
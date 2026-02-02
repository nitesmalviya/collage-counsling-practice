export interface EducatorTotalEarnings {
    totalEarnings: number;
    paidOut: number;
    pending: number;
    nextPayout: string;
    message: string;
    success: boolean;
}

 
export interface EarningHistoryItem {
    id: string;
    amount: number;
    currency: string;
    transaction_type: string;
    active_status: string;
    created_at: string;
    updated_at: string;
}
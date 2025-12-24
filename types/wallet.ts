// types/wallet.ts

export interface WalletTransaction {
  active_status: boolean;
  amount: number;
  created_at: string;
  currency: string;
  id: string;
  metadata: string | null;
  wallet_id: string;
}

export interface TransactionHistoryResponse {
  getStudentTransactionHistory: {
    total: number;
    transactions: WalletTransaction[];
  };
}

export interface WalletSummaryResponse {
  getStudentWalletSummary: {
    purchaseCount: number;
    refundCount: number;
    sessionsCount: number;
    totalPurchased: number;
    totalRefunded: number;
    totalSpent: number;
  };
}


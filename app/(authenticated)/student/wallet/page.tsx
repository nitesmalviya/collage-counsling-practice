

import Wallet from "@/components/student/wallet/index";
import { DEFAULT_PAGINATION } from "@/utils/constant";
import { getTransactionHistoryAction, getWalletSummaryAction } from "@/utils/graphql/wallet/action";
import { get } from "http";

const StudentWallet = async () => {
  // Fetch wallet summary data
  const res = await getWalletSummaryAction();
  const walletSummary = res?.getStudentWalletSummary;

  // fetch transaction history data
  const transactionRes = await getTransactionHistoryAction({  
    limit: DEFAULT_PAGINATION.LIMIT,
    page: DEFAULT_PAGINATION.PAGE, 
  });
  const transactionHistory = transactionRes?.getStudentTransactionHistory || {
    total: 0,
    transactions: []
  };

  console.log(transactionHistory, "walletSummary data");



  return (
    <div className="min-h-screen bg-background">
      <Wallet walletSummary={walletSummary} transactionHistory={transactionHistory} />
    </div>
  )
}



export default StudentWallet;

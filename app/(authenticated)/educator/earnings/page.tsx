

import { getEducatorTotalEarningsAction, getEducatorEarningsHistoryAction } from "@/utils/graphql/earnings/action";
import { EarningHistoryItem, EducatorTotalEarnings } from "@/types/earning";
import { STORAGE_KEYS } from "@/utils/constant";
import { cookies } from "next/headers";
import Earnings from "@/components/educator/earnings"


const EducatorEarnings = async () => {
  const cookieStore = await cookies();
  const user = cookieStore.get(STORAGE_KEYS.USER)?.value;
  const userId = JSON.parse(user || "{}")?.id;

  const res = await getEducatorTotalEarningsAction({
    userId: userId || ""
  });

  const totalEarningsData: EducatorTotalEarnings = res?.getEducatorTotalEarnings || {};

  const resEarnings = await getEducatorEarningsHistoryAction({
    userId: userId || ""
  });
  const earningsHistoryData: EarningHistoryItem = resEarnings?.getEducatorEarningHistory.items || [];

  return (
    <Earnings
      totalEarningsData={totalEarningsData}
      earningsHistoryData={earningsHistoryData} />

  )
}

export default EducatorEarnings;

import { cookies } from "next/headers";
import {
  getEducatorTotalEarningsAction,
  getEducatorEarningsHistoryAction
} from "@/utils/graphql/earnings/action";
import { EarningHistoryItem, EducatorTotalEarnings } from "@/types/earning";
import { STORAGE_KEYS } from "@/utils/constant";
import Earnings from "@/components/educator/earnings";


const EducatorEarnings = async () => {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get(STORAGE_KEYS.USER)?.value;
  const userId = JSON.parse(userCookie || "{}")?.id;

  const totalEarningsRes = await getEducatorTotalEarningsAction({
    userId: userId || ""
  });

  const totalEarningsData: EducatorTotalEarnings = totalEarningsRes?.getEducatorTotalEarnings || {};

  const earningsHistoryRes = await getEducatorEarningsHistoryAction({
    userId: userId || ""
  });
  const earningsHistoryData: EarningHistoryItem = earningsHistoryRes?.getEducatorEarningHistory.items || [];

  return (
    <Earnings
      totalEarningsData={totalEarningsData}
      earningsHistoryData={earningsHistoryData} />

  )
}

export default EducatorEarnings;

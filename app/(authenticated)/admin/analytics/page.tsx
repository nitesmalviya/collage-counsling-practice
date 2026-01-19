import Analytics from "@/components/admin/analytics";
import { getAnalyticsAction } from "@/utils/graphql/analytics/action";

const AdminAnalytics = async () => {
  const res = await getAnalyticsAction();

  const analyticsData = res || null;

  return (
    <Analytics analyticsData={analyticsData} />
  )
}


export default AdminAnalytics;
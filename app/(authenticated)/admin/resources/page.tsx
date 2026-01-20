
import { getAllResourcesAction } from "@/utils/graphql/resources/action"
import Resources from "../../student/resources/page"
import { DEFAULT_PAGINATION } from "@/utils/constant";

const AdminResources = async () => {
  const res = await getAllResourcesAction({
    page: DEFAULT_PAGINATION.PAGE,
    limit: DEFAULT_PAGINATION.LIMIT,
    search: '',
    resource_type: null,
  });
  const resources = res?.GetAllResources?.items || [];

  return (
    <Resources 
      isAdmin={true} 
      resourceList={resources} 
      totalResources={res?.GetAllResources?.total || 0} />
  )
}


export default AdminResources;

import Resources from "@/components/student/resources/index"
import { DEFAULT_PAGINATION } from "@/utils/constant";
import { getAllResourcesAction } from "@/utils/graphql/resources/action";

const StudentResources = async () => {

  const res = await getAllResourcesAction({
    page: DEFAULT_PAGINATION.PAGE,
    limit: DEFAULT_PAGINATION.LIMIT,
    search: '',
    resource_type: null,
  });

  const resourcesData = res?.GetAllResources?.items || [];

  return (
    <div className="min-h-screen bg-background">
      <Resources resourcesData={resourcesData} totalResources={res?.GetAllResources?.total || 0} />
    </div>
  )
}

export default StudentResources;
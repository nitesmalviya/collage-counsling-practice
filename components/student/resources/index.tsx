"use client"
import { Button } from "@/components/ui/button"
import { FileX } from "lucide-react"
import { PaginationType, ResourceItem } from "@/types/resources"
import SearchFilter from "@/components/ui/search-filter"
import PageHeader from "@/components/ui/page-header"
import ResourceCard from "./resource-card"
import { useCallback, useState } from "react"
import DataNotFound from "@/components/ui/data-not-found"
import { debounce } from "@/utils/common-service"
import { DEFAULT_PAGINATION, PRIVATE_PATH, RESOURCE_CATEGORIES } from "@/utils/constant"
import { getAllResourcesAction } from "@/utils/graphql/resources/action"
import Link from "next/link"


interface ResourcesProps {
    isAdmin?: boolean;
    resourcesData: ResourceItem[];
    totalResources: number;
}

const StudentResources = ({ isAdmin, resourcesData, totalResources }: ResourcesProps) => {
    const [resources, setResources] = useState<ResourceItem[]>(resourcesData || []);
    const [totalCount, setTotalCount] = useState(totalResources);
    const categories = RESOURCE_CATEGORIES;
    const [isLoading, setIsLoading] = useState(false);
    const [pagination, setPagination] = useState<PaginationType>({
        page: DEFAULT_PAGINATION.PAGE,
        limit: DEFAULT_PAGINATION.LIMIT,
        search: '',
        resource_type: null as string | null,
    });

    const getFilteredResources = async (paginate: PaginationType) => {
        setIsLoading(true);
        try {
            const res = await getAllResourcesAction(paginate);
            const fetchedResourcesData = res?.GetAllResources?.items || [];
            const count = res?.GetAllResources?.total || 0;
            setResources(prev => paginate.page > 1 ? [...prev, ...fetchedResourcesData] : fetchedResourcesData);
            setTotalCount(count);

        } catch (error) {
            console.log(error, "Api failed")
        } finally {
            setIsLoading(false);
        }
    }

    const handleResourceType = (resourceType: string | null) => {
        const newPagination = { ...pagination, page: DEFAULT_PAGINATION.PAGE, resource_type: resourceType };
        setPagination(newPagination);
        getFilteredResources(newPagination);
    }

    const handleSearchDebounce = useCallback(
        debounce((search: string) => {
            const newPagination = { ...pagination, page: DEFAULT_PAGINATION.PAGE, search: search };
            setPagination(newPagination);
            getFilteredResources(newPagination);
        }, 500), [pagination]
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="space-y-6">
                <PageHeader
                    title="Resource Library"
                    description="Manage your tokens and transactions"
                    rightSlot={
                        isAdmin && (
                            <Button asChild>
                                <Link href={PRIVATE_PATH.ADMIN_CREATE_RESOURCE}>Add Resource</Link>

                            </Button>
                        )
                    }
                />
                {/* Search and Filter */}
                <SearchFilter handleSearchDebounce={handleSearchDebounce} />
                {/* Category Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {categories.map((category) => (
                        <Button
                            key={category.label}
                            variant={category.value === pagination.resource_type ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleResourceType(category.value)}
                            className={
                                category.value === pagination.resource_type
                                    ? undefined
                                    : "hover:bg-primary/10 hover:text-primary"
                            }
                        >
                            {category.label}
                        </Button>
                    ))}
                </div>
                {/* Resources Grid */}
                {resources?.length ? (
                    <div className="grid gap-6 md:grid-cols-2">
                        {resources.map((resource) => (
                            <ResourceCard
                                key={resource.id}
                                resource={resource}
                                isAdmin={isAdmin} />
                        ))}
                    </div>
                ) : (
                    <DataNotFound
                        title="No resources found"
                        description="Try adjusting your filters."
                        iconSlot={<FileX className="size-6" />}
                        className="px-5"
                    />
                )}
            </div>
        </div>
    )
}


export default StudentResources;
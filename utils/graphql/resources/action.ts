"use server";
import { fetchGraphQLQuery, fetchGraphQLMutation } from "@/utils/graphql";

import { GET_ALL_RESOURCES_QUERY } from "./query";
import { GetAllResourcesResponse, PaginationType, CreateResourceInput, CreateResourceResponse } from "@/types/resources"

export const getAllResourcesAction = async (
    paginate: PaginationType
): Promise<GetAllResourcesResponse> => {
    const variables = {
        searchFilter: { ...paginate },
    }
    const res = await fetchGraphQLQuery<GetAllResourcesResponse>(
        GET_ALL_RESOURCES_QUERY,
        variables
    );
    return res as GetAllResourcesResponse;
};
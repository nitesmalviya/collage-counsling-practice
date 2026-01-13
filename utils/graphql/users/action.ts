"use server";
import { fetchGraphQLMutation, fetchGraphQLQuery } from "@/utils/graphql";
import { UsersFilter, UsersResponse } from "@/types/users";
import { GET_USERS_QUERY } from "./query";

export const getUsersAction = async (
    filter?: UsersFilter
): Promise<UsersResponse> => {
    const variables = filter || {};
    const res = await fetchGraphQLQuery<UsersResponse>(
        GET_USERS_QUERY,
        variables as Record<string, unknown>
    );
    return res as UsersResponse;
};
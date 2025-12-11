
"use server";
import { fetchGraphQLQuery } from "@/utils/graphql";
import { GET_EDUCATOR_PROFILE_QUERY, GET_EDUCATOR_SESSIONS_QUERY } from './query';
import { GetEducatorProfileResponse, GetMySessionsResponse } from "@/types/sessions";

export const getSessionsAction = async (variables: any): Promise<any> => {
  const res = await fetchGraphQLQuery<GetMySessionsResponse>(
    GET_EDUCATOR_SESSIONS_QUERY,
    variables
  );
  return res;
};

export const getEducatorProfileAction = async (
  userId: string
): Promise<GetEducatorProfileResponse> => {
  const variables = { userId };
  const res = await fetchGraphQLQuery<GetEducatorProfileResponse>(
    GET_EDUCATOR_PROFILE_QUERY,
    variables
  );
  return res as GetEducatorProfileResponse;
};
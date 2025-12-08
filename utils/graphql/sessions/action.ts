
"use server";
import { fetchGraphQLQuery } from "@/utils/graphql";
import { GET_EDUCATOR_SESSIONS_QUERY } from './query';
import { GetMySessionsResponse } from "@/types/sessions";

export const getSessionsAction = async (variables: any): Promise<any> => {
  const res = await fetchGraphQLQuery<GetMySessionsResponse>(
    GET_EDUCATOR_SESSIONS_QUERY,
    variables
  );
  return res;
};
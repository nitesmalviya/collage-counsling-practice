
"use server";
import { fetchGraphQLQuery } from "@/utils/graphql";
import { GET_EDUCATOR_AVAILABILITY_QUERY } from './query';
import { GetEducatorResponse } from "@/types/availability";

export const getEducatorAvailabilityAction = async (variables: any): Promise<any> => {
  const res = await fetchGraphQLQuery<GetEducatorResponse>(
    GET_EDUCATOR_AVAILABILITY_QUERY,
    variables
  );
  return res;
};
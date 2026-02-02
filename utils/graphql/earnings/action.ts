
"use server";
import { fetchGraphQLQuery } from "@/utils/graphql";
import { GET_EDUCATOR_EARNING_HISTORY_QUERY, GET_EDUCATOR_TOTAL_EARNINGS_QUERY } from './query';
import { EducatorTotalEarnings, EarningHistoryItem } from "@/types/earning";

export const getEducatorTotalEarningsAction = async (variables: any): Promise<any> => {
    const res = await fetchGraphQLQuery<EducatorTotalEarnings>(
        GET_EDUCATOR_TOTAL_EARNINGS_QUERY,
        variables
    );
    return res;
};

export const getEducatorEarningsHistoryAction = async (variables: any): Promise<any> => {
    const res = await fetchGraphQLQuery<EarningHistoryItem>(
        GET_EDUCATOR_EARNING_HISTORY_QUERY,
        variables
    );
    return res;
};


"use server";
import { fetchGraphQLQuery } from "@/utils/graphql";
import { GET_EDUCATOR_DASHBOARD_QUERY, GET_STUDENT_DASHBOARD_QUERY } from './query';
import { EducatorDashboardResponse, StudentDashboardResponse } from '@/types/dashboard';

export const getEducatorDashboardAction = async (variables: any): Promise<any> => {
  const res = await fetchGraphQLQuery<EducatorDashboardResponse>(
    GET_EDUCATOR_DASHBOARD_QUERY,
    variables
  );
  return res;
};

export const getStudentDashboardAction = async (variables: any): Promise<any> => {
  const res = await fetchGraphQLQuery<StudentDashboardResponse>(
    GET_STUDENT_DASHBOARD_QUERY,
    variables
  );
  return res;
};

"use server";
import { fetchGraphQLMutation, fetchGraphQLQuery } from "@/utils/graphql";
import { GET_EDUCATOR_AVAILABILITY_QUERY, SET_EDUCATOR_AVAILABILITY_MUTATION } from './query';
import { GetEducatorResponse, SetAvailabilityInput, SetEducatorAvailabilityResponse } from "@/types/availability";

export const getEducatorAvailabilityAction = async (variables: any): Promise<any> => {
  const res = await fetchGraphQLQuery<GetEducatorResponse>(
    GET_EDUCATOR_AVAILABILITY_QUERY,
    variables
  );
  return res;
};

export const setAvailability = async (form: SetAvailabilityInput): Promise<SetEducatorAvailabilityResponse> => {
  const variables: { input: SetAvailabilityInput } = {
    input: {
      availabilityDays: form.availabilityDays,
      break: form.break,
      lunchBreak: form.lunchBreak,
      overrides: form.overrides,
      slot_duration: form.slot_duration,
      unavailabilityDays: form.unavailabilityDays,
    },
  };

  const res = await fetchGraphQLMutation<SetEducatorAvailabilityResponse>(
    SET_EDUCATOR_AVAILABILITY_MUTATION,
    variables
  );
  return res as SetEducatorAvailabilityResponse;
};

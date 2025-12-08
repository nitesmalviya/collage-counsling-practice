import { gql, DocumentNode } from '@apollo/client';

export const GET_EDUCATOR_AVAILABILITY_QUERY: DocumentNode = gql`
  query GetEducatorAvailability {
  GetEducatorAvailability {
    availabilityDays {
      dayOfWeek
      endTime
      fullDay
      startTime
    }
    break {
      break_between_interval
      interval_status
    }
    lunchBreak {
      endTime
      lunchBreak
      startTime
    }
    message
    overrides {
      dayOfWeek
      endDateTime
      id
      startDateTime
    }
    slot_duration
    success
    timezone
    unavailabilityDays {
      dayOfWeek
      endTime
      id
      startTime
      unavailableWholeDay
      unavailable_date_at
    }
  }
}
`;
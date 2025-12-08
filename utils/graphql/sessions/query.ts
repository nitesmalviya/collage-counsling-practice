import { gql, DocumentNode } from '@apollo/client';

export const GET_EDUCATOR_SESSIONS_QUERY: DocumentNode = gql`
   query GetSessions($input: GetEducatorSessionsInput) {
  getSessions(input: $input) {
    sessions {
      active_status
      cancelled_at
      cancelled_by
      created_at
      description
      duration_min
      educator_id
      ended_at
      id
      rescheduled_at_end_time
      rescheduled_at_start_time
      room_metadata
      room_url
      scheduled_at_end_time
      scheduled_at_start_time
      started_at
      status
      student_id
      title
      updated_at
      educator {
        active_status
        avatar_path
        created_at
        default_admin_token
        email
        first_name
        id
        last_login_at
        last_name
        phone
        platform
        role
        sub_id
        timezone
        updated_at
      }
    }
    message
    success
    total
    upcomingCount
    completedCount
    expiredCount
    canceledCount
  }
}
`;
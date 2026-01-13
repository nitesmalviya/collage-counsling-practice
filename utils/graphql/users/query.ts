import { gql, DocumentNode } from '@apollo/client';

export const GET_USERS_QUERY: DocumentNode = gql`
query Query($filter: AdminUsersFilterInput) {
  users(filter: $filter) {
    totalEducators
    totalStudents
    totalUsers
    items {
      created_at
      active_status
      avatar_path
      first_name
      id
      role
      last_name
      profile {
        specialization
      }
    }
  }
}

  `;
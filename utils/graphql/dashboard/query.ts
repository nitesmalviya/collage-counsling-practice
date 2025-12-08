import { gql, DocumentNode } from '@apollo/client';

export const GET_EDUCATOR_DASHBOARD_QUERY: DocumentNode = gql`
  query GetEducatorDashboard($userId: String!) {
    getEducatorDashboard(userId: $userId) {
      activeStudents
        averageRating
        sessionsThisWeek
        totalEarnings
        success
        message
    }
  }
`;
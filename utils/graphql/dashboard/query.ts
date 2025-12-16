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

export const GET_STUDENT_DASHBOARD_QUERY: DocumentNode = gql`
  query GetStudentDashboard($userId: String!) {
    getStudentDashboard(userId: $userId) {
      completedSessions
      tokenBalance
      upcomingSessions
    }
  }
`;
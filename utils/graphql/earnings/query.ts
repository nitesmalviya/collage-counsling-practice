import { gql, DocumentNode } from '@apollo/client';

export const GET_EDUCATOR_TOTAL_EARNINGS_QUERY: DocumentNode = gql`
query GetEducatorTotalEarnings($userId: String!) {
    getEducatorTotalEarnings(userId: $userId) {
        message
        nextPayout
        paidOut
        pending
        success
        totalEarnings
    }
}
    `;
export const GET_EDUCATOR_EARNING_HISTORY_QUERY: DocumentNode = gql`

    query GetEducatorEarningHistory($userId: String!, $filter: EarningHistoryFilterInput) {
  getEducatorEarningHistory(userId: $userId, filter: $filter) {
    items {
      amount
      active_status
      created_at
      currency
      id
      transaction_type
      updated_at
    }
    message
    success
    total
  }
}
    `;
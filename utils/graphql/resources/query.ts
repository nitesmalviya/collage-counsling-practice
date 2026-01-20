import { gql, DocumentNode } from '@apollo/client';

export const GET_ALL_RESOURCES_QUERY: DocumentNode = gql`
  query GetAllResources($searchFilter: ResourceSearchFilterInput) {
    GetAllResources(searchFilter: $searchFilter) {
      total
      items {
        attachment {
          file_url
          file_type
          uploadedByUser {
            first_name
            last_name
          }
        }
        created_at
        description
        id
        resource_type
        title
        updated_at
      }
    }
  }
`;

export const REMOVE_RESOURCE_MUTATION: DocumentNode = gql`
  mutation RemoveResource($id: String!) {
    RemoveResource(id: $id) {
      message
      success
    }
  }
`;
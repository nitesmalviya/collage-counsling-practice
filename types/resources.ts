// types/resource.ts

export interface UploadedByUser {
    first_name: string;
    last_name: string;
  }
  
  export interface Attachment {
    id: string;
    file_size: number;
    file_url: string;
    file_type: string;
    active_status: boolean;
    uploadedByUser: UploadedByUser;
  }
  
  export interface ResourceItem {
    id: string;
    title: string;
    description: string;
    resource_type: string;
    attachment_id: string;
    active_status: boolean;
    created_at: string;
    updated_at: string;
    attachment: Attachment;
  }
  
  export interface GetAllResourcesResponse {
    GetAllResources: {
      total: number;
      items: ResourceItem[];
    };
  }
  
  export interface ResourceSearchFilterInput {
    keyword?: string;
    resource_type?: string;
    active_status?: boolean;
  }
  
  export interface PaginationType {
    page: number;
    limit: number;
    search: string;
    resource_type: string | null;
  }

  export interface CreateResourceInput {
    title: string
    description: string
    resource_type: string
    file_url: string
    file_type: string
    active_status?: boolean
  }

  export interface CreateResourceResponse {
    CreateResource: {
      id: string
      title: string
      description: string
      resource_type: string
      created_at: string
      updated_at: string
      attachment: {
        file_type: string
        file_url: string
        uploadedByUser: {
          first_name: string
          last_name: string
        }
      }
    }
  }

  export interface ResourceFormData {
    title: string
    description: string
    resourceType: string
    file: File | null
    fileUrl?: string
    fileType?: string
  }
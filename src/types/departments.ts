export interface Image {
  "@context": string;
  "@id": string;
  "@type": string;
  id: number;
  contentUrl: string;
  entity: string;
  originalName: string;
  mimeType: string;
  originalExtension: string;
  filesize: number;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
}

export interface User {
  "@context": string;
  "@id": string;
  "@type": string;
  isActive: boolean;
  name: string;
  lastName: string;
  patronymic: string;
  fullName: string;
  fullNameEnglish: string;
  email: string;
  phones: string[];
  position: string;
  image: Image;
  id: number;
  sorting: number;
}

export interface Chief extends User {}

export interface CreatedBy extends User {}

export interface UpdatedBy extends User {}

export interface Department {
  children?: Department[];
  "@id": string;
  "@type": string;
  "@context": string;
  id: number;
  externalCode: string;
  title: string;
  sorting: number;
  isActive: boolean;
  isMain: boolean;
  chief?: Chief;
  users?: User[];
  lft: number;
  lvl: number;
  rgt: number;
  root: string;
  parent?: string | { id: number };
  isRemoved: boolean;
  createdBy: CreatedBy;
  createdAt: string;
  updatedBy: UpdatedBy;
  updatedAt: string;
}

export interface DepartmentResponse {
  "hydra:member": Department[];
  "hydra:totalItems": number;
}

export interface IDepartment {
  "@context": string;
  "@id": string;
  "@type": string;
  id: number;
  externalCode: string;
  title: string;
  sorting: number;
  isActive: boolean;
  isMain: boolean;
  chief: string;
  users: string[];
  lft: number;
  lvl: number;
  rgt: number;
  root: string;
  parent: string;
  isRemoved: boolean;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
}

export interface IImage {
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

export interface ICompanyUser {
  "@id": string;
  "@type": string;
  "@context": string;
  externalCode: string;
  isActive: boolean;
  name: string;
  lastName: string;
  patronymic: string;
  fullName: string;
  fullNameEnglish: string;
  birthDay: string;
  email: string;
  phones: string[];
  position: string;
  departments: IDepartment[];
  gmailAppPassword: string;
  image: IImage;
  lastActivityAt: string;
  id: number;
  login: string;
  roles: string[];
  accessProperties: string[];
  createdAt: string;
  updatedAt: string;
  sorting: number;
}

export interface IHydraView {
  "@id": string;
  type: string;
  "hydra:first": string;
  "hydra:last": string;
  "hydra:previous"?: string;
  "hydra:next"?: string;
}

export interface IHydraMapping {
  "@type": string;
  variable: string;
  property: string;
  required: boolean;
}

export interface IHydraSearch {
  "@type": string;
  "hydra:template": string;
  "hydra:variableRepresentation": string;
  "hydra:mapping": IHydraMapping[];
}

export interface IUsersCompanyCollection {
  "hydra:member": ICompanyUser[];
  "hydra:totalItems": number;
  "hydra:view": IHydraView;
  "hydra:search": IHydraSearch;
}

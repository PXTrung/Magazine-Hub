export interface IContributionData {
   id: string;
   title: string;
   description: string;
   status: string;
   createdAt: string;
   lastModifiedAt: string;
   createdByEmail: string;
   createdByFullName: string;
   coverImageUrl: string;
   documentUrl: string;
   facultyName: string;
   facultyId: string;
}

export interface IContributionDetail {
   id: string;
   title: string;
   description: string;
   status: string;
   createdByEmail: string;
   createdByFullName: string;
   coverImageUrl: string;
   documentUrl: string;
   createdAt: string;
   lastModifiedAt: string;
}

export interface IUploadContribution {
   uploadData: FormData;
   token: string;
}

export interface IContributionData {
   id: string;
   title: string;
   description: string;
   status: "Submitted";
   createdAt: string;
   lastModifiedAt: string;
   createdByEmail: string;
   coverImageUrl: string;
   documentUrl: string;
   facultyName: string;
   facultyId: string;
}

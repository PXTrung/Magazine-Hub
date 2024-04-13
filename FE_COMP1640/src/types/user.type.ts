export interface ILogin {
   email: string;
   password: string;
}

export interface IUserInformation {
   firstName: string;
   lastName: string;
   role: string;
   email: string;
   facultyId: string;
}

export interface IUserData {
   id: string;
   fullName: string;
   email: string;
   role: string;
   facultyName: string;
   facultyId: string;
   avatarUrl: string;
}

export interface ICreateContributor{
   email: string;
   firstName: string;
   lastName: string;
}

export interface ICreateCoordinator{
   email: string;
   firstName: string;
   lastName: string;
   facultyId: string;
}

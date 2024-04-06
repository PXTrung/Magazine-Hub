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

export interface IRegister {
   email: string;
   facultyId: string;
   password: string;
   confirmPassword: string;
   firstName: string;
   lastName: string;
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

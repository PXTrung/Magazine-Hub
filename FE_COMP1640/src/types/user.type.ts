export interface ILogin {
   email: string;
   password: string;
}

export interface IUserInformation {
   firstName: string;
   lastName: string;
   role: string;
   email: string;
}

export interface IRegister {
   email: string;
   facultyId: string;
   password: string;
   confirmPassword: string;
   firstName: string;
   lastName: string;
}

export interface IUser {
    id: number,
    username: string,
    email: string,
    roles: string[]
}

export interface IAccount {
    id: number,
    firstName: string
    lastName: string
    fullName: string
    dateOfBirth: Date,
    username: string,
    gender: string,
    email: string,
    phone: string,
    location: string,

}
import { Subject } from './subjects.model';

export interface User extends Array<Subject> {
    id: number;
    name: string;
    post: string;
    email_id: string;
    password: string;
    dateOfBirth: string;
    contactNumber: string;
    address: string;
}

export interface LoginUser {
    success: boolean;
    user: Object;
    token: string;
}

export interface TokenFormat {
    id: number;
    isAdmin: boolean;
    iat: number;
    exp: number;
}

export interface ServerDataModel {
    msg: User;
    id: number;
    name: string;
    post: string;
    email_id: string;
    password: string;
    dateOfBirth: string;
    contactNumber: string;
    address: string;
}

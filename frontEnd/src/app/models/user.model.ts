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

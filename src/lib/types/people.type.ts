import { v4 as uuid } from '@lukeed/uuid';

export enum PersonRole {
    HCP = 'hcp',
    PHARMACY = 'pharmacy',
    NURSE = 'nurse',
}

export const PersonRoleOptions = [
    {
        label: 'HCP',
        value: PersonRole.HCP
    },
    {
        label: 'Pharmacy',
        value: PersonRole.PHARMACY
    },
    {
        label: 'Nurse',
        value: PersonRole.NURSE
    }
]

export interface PersonType {
    id?: string;
    origin: string;
    title?: string;
    firstName?: string;
    lastName?: string;
    roles?: PersonRole[];
}

export class Person implements PersonType {
    id: string = uuid();
    origin: string;
    title?: string;
    firstName?: string;
    lastName?: string;
    roles?: PersonRole[] = [];
    constructor(props?: PersonType){
        Object.assign(this, props);
    }
}

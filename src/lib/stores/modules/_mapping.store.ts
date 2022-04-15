import { GenericStore } from "$lib/stores/_generic.store";
import { StoreIdentifier } from "$lib/stores/_storeIdentifier.enum";

export interface Address {
    street: string;
    number: number;
    postalcode: string;
    city: string;
    contactInformation: ContactInformation;
}

export interface ContactInformation {
    website?: string;
    telephone?: string;
    email?: string;
}

export interface HospitalEntity {
    hospitalId: string;
    name: string;
    address: Address;
}

export class MappingStore extends GenericStore implements HospitalEntity {
    id: StoreIdentifier = StoreIdentifier.MAPPING;
    hospitalId: string;
    name: string;
    address: Address = {
        street: undefined,
        number: undefined,
        postalcode: undefined,
        city: undefined,
        contactInformation: {}
    };
}
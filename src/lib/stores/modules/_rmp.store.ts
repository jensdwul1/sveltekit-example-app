import type { GenericStore } from "$lib/stores/_generic.store";
import { StoreIdentifier } from "$lib/stores/_storeIdentifier.enum";

export enum ProductStatus {
    UNDETERMINED = 0,
    APPROVED = 1,
    DENIED = 2
}

export interface ProductIndicator {
    id: string;
    isApproved: boolean;
    status: ProductStatus;
    comment: string;
}

export class RmpStore implements GenericStore {
    id: StoreIdentifier = StoreIdentifier.RMP;
    indicators: ProductIndicator[] = [];
    locked: boolean;
    disabled: boolean;
}
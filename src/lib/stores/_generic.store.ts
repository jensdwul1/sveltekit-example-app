import type { StoreIdentifier } from "./_storeIdentifier.enum";

export class GenericStore {
    id: StoreIdentifier;
    created_dt: Date = new Date();
    updated_dt: Date = new Date();
    locked: boolean;
    disabled: boolean;
}
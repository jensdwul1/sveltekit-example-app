import type { StoreIdentifier } from "./_storeIdentifier.enum";

export interface GenericStore {
    id: StoreIdentifier;
    locked: boolean;
    disabled: boolean;
}
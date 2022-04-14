import type { GenericStore } from "$lib/stores/_generic.store";
import { StoreIdentifier } from "$lib/stores/_storeIdentifier.enum";

export class NubStore implements GenericStore {
    id: StoreIdentifier = StoreIdentifier.NUB;
    isApproved: boolean;
    staff: string[] = [];
    locked: boolean;
    disabled: boolean;
}
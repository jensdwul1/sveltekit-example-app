import { GenericStore } from "$lib/stores/_generic.store";
import { StoreIdentifier } from "$lib/stores/_storeIdentifier.enum";

export class NubStore extends GenericStore {
    id: StoreIdentifier = StoreIdentifier.NUB;
    isApproved: boolean;
    staff: string[] = [];
}
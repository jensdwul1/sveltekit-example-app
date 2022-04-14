import type { GenericStore } from "$lib/stores/_generic.store";
import { StoreIdentifier } from "$lib/stores/_storeIdentifier.enum";

export class StakeholderStore implements GenericStore {
    id: StoreIdentifier = StoreIdentifier.STAKEHOLDERS;
    /**
     * Stakeholders contains an array identifiers of the people collected by the application
     */
    stakeholders: string[] = [];
    primaryStakeholder: string;
    locked: boolean;
    disabled: boolean;
}
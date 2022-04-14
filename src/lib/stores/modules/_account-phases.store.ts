import type { GenericStore } from "$lib/stores/_generic.store";
import { StoreIdentifier } from "$lib/stores/_storeIdentifier.enum";

export enum AccountPhase {
    FINANCING = 'finance',
    ANALYSIS = 'analysis',
    PREPARATION = 'preparation',
    START = 'start',
    ROUTINE = 'routine'
}

export class AccountPhasesStore implements GenericStore {
    id: StoreIdentifier = StoreIdentifier.ACCOUNTPHASES;
    currentPhase: AccountPhase;
    locked: boolean;
    disabled: boolean;
}
import type { GenericStore } from "$lib/stores/_generic.store";
import type { PersonType } from "./people.type";

export interface DataEntryResponse {
    id?: string;
    stores?: GenericStore[];
    people?: PersonType[];
}
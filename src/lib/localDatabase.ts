import Dexie, {type Table} from 'dexie';
import type { DataEntryResponse } from './types/data-entry.type';

export class LocalDatabase extends Dexie {
    entries!: Table<DataEntryResponse>;
    constructor(){
        super('sveltekitExampleDatabase');
        this.version(1).stores({
            entries: '++id, stores, people'
        });
    }
}

export const db = new LocalDatabase();
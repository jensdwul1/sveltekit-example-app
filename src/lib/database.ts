import { CosmosClient, type CosmosClientOptions } from "@azure/cosmos";
import type { GenericStore } from "$lib/stores/_generic.store";
/**
 * Initialize Database Connect
 */
const endpoint = import.meta.env.VITE_ENDPOINT as string;
const secret = import.meta.env.VITE_KEY as string;
const databaseId = import.meta.env.VITE_DATABASE as string;
const containerId = import.meta.env.VITE_CONTAINER as string;

console.table({
    endpoint,
    secret,
    databaseId,
    containerId
});

const cosmosOptions: CosmosClientOptions = {
  endpoint,
  key: secret,
  userAgentSuffix: 'CosmosDBSvelte'
};

const cosmosClient = new CosmosClient(cosmosOptions);

const createDatabase = async () => {
    const { database } = await cosmosClient.databases.createIfNotExists({
        id: databaseId
    })
    console.log(`Created database:\n${database.id}\n`)
}

interface MedicalEntity {
    id?: string;
    stores?: GenericStore[];
}

const initializeCosmos = async () => {
    createDatabase();
}

const getDataFromCosmos = async (entityId: string) => {
    const resource: MedicalEntity = await cosmosClient
    .database(databaseId)
    .container(containerId)
    .item(entityId);
    if(resource){
        console.log('Resource',resource);
    }
    return resource;
}


const upsertDataToCosmos = async (entityId: string, data: GenericStore[]) => {
    // DB Payload
    const payload: MedicalEntity = {
        id: entityId,
        stores: data
    }
    // UPDATE COSMOS DB
    const { item } =  await cosmosClient
    .database(databaseId)
    .container(containerId)
    .items.upsert(payload);
    if(item){
        console.log('Save completed',item.id);
    } else {
        console.log('Save Failed', payload.id);
    }
    return item;
}

export default {
    client: cosmosClient,
    init: initializeCosmos,
    get: getDataFromCosmos,
    post: upsertDataToCosmos
}
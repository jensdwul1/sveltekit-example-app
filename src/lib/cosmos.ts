import { CosmosClient, type CosmosClientOptions } from "@azure/cosmos";
import type { GenericStore } from "$lib/stores/_generic.store";
import type { PersonType } from "./types/people.type";
import type { DataEntryResponse } from "./types/data-entry.type";
/**
 * Initialize Database Connect
 */

const redundancy = !!import.meta.env.VITE_KEY; 

const credentials = {
    endpoint: import.meta.env.VITE_ENDPOINT as string,
    secret: import.meta.env.VITE_KEY as string,
    databaseId: import.meta.env.VITE_DATABASE as string,
    containerId: import.meta.env.VITE_CONTAINER as string
}
if(!redundancy){
    credentials.endpoint = process.env.VITE_ENDPOINT as string;
    credentials.secret = process.env.VITE_KEY as string;
    credentials.databaseId = process.env.VITE_DATABASE as string;
    credentials.containerId = process.env.VITE_CONTAINER as string;
}
const {endpoint,secret,databaseId,containerId} = credentials;
let initialized = false;
// console.table({
//     endpoint,
//     secret,
//     databaseId,
//     containerId
// });

const cosmosOptions: CosmosClientOptions = {
  endpoint,
  key: secret,
  userAgentSuffix: 'CosmosDBSvelte'
};
const cosmosClient = secret?new CosmosClient(cosmosOptions):null;
const database = cosmosClient?.database(databaseId);
const container = database?.container(containerId);

if(!cosmosClient){
    console.error('NO COSMOS CREDENTIALS SET ::  CLIENT CREATION FAILURE');
}

const createDatabase = async () => {
    const { database } = await cosmosClient?.databases?.createIfNotExists({
        id: databaseId
    })
    console.log(`Created database:\n${database.id}\n`)
    initialized = true
    return initialized;
}

const initializeCosmos = async () => {
    if(!initialized){
        const isCreated = await createDatabase();
        return isCreated;
    } else {
        return true;
    }
}

const getData = async (entityId: string) => {
    await initializeCosmos();
    const querySpec = {
        query: 'SELECT * FROM root r WHERE r.id = @id',
        parameters: [
          {
            name: '@id',
            value: entityId
          }
        ]
      }

    const {resources} = await container?.items.query(querySpec).fetchAll();
    return resources && resources.length?resources[0]:{};
}

const postData = async (data: GenericStore[], people: PersonType[]) => {
    // DB Payload
    const payload: DataEntryResponse = {
        stores: data,
        people
    }
    // UPDATE COSMOS DB
    const response =  (await container?.items.create(payload)).resource;

    if(response){
        console.log('Save completed',response.id);
    } else {
        console.log('Save Failed', payload.id);
    }
    return response;
}

const updateData = async (entityId: string, data: GenericStore[], people: PersonType[]) => {
    // DB Payload
    const payload: DataEntryResponse = {
        id: entityId,
        stores: data,
        people
    }
    // UPDATE COSMOS DB
    const { item } = await container?.item(entityId).replace(payload);
    const result = await item?.read();
    if(result){
        return result.resource;
    } else {
        return payload;
    }
}

export default {
    client: cosmosClient,
    init: initializeCosmos,
    get: getData,
    post: postData,
    put: updateData
}
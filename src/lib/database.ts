import { CosmosClient, type CosmosClientOptions } from "@azure/cosmos";
import type { GenericStore } from "$lib/stores/_generic.store";
/**
 * Initialize Database Connect
 */
const endpoint = import.meta.env.VITE_ENDPOINT as string;
const secret = import.meta.env.VITE_KEY as string;
const databaseId = import.meta.env.VITE_DATABASE as string;
const containerId = import.meta.env.VITE_CONTAINER as string;

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

const cosmosClient = new CosmosClient(cosmosOptions);
const database = cosmosClient.database(databaseId);
const container = database.container(containerId);

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

const getData = async (entityId: string) => {
    const querySpec = {
        query: 'SELECT * FROM root r WHERE r.id = @id',
        parameters: [
          {
            name: '@id',
            value: entityId
          }
        ]
      }
    const {resources} = await container.items.query(querySpec).fetchAll();
    return resources && resources.length?resources[0]:{};
}

const insertData = async (data: GenericStore[]) => {
    // DB Payload
    const payload: MedicalEntity = {
        stores: data
    }
    // UPDATE COSMOS DB
    const response =  (await container.items.create(payload)).resource;

    if(response){
        console.log('Save completed',response.id);
    } else {
        console.log('Save Failed', payload.id);
    }
    return response;
}

const updateData = async (entityId: string, data: GenericStore[]) => {
    // DB Payload
    const payload: MedicalEntity = {
        id: entityId,
        stores: data
    }
    // UPDATE COSMOS DB
    const { item } = await container.item(entityId).replace(payload);
    const result = await item.read();
    if(result){
        console.log('Update completed',result.resource);
        return result.resource;
    } else {
        console.log('Update Failed', payload.id);
        return payload;
    }
}

export default {
    client: cosmosClient,
    init: initializeCosmos,
    get: getData,
    post: insertData,
    put: updateData
}
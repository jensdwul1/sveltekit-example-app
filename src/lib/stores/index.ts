import { writable } from "svelte/store";
import { browser } from "$app/env"
import { CosmosClient, type CosmosClientOptions } from "@azure/cosmos";
import { v4 as uuid } from '@lukeed/uuid';
import type { GenericStore } from "./_generic.store";
/**
 * Initialize Database Connect
 */
const endpoint = import.meta.env.VITE_ENDPOINT as string;
const secret = import.meta.env.VITE_KEY as string;
const databaseId = import.meta.env.VITE_DATABASE as string;
const containerId = import.meta.env.VITE_CONTAINER as string;

const entityId = (browser && localStorage.getItem("entityId") || uuid())
if(browser){
  localStorage.setItem('entityId', entityId);
}

const cosmosOptions: CosmosClientOptions = {
  endpoint,
  key: secret,
  userAgentSuffix: 'CosmosDBSvelte'
};

export const cosmosClient = new CosmosClient(cosmosOptions);

export const globalStore = (() => {
  const { subscribe, set, update} = writable([  ]);
  return {
    subscribe,
    set,
    reset: () => set([]),
    add: (newData) => update(n => [...n, newData]),
    remove: (id) => update(n => n.filter(m => m.id !== id)),
    update: (props) => {
      update((n) => n.map(entity => entity.id === props.id ? {...entity,...props} : entity))
    }
  }
})();

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

const getDataFromCosmos = async (entityId: string) => {
  const resource: MedicalEntity = await cosmosClient
  .database(databaseId)
  .container(containerId)
  .item(entityId);
  if(resource){
    console.log('Resource',resource);
  }
}
createDatabase().then(() => getDataFromCosmos(entityId));
/*
const upsertDataToCosmos = async (data: GenericStore[]) => {
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
}

globalStore.subscribe(globalData => upsertDataToCosmos(globalData));
*/
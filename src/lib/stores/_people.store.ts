import { writable } from "svelte/store";
import type { Option } from '$lib/types/generic.type';

export const peopleStore = (() => {
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

export let peopleOptions: Option[] = [];
peopleStore.subscribe((peopleCollection) => {
  peopleOptions = peopleCollection.map(person => {
    return { 
      label: person.firstName + (person.lastName?' '+person.lastName:''),
      value: person.id
    }
  })
})

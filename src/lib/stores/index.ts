import { writable } from "svelte/store";

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

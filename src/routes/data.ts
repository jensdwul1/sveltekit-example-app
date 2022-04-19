import db from '$lib/database';

/** @type {import('./data').RequestHandler} */
export async function get({ params }) {
    // `params.id` comes from [id].js
    const item = await db.get(params.id);
    if (item) {
      return {
        body: { item }
      };
    }
   
    return {
      status: 404
    };
}

/** @type {import('./data').RequestHandler} */
export async function post({params}) {
  const item = await db.post(params.id, params.stores);
  if (item) {
    return {
      body: { item }
    };
  }
 
  return {
    status: 500
  };
}
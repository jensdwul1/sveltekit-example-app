import db from '$lib/cosmos';

/** @type {import('./data').RequestHandler} */
export async function get({ url }) {
    if(db && db.client){
      const id: string = url.searchParams.get('id');
      // `params.id` comes from [id].js
      if(id && id !== null && id !== 'null'){
        const item = await db.get(id);
        if (item) {
          return {
            body: { ...item }
          };
        }
      } else {
        return {
          status: 200,
          body: {
            message: 'Welcome to the API endpoint.'
          }
        }
      }
    }
    return {
      status: 404,
      body: { message: 'Database is not available'}
    };
}

/** @type {import('./data').RequestHandler} */
export async function post({request}) {
  
  if(db && db.client){
    const params = await request.json();
    const item = (await db.post(params.stores, params.people));
    if (item) {
      return {
        status: 201,
        body: { item }
      };
    }
  }
  return {
    status: 400,
    body: { message: 'something wrong, brain no work' }
  };
}

/** @type {import('./data').RequestHandler} */
export async function put({request}) {  
  if(db && db.client){
    const params = await request.json();
    const item = await db.put(params.id, params.stores, params.people);
    if (item) {
      return {
        status: 202,
        body: { item }
      };
    }
  }
  return {
    status: 400,
    body: { message: 'something wrong, brain no work' }
  };
}
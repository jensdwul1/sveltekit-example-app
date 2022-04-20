import db from '$lib/database';

/** @type {import('./data').RequestHandler} */
export async function get({ url }) {
    const id: string = url.searchParams.get('id');
    // `params.id` comes from [id].js
    if(id){
      const item = await db.get(id);
      if (item) {
        return {
          body: { ...item }
        };
      }
    }
   
    return {
      status: 404
    };
}

/** @type {import('./data').RequestHandler} */
export async function post({request}) {
  
  const item = (await db.post(request.stores));
  if (item) {
    return {
      status: 201,
      body: { item }
    };
  }
  
  return {
    status: 400,
    body: { message: 'something wrong, brain no work' }
  };
}

/** @type {import('./data').RequestHandler} */
export async function put({request}) {
  const params = await request.json();
  const item = await db.put(params.id, params.stores);
  if (item) {
    return {
      status: 202,
      body: { item }
    };
  }
  
  return {
    status: 400,
    body: { message: 'something wrong, brain no work' }
  };
}
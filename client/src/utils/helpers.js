// helper function to get current year
export const getYear = (unix_time) => {
    const date = new Date(unix_time * 1000);

    return date.getFullYear();
}

// function that sets up promise for indexDb store that stores local data
export function idbPromise(storeName, method, object) {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open('shop-shop', 1);
  
      let db, tx, store;
  
      // when upgrade is needed update store's id's
      request.onupgradeneeded = function (e) {
        const db = request.result;
  
        db.createObjectStore('products', { keyPath: '_id' });
        db.createObjectStore('categories', { keyPath: '_id' });
        db.createObjectStore('cart', { keyPath: '_id' });
      };
      request.onerror = function (e) {
        console.log('There was an error');
      };
      
      // on success run request
      request.onsuccess = function (e) {
        db = request.result;
        tx = db.transaction(storeName, 'readwrite');
        store = tx.objectStore(storeName);
  
        db.onerror = function(e) {
          console.log('error', e);
        };
        
        // based on the type of request runs a specific function for the db
        switch (method) {
          case 'put':
            store.put(object);
            resolve(object);
            break;
          case 'get':
            const all = store.getAll();
            all.onsuccess = function() {
              resolve(all.result);
            };
            break;
          case 'delete':
            store.delete(object._id);
            break;
          default:
            console.log('No valid method');
            break;
        }
        
        // when app is completed close db
        tx.oncomplete = function() {
          db.close();
        };
      }
    });
  }
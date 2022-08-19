import { openDB } from "idb";

const initdb = async () =>
  // creating database called 'jate' which will use version 1 of the db
  openDB("jate", 1, {
    // adss db schema if it has not already been initialized
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// We want to inject data into our database; needs to accept content and id
export const putDb = async (content) => {
  // Creating a connection to the jateDb and the specific version we want to use (1)
  const jateDb = await openDB("jate", 1);
  // Creating a new transaction and specificying the db + data privileges
  const tx = jateDb.transaction("jate", "readwrite");
  // Opening up the desired object store
  const store = tx.objectStore("jate");
  // Passing in the content
  const request = store.put({ jate: content });
  // Confirming we did in fact passed in the data
  const result = await request;
  console.log("🚀 - data saved to the database", result);
};

// We want to access ALL the content (read only) in our db, no modifications allowed
export const getDb = async () => {
  console.log("GET from the dataabase");
  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  // Use the .getAll() to get all data in our db
  const request = store.getAll();
  const result = await request;
  console.log(result);
  return result;
};

initdb();

;(typeof window).toLowerCase() === 'undefined' && (global.window = global)

const dbEngine =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB
window.IDBTransaction = window.IDBTransaction ||
  window.webkitIDBTransaction ||
  window.msIDBTransaction || { READ_WRITE: 'readwrite' }
window.IDBKeyRange =
  window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

const dbName = 'ethereansos'
const dbTable = 'ethereansos'
const dbVersion = 1

function openDB(name, version) {
  return new Promise((ok, ko) => {
    const request = dbEngine.open(name, version)
    request.onerror = (event) => ko(event.target.errorCode)
    request.onsuccess = (event) => ok(event.target.result)
    request.onupgradeneeded = (event) => {
      const store = event.target.result.createObjectStore(dbTable, {
        autoIncrement: true,
      })
      const index = store.createIndex('key', 'key', {
        unique: true,
      })
    }
  })
}

function closeDB(db) {
  return new Promise((ok, ko) => {
    const request = db.close()
    if (!request) {
      return ok()
    }
    request.onerror = (event) => ko(event.target.errorCode)
    request.onsuccess = (event) => ok(event.target.result)
  })
}

function setItem(key, value) {
  return new Promise(async (ok, ko) => {
    const db = await openDB(dbName, dbVersion)

    const txn = db.transaction(dbTable, 'readwrite')

    const store = txn.objectStore(dbTable)

    const query = store.put({
      key,
      value:
        value && (typeof value).toLowerCase() === 'string'
          ? value
          : JSON.stringify(value || null),
    })

    query.onsuccess = (event) => ok(event.target.result)

    query.onerror = (event) => ko(event.target.errorCode)

    txn.oncomplete = async function () {
      await closeDB(db)
    }
  })
}

function getItem(key) {
  return new Promise(async (ok, ko) => {
    const db = await openDB(dbName, dbVersion)

    const txn = db.transaction(dbTable, 'readonly')

    const store = txn.objectStore(dbTable)

    const index = store.index('key')

    const query = index.get(key)

    query.onsuccess = (event) => ok(event.target?.result?.value || 'null')

    query.onerror = (event) => ko(event.target.errorCode)

    txn.oncomplete = async function () {
      await closeDB(db)
    }
  })
}

async function clear(key) {}

export default window.ethereansOSCache = {
  getItem,
  setItem,
  clear,
}
const { CosmosClient } = require('@azure/cosmos');
const config = require('./Config');

exports.createCosmosDbClient = async function createCosmosDbClient() {
  const { endpoint, key, databaseId, containerId, partitionKey } = config;
  const client = new CosmosClient({ endpoint, key });
  await client.databases.createIfNotExists({
    id: databaseId,
  });
  const { container } = await client
    .database(databaseId)
    .containers.createIfNotExists(
      { id: containerId, partitionKey },
      { offerThroughput: 400 }
    );
  return container;
}

exports.insertData = async function insertData(container, data) {
  return await container.items.create(data);
}

exports.selectAll = async function selectAll(container) {
  const querySpec = {
    query: 'SELECT * FROM c',
  };
  const { resources: items } = await container.items
    .query(querySpec)
    .fetchAll();
  return items;
}

exports.deleteItem = async function deleteItem(container, id, partitionKey) {
  const result = await container.item(id, partitionKey).delete();
  return result;
}

exports.updateItem = async function updateItem(container, id, partitionKey, updateItem) {
  const result = await container.item(id, partitionKey).replace(updateItem);
  return result;
}
module.exports  = {
    endpoint: process.env.COSMOS_ENDPOINT,
    key: process.env.COSMOS_KEY,
    databaseId: process.env.COSMOS_DATABASE_ID,
    containerId: process.env.COSMOS_CONTAINER_ID,
    partitionKey: { kind: 'Hash', paths: ['/id'] },
};
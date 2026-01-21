const { app } = require('@azure/functions');
const { CosmosClient } = require('@azure/cosmos');

const cosmosClient = new CosmosClient({
    endpoint: process.env.COSMOS_ENDPOINT,
    key: process.env.COSMOS_KEY
});

const database = cosmosClient.database('XigusaGrowthOS');

app.http('content-get', {
    methods: ['GET'],
    authLevel: 'function',
    handler: async (request, context) => {
        try {
            const container = database.container('ContentMachine');
            const { resources } = await container.items.readAll().fetchAll();
            
            return {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(resources)
            };
        } catch (error) {
            context.log('Error:', error);
            return {
                status: 500,
                body: JSON.stringify({ error: 'Failed to fetch content' })
            };
        }
    }
});

app.http('content-create', {
    methods: ['POST'],
    authLevel: 'function',
    handler: async (request, context) => {
        try {
            const body = await request.json();
            const container = database.container('ContentMachine');
            
            const newItem = {
                ...body,
                id: `content-${Date.now()}`,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            
            const { resource } = await container.items.create(newItem);
            
            return {
                status: 201,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(resource)
            };
        } catch (error) {
            context.log('Error:', error);
            return {
                status: 500,
                body: JSON.stringify({ error: 'Failed to create content' })
            };
        }
    }
});

app.http('content-update', {
    methods: ['PUT'],
    authLevel: 'function',
    route: 'content/{id}',
    handler: async (request, context) => {
        try {
            const id = request.params.id;
            const body = await request.json();
            const container = database.container('ContentMachine');
            
            const { resource: existingItem } = await container.item(id, id).read();
            const updatedItem = {
                ...existingItem,
                ...body,
                updatedAt: new Date().toISOString()
            };
            
            const { resource } = await container.item(id, id).replace(updatedItem);
            
            return {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(resource)
            };
        } catch (error) {
            context.log('Error:', error);
            return {
                status: 500,
                body: JSON.stringify({ error: 'Failed to update content' })
            };
        }
    }
});

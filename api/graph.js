const { app } = require('@azure/functions');
const { Client } = require('@microsoft/microsoft-graph-client');
const { ClientSecretCredential } = require('@azure/identity');

const credential = new ClientSecretCredential(
    process.env.AZURE_TENANT_ID,
    process.env.AZURE_CLIENT_ID,
    process.env.AZURE_CLIENT_SECRET
);

const getAuthenticatedClient = (accessToken) => {
    return Client.init({
        authProvider: (done) => {
            done(null, accessToken);
        }
    });
};

app.http('graph-tasks', {
    methods: ['GET'],
    authLevel: 'function',
    handler: async (request, context) => {
        try {
            const accessToken = request.headers.get('Authorization')?.replace('Bearer ', '');
            if (!accessToken) {
                return { status: 401, body: JSON.stringify({ error: 'No access token provided' }) };
            }

            const client = getAuthenticatedClient(accessToken);
            const tasks = await client.api('/me/planner/tasks').get();
            
            return {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(tasks.value)
            };
        } catch (error) {
            context.log('Error:', error);
            return {
                status: 500,
                body: JSON.stringify({ error: 'Failed to fetch tasks' })
            };
        }
    }
});

app.http('graph-create-task', {
    methods: ['POST'],
    authLevel: 'function',
    handler: async (request, context) => {
        try {
            const accessToken = request.headers.get('Authorization')?.replace('Bearer ', '');
            if (!accessToken) {
                return { status: 401, body: JSON.stringify({ error: 'No access token provided' }) };
            }

            const body = await request.json();
            const client = getAuthenticatedClient(accessToken);
            
            const task = await client.api('/planner/tasks').post(body);
            
            return {
                status: 201,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(task)
            };
        } catch (error) {
            context.log('Error:', error);
            return {
                status: 500,
                body: JSON.stringify({ error: 'Failed to create task' })
            };
        }
    }
});

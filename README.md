# XIGUSA Growth OS

A comprehensive business operations dashboard for managing content, technical deployments, PR outreach, and growth metrics with Microsoft 365 integration.

## 🚀 Features

- **Dashboard**: Mobile-first command center with daily momentum tracking
- **Content Machine**: Blog post management with SEO tracking and publishing calendar
- **Technical Tracker**: Deployment and infrastructure task management with progress visualization
- **Outreach Pipeline**: PR and backlink tracking with Kanban board
- **Growth Metrics**: Analytics dashboard with charts and historical data

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI**: Tailwind CSS + Lucide Icons + Recharts
- **Backend**: Azure Functions (Node.js 20)
- **Database**: Azure Cosmos DB
- **Authentication**: Azure AD B2C / MSAL
- **Integrations**: Microsoft Graph API (Planner, To-Do, Calendar)
- **Hosting**: Azure Static Web Apps
- **CI/CD**: GitHub Actions

## 📋 Prerequisites

- Node.js 20+
- Azure subscription
- Azure CLI installed
- GitHub account

## 🔧 Local Development Setup

### 1. Clone and Install

```bash
git clone https://github.com/curtpdc/xigusa-growth-os.git
cd xigusa-growth-os
npm install
cd api && npm install && cd ..
```

### 2. Configure Environment Variables

Create `.env` file in the root directory:

```env
VITE_AZURE_CLIENT_ID=your-client-id
VITE_AZURE_TENANT_ID=your-tenant-id
VITE_AZURE_REDIRECT_URI=http://localhost:5173
VITE_API_BASE_URL=http://localhost:7071/api
VITE_COSMOS_ENDPOINT=https://your-account.documents.azure.com:443/
VITE_COSMOS_KEY=your-cosmos-key
```

Create `api/local.settings.json`:

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "COSMOS_ENDPOINT": "https://your-account.documents.azure.com:443/",
    "COSMOS_KEY": "your-cosmos-key",
    "AZURE_TENANT_ID": "your-tenant-id",
    "AZURE_CLIENT_ID": "your-client-id",
    "AZURE_CLIENT_SECRET": "your-client-secret"
  }
}
```

### 3. Run Development Servers

Terminal 1 - Frontend:
```bash
npm run dev
```

Terminal 2 - API:
```bash
npm run api
```

Visit http://localhost:5173

## ☁️ Azure Deployment

### Step 1: Create Azure Resources

```bash
# Login to Azure
az login

# Create resource group
az group create --name xigusa-growth-os-rg --location eastus

# Create Cosmos DB account
az cosmosdb create \
  --name xigusa-growth-os-db \
  --resource-group xigusa-growth-os-rg \
  --kind GlobalDocumentDB

# Create Static Web App
az staticwebapp create \
  --name xigusa-growth-os \
  --resource-group xigusa-growth-os-rg \
  --source https://github.com/curtpdc/xigusa-growth-os \
  --location eastus2 \
  --branch main \
  --app-location "/" \
  --api-location "api" \
  --output-location "dist" \
  --token <YOUR_GITHUB_PAT>
```

### Step 2: Configure Azure AD B2C

1. Go to Azure Portal → Azure AD B2C
2. Create new B2C tenant or use existing
3. Register new application:
   - Name: XIGUSA Growth OS
   - Redirect URI: https://your-site.azurestaticapps.net
   - Enable ID tokens
4. API Permissions → Add:
   - Microsoft Graph → User.Read
   - Microsoft Graph → Tasks.ReadWrite
   - Microsoft Graph → Calendars.ReadWrite

### Step 3: Initialize Cosmos DB

```bash
# Create database
az cosmosdb sql database create \
  --account-name xigusa-growth-os-db \
  --resource-group xigusa-growth-os-rg \
  --name XigusaGrowthOS

# Create containers
for container in ContentMachine TechnicalTracker OutreachPipeline GrowthMetrics MomentumLog; do
  az cosmosdb sql container create \
    --account-name xigusa-growth-os-db \
    --resource-group xigusa-growth-os-rg \
    --database-name XigusaGrowthOS \
    --name $container \
    --partition-key-path "/id"
done
```

### Step 4: Configure Static Web App Settings

```bash
az staticwebapp appsettings set \
  --name xigusa-growth-os \
  --setting-names \
    COSMOS_ENDPOINT="https://xigusa-growth-os-db.documents.azure.com:443/" \
    COSMOS_KEY="your-key" \
    AZURE_TENANT_ID="your-tenant-id" \
    AZURE_CLIENT_ID="your-client-id" \
    AZURE_CLIENT_SECRET="your-secret"
```

### Step 5: Configure Custom Domain (Optional)

```bash
az staticwebapp hostname set \
  --name xigusa-growth-os \
  --resource-group xigusa-growth-os-rg \
  --hostname ops.xigusa.com
```

## 🔐 Authentication Setup

The app uses MSAL (Microsoft Authentication Library) for Azure AD authentication:

1. Users click "Sign In"
2. Redirected to Microsoft login
3. After authentication, MSAL acquires access token
4. Token used for Microsoft Graph API calls
5. Session persists in sessionStorage

## 📊 Microsoft 365 Integration

### Planner Integration
- Syncs tasks to Microsoft Planner
- Creates boards automatically
- Updates task status bidirectionally

### To-Do Integration
- Daily task synchronization
- "Today's Focus" list populates from Planner
- Completed tasks marked in both systems

### Calendar Integration
- Weekly reflection reminders
- Content publishing deadlines
- PR follow-up events

## 🎨 Customization

### Theme Colors
Edit [tailwind.config.js](tailwind.config.js):

```js
theme: {
  extend: {
    colors: {
      primary: '#2563eb', // Blue
      secondary: '#7c3aed', // Purple
      accent: '#10b981', // Green
    }
  }
}
```

### Add New Database Collection

1. Create container in Cosmos DB
2. Add interface in `src/config/cosmosConfig.ts`
3. Create API endpoint in `api/`
4. Build UI component in `src/pages/`

## 📝 Project Structure

```
xigusa-growth-os/
├── src/
│   ├── components/      # Reusable UI components
│   ├── config/          # Auth & Cosmos configuration
│   ├── pages/           # Main dashboard views
│   ├── App.tsx          # Main app with routing
│   └── main.tsx         # Entry point
├── api/                 # Azure Functions backend
│   ├── content.js       # Content CRUD operations
│   ├── graph.js         # Microsoft Graph integration
│   └── host.json        # Functions configuration
├── public/              # Static assets
├── staticwebapp.config.json  # Azure SWA config
├── tailwind.config.js   # Tailwind CSS config
└── vite.config.ts       # Vite configuration
```

## 🚦 CI/CD Pipeline

GitHub Actions workflow automatically:
1. Builds React app on push to `main`
2. Runs TypeScript compiler
3. Deploys to Azure Static Web Apps
4. Deploys Azure Functions
5. Runs health checks

## 📈 Monitoring

- **Application Insights**: Automatic with Azure Static Web Apps
- **Cosmos DB Metrics**: Query performance and RU consumption
- **Function Logs**: View in Azure Portal → Function App → Logs

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file

## 🆘 Support

- Issues: [GitHub Issues](https://github.com/curtpdc/xigusa-growth-os/issues)
- Email: support@xigusa.com
- Documentation: [Wiki](https://github.com/curtpdc/xigusa-growth-os/wiki)

## 🎯 Roadmap

- [ ] Power Automate flow templates
- [ ] Power BI embedded dashboard
- [ ] Google Search Console integration
- [ ] Automated SEO reporting
- [ ] Mobile app (React Native)
- [ ] Slack integration
- [ ] Email digest automation

---

Built with ❤️ by XIGUSA | Powered by Azure + Microsoft 365

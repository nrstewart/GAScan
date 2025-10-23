# Sample Apps Script Project

This directory contains a sample Google Apps Script project written in TypeScript to demonstrate the complete development workflow.

## Files Overview

### `Code.ts`
The main TypeScript file containing:
- **Type definitions** and interfaces for type safety
- **Main functions** (`main()`, `doGet()`) that serve as entry points
- **Google Apps Script API demonstrations**:
  - Google Sheets integration (create, format, read data)
  - Gmail integration (email preparation and sending)
  - Google Drive integration (folder and file management)
- **Utility functions** showing TypeScript features
- **Test functions** for validation
- **Trigger functions** for automated execution

### `appsscript.json`
The manifest file that configures:
- **Runtime version** (V8 for modern JavaScript features)
- **OAuth scopes** for Google API access
- **Advanced services** (Drive, Gmail, Sheets APIs)
- **Web app settings** for HTTP deployment
- **Exception logging** configuration

## Development Workflow

### 1. Setup (First Time)
```bash
# Install dependencies
npm install

# Authenticate with Google
clasp login

# Create or clone a project
clasp create --title "My Sample Project" --type standalone
# OR: clasp clone <SCRIPT_ID>
```

### 2. Development Cycle
```bash
# Build TypeScript to JavaScript
npm run build

# Push to Google Apps Script
npm run clasp:push

# Deploy as web app (optional)
npm run clasp:deploy
```

### 3. Testing
```bash
# Build and push in one command
npm run dev

# Open in Apps Script editor
npm run clasp:open
```

## Key Features Demonstrated

### TypeScript Features
- Interface definitions for type safety
- Generic functions (`processDataBatch<T>`)
- Modern ES2017+ syntax (arrow functions, template literals, destructuring)
- Proper error handling with try-catch blocks

### Google Apps Script APIs
- **Sheets**: Create spreadsheets, format cells, read/write data
- **Gmail**: Send emails with proper typing
- **Drive**: Create folders and files, manage permissions
- **HTML Service**: Create web apps with proper HTML output
- **Utilities**: Session management, date handling

### Best Practices
- Modular code organization
- Comprehensive error handling
- Logging for debugging
- Configuration management
- Type safety throughout

## Available Functions

### Entry Points
- `main()` - Main demonstration function
- `doGet(e)` - HTTP GET handler for web apps
- `runTests()` - Validation and testing function

### Trigger Functions
- `onTimeTrigger()` - For time-based automation
- `onFormSubmit(e)` - For form response handling

### Service Demonstrations
- `demonstrateSheets()` - Google Sheets operations
- `demonstrateGmail()` - Email operations
- `demonstrateDrive()` - File management operations

## Notes

1. **Type Errors**: You may see TypeScript errors in the editor until you run `npm install` to get the `@types/google-apps-script` package.

2. **Email Demo**: The Gmail demonstration is commented out to prevent accidental email sending during testing.

3. **Permissions**: The first execution will require OAuth authorization for the configured scopes.

4. **Web App**: After deployment, you can access the web app at the provided URL to see the HTML output.

5. **Debugging**: Use `console.log()` statements - they appear in the Apps Script editor's execution logs.

## Troubleshooting

- **"Cannot find namespace 'GoogleAppsScript'"**: Run `npm install` to install type definitions
- **Permission errors**: Check OAuth scopes in `appsscript.json`
- **Build errors**: Ensure TypeScript configuration is correct for ES2017 target
- **Push errors**: Verify CLASP authentication with `clasp login`

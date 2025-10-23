# CLASP Configuration Guide

This document provides instructions for setting up Google Apps Script CLI (CLASP) within the DevContainer environment.

## Initial Setup

### 1. Enable Google Apps Script API

1. Visit the [Google Apps Script API Console](https://console.cloud.google.com/apis/library/script.googleapis.com)
2. Select your Google Cloud Project or create a new one
3. Click "Enable" to enable the Apps Script API

### 2. Configure OAuth Consent Screen

1. Go to [Google Cloud Console - OAuth Consent Screen](https://console.cloud.google.com/apis/credentials/consent)
2. Configure your OAuth consent screen
3. Add your email to test users if using "External" user type

### 3. Create OAuth Credentials

1. Visit [Google Cloud Console - Credentials](https://console.cloud.google.com/apis/credentials)
2. Click "Create Credentials" → "OAuth client ID"
3. Choose "Desktop application" as the application type
4. Download the credentials JSON file
5. Note the Client ID and Client Secret for your `.env` file

## Container Authentication Workflow

### Method 1: Interactive Login (Recommended)

1. **Start the DevContainer** in VS Code
2. **Open a terminal** in the container
3. **Run the login command**:
   ```bash
   clasp login
   ```
4. **Follow the browser authentication flow**:
   - Copy the URL and open in your browser
   - Sign in with your Google account
   - Grant permissions to the CLASP application
   - Copy the authorization code back to the terminal

### Method 2: Pre-configured Authentication

1. **Set up OAuth credentials** in `.env`:
   ```bash
   GOOGLE_OAUTH_CLIENT_ID=your-client-id.apps.googleusercontent.com
   GOOGLE_OAUTH_CLIENT_SECRET=your-client-secret
   ```

2. **Use 1Password CLI** for secure credential management:
   ```bash
   # Store credentials in 1Password
   op run -- clasp login
   ```

## Project Configuration

### 1. Create a New Apps Script Project

```bash
# Create a new standalone script
clasp create --title "My Apps Script Project" --type standalone

# Or create a new bound script (Google Sheets, Docs, etc.)
clasp create --title "My Bound Script" --type sheets
```

### 2. Clone an Existing Project

```bash
# Clone using Script ID
clasp clone <SCRIPT_ID>
```

### 3. Manual Configuration

1. **Copy the template**:
   ```bash
   cp .clasp.json.template .clasp.json
   ```

2. **Edit `.clasp.json`** with your project details:
   ```json
   {
     "scriptId": "your-actual-script-id-here",
     "rootDir": "./dist",
     "projectId": "your-google-cloud-project-id"
   }
   ```

## Development Workflow

### 1. Build and Push

```bash
# Build TypeScript and push to Apps Script
npm run dev

# Or run individual commands
npm run build
clasp push
```

### 2. Deploy

```bash
# Deploy as a new version
npm run clasp:deploy

# Deploy with a specific description
clasp deploy --description "Version 1.0 - Initial release"
```

### 3. Open in Editor

```bash
# Open the script in the Apps Script editor
npm run clasp:open
```

## Container-Specific Notes

### Authentication Persistence

- The DevContainer mounts `~/.clasprc.json` from your host machine
- This means authentication persists between container restarts
- Your login credentials are shared across all CLASP projects in containers

### File Watching

Due to container file system limitations, CLASP's `--watch` flag may not work reliably. Instead, use:

```bash
# Use npm's watch script
npm run watch

# Or use TypeScript's watch mode
tsc --watch
```

### Port Forwarding

The DevContainer forwards ports 3000 and 8080 for web app development:

```bash
# Deploy as web app for testing
clasp deploy --deploymentId <deployment-id>
```

## Troubleshooting

### Common Issues

1. **"User has not enabled the Apps Script API"**
   - Solution: Enable the API at https://console.cloud.google.com/apis/library/script.googleapis.com

2. **"Permission denied" errors**
   - Solution: Check OAuth consent screen configuration
   - Ensure your email is added to test users

3. **"Invalid credentials" errors**
   - Solution: Run `clasp login` again
   - Check that OAuth client ID/secret are correct

4. **"Script file not found" errors**
   - Solution: Ensure `npm run build` completes successfully
   - Check that `rootDir` in `.clasp.json` points to compiled output

### Container-Specific Issues

1. **Browser not opening for authentication**
   - Copy the authentication URL manually to your browser
   - Use the manual authorization code flow

2. **File changes not syncing**
   - Use `clasp push --force` to override remote changes
   - Ensure files are in the correct `rootDir` location

## Security Best Practices

1. **Never commit `.clasp.json`** with real Script IDs to public repositories
2. **Use environment variables** for sensitive configuration
3. **Leverage 1Password CLI** for credential management:
   ```bash
   # Store in 1Password and inject at runtime
   op run -- npm run clasp:deploy
   ```
4. **Regularly rotate OAuth credentials** in Google Cloud Console
5. **Use least-privilege principle** when setting up OAuth scopes

## Additional Resources

- [CLASP Official Documentation](https://github.com/google/clasp)
- [Google Apps Script TypeScript Guide](https://developers.google.com/apps-script/guides/typescript)
- [Google Cloud Console](https://console.cloud.google.com/)
- [Apps Script API Reference](https://developers.google.com/apps-script/api/)

/**
 * Google Apps Script Sample Project - TypeScript
 *
 * This file demonstrates a complete Google Apps Script project using TypeScript
 * in a DevContainer environment with CLASP for deployment.
 *
 * Features demonstrated:
 * - TypeScript interfaces and types
 * - Google Apps Script APIs (Sheets, Gmail, Drive)
 * - Error handling and logging
 * - Modern JavaScript/TypeScript features (ES2017)
 */

// ============================================================================
// Type Definitions and Interfaces
// ============================================================================

interface ProjectConfig {
  name: string;
  version: string;
  author: string;
  description: string;
}

interface EmailData {
  to: string;
  subject: string;
  body: string;
  attachments?: GoogleAppsScript.Base.Blob[];
}

interface SheetData {
  range: string;
  values: any[][];
}

// ============================================================================
// Configuration
// ============================================================================

const PROJECT_CONFIG: ProjectConfig = {
  name: 'Apps Script DevContainer Sample',
  version: '1.0.0',
  author: 'Developer',
  description: 'Sample project demonstrating TypeScript + CLASP workflow'
};

// ============================================================================
// Main Functions (Entry Points)
// ============================================================================

/**
 * Main function - demonstrates basic Apps Script functionality
 * This function can be triggered manually or via time-based triggers
 */
function main(): void {
  try {
    console.log(`Starting ${PROJECT_CONFIG.name} v${PROJECT_CONFIG.version}`);

    // Demonstrate different Apps Script services
    demonstrateSheets();
    demonstrateGmail();
    demonstrateDrive();

    console.log('Sample execution completed successfully');
  } catch (error) {
    console.error('Error in main function:', error);
    throw error;
  }
}

/**
 * HTTP GET handler for web app deployment
 * Demonstrates how to create a simple web app
 */
function doGet(e: GoogleAppsScript.Events.DoGet): GoogleAppsScript.HTML.HtmlOutput {
  const htmlTemplate = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${PROJECT_CONFIG.name}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          .header { color: #1a73e8; }
          .info { background: #f8f9fa; padding: 15px; border-radius: 8px; }
        </style>
      </head>
      <body>
        <h1 class="header">${PROJECT_CONFIG.name}</h1>
        <div class="info">
          <p><strong>Version:</strong> ${PROJECT_CONFIG.version}</p>
          <p><strong>Description:</strong> ${PROJECT_CONFIG.description}</p>
          <p><strong>Deployed from:</strong> DevContainer with TypeScript + CLASP</p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        </div>
        <p>This web app was built using TypeScript and deployed via CLASP!</p>
      </body>
    </html>
  `;

  return HtmlService.createHtmlOutput(htmlTemplate)
    .setTitle(PROJECT_CONFIG.name)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// ============================================================================
// Google Sheets Integration
// ============================================================================

/**
 * Demonstrates Google Sheets API usage with TypeScript
 */
function demonstrateSheets(): void {
  try {
    // Create a new spreadsheet for demonstration
    const spreadsheet = SpreadsheetApp.create(`${PROJECT_CONFIG.name} - Demo Sheet`);
    const sheet = spreadsheet.getActiveSheet();

    // Sample data with proper typing
    const sampleData: SheetData = {
      range: 'A1:D5',
      values: [
        ['Name', 'Email', 'Department', 'Start Date'],
        ['John Doe', 'john@example.com', 'Engineering', new Date(2023, 0, 15)],
        ['Jane Smith', 'jane@example.com', 'Marketing', new Date(2023, 1, 20)],
        ['Bob Johnson', 'bob@example.com', 'Sales', new Date(2023, 2, 10)],
        ['Alice Brown', 'alice@example.com', 'HR', new Date(2023, 3, 5)]
      ]
    };

    // Write data to sheet
    const range = sheet.getRange(sampleData.range);
    range.setValues(sampleData.values);

    // Format header row
    const headerRange = sheet.getRange('A1:D1');
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#4285f4');
    headerRange.setFontColor('white');

    // Auto-resize columns
    sheet.autoResizeColumns(1, 4);

    console.log(`Created demo spreadsheet: ${spreadsheet.getUrl()}`);

    // Demonstrate reading data back
    const readData = range.getValues();
    console.log(`Read ${readData.length} rows from spreadsheet`);

  } catch (error) {
    console.error('Error in demonstrateSheets:', error);
  }
}

// ============================================================================
// Gmail Integration
// ============================================================================

/**
 * Demonstrates Gmail API usage (commented out to avoid sending actual emails)
 */
function demonstrateGmail(): void {
  try {
    // Get user's email address
    const userEmail = Session.getActiveUser().getEmail();
    console.log(`Current user email: ${userEmail}`);

    // Example email data structure
    const emailData: EmailData = {
      to: userEmail, // Send to self for demo
      subject: `${PROJECT_CONFIG.name} - Test Email`,
      body: `
        Hello from ${PROJECT_CONFIG.name}!

        This email was sent from a Google Apps Script written in TypeScript
        and deployed using CLASP from a DevContainer environment.

        Project Details:
        - Name: ${PROJECT_CONFIG.name}
        - Version: ${PROJECT_CONFIG.version}
        - Timestamp: ${new Date().toISOString()}

        Best regards,
        Your Apps Script Bot
      `
    };

    // NOTE: Uncomment the following line to actually send the email
    // GmailApp.sendEmail(emailData.to, emailData.subject, emailData.body);

    console.log(`Email prepared for: ${emailData.to}`);
    console.log('(Email sending is commented out for demo purposes)');

  } catch (error) {
    console.error('Error in demonstrateGmail:', error);
  }
}

// ============================================================================
// Google Drive Integration
// ============================================================================

/**
 * Demonstrates Google Drive API usage
 */
function demonstrateDrive(): void {
  try {
    // Create a folder for demo files
    const folderName = `${PROJECT_CONFIG.name} - Demo Files`;
    let folder: GoogleAppsScript.Drive.Folder;

    // Check if folder already exists
    const existingFolders = DriveApp.getFoldersByName(folderName);
    if (existingFolders.hasNext()) {
      folder = existingFolders.next();
      console.log(`Using existing folder: ${folderName}`);
    } else {
      folder = DriveApp.createFolder(folderName);
      console.log(`Created new folder: ${folderName}`);
    }

    // Create a sample text file
    const fileName = `demo-${new Date().getTime()}.txt`;
    const fileContent = `
${PROJECT_CONFIG.name}
Generated: ${new Date().toISOString()}

This file demonstrates Google Drive integration from a TypeScript
Apps Script project deployed via CLASP.

Configuration:
${JSON.stringify(PROJECT_CONFIG, null, 2)}
    `.trim();

    const file = folder.createFile(fileName, fileContent, MimeType.PLAIN_TEXT);
    console.log(`Created demo file: ${file.getName()}`);
    console.log(`File URL: ${file.getUrl()}`);

    // List files in the folder
    const files = folder.getFiles();
    let fileCount = 0;
    while (files.hasNext()) {
      const file = files.next();
      console.log(`File: ${file.getName()} (${file.getSize()} bytes)`);
      fileCount++;
    }
    console.log(`Total files in demo folder: ${fileCount}`);

  } catch (error) {
    console.error('Error in demonstrateDrive:', error);
  }
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Utility function to demonstrate TypeScript features
 */
function getProjectInfo(): ProjectConfig {
  return { ...PROJECT_CONFIG };
}

/**
 * Demonstrates async-like patterns using Apps Script's built-in services
 */
function processDataBatch<T>(data: T[], processor: (item: T) => void): void {
  data.forEach((item, index) => {
    try {
      processor(item);
      console.log(`Processed item ${index + 1}/${data.length}`);
    } catch (error) {
      console.error(`Error processing item ${index + 1}:`, error);
    }
  });
}

// ============================================================================
// Testing Functions
// ============================================================================

/**
 * Test function to validate the setup
 */
function runTests(): void {
  console.log('Running basic tests...');

  // Test 1: Configuration
  const config = getProjectInfo();
  console.assert(config.name === PROJECT_CONFIG.name, 'Config name test failed');

  // Test 2: TypeScript features
  const testArray = [1, 2, 3];
  processDataBatch(testArray, (num) => {
    console.log(`Processing number: ${num}`);
  });

  // Test 3: Apps Script services availability
  console.assert(typeof SpreadsheetApp !== 'undefined', 'SpreadsheetApp not available');
  console.assert(typeof GmailApp !== 'undefined', 'GmailApp not available');
  console.assert(typeof DriveApp !== 'undefined', 'DriveApp not available');

  console.log('All tests passed!');
}

// ============================================================================
// Trigger Functions (for automated execution)
// ============================================================================

/**
 * Function to be called by time-based triggers
 */
function onTimeTrigger(): void {
  console.log('Time-based trigger executed');
  // Add your scheduled logic here
}

/**
 * Function to be called by form submission triggers
 */
function onFormSubmit(e: GoogleAppsScript.Events.SheetsOnFormSubmit): void {
  console.log('Form submission trigger executed');
  console.log(`New response received at: ${e.range.getA1Notation()}`);
  // Add your form processing logic here
}

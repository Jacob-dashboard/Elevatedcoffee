# Setting Up Google Sheets for Review Data

## Step 1: Create a Google Sheet
1. Go to sheets.google.com
2. Create a new blank spreadsheet
3. Name it "Elevated Coffee Reviews"

## Step 2: Add the Script
1. Go to Extensions → Apps Script
2. Delete any existing code
3. Paste the contents of `google-sheets-setup.gs`
4. Click Save (name it "Review Webhook")

## Step 3: Deploy
1. Click Deploy → New deployment
2. Type: Web app
3. Execute as: Me
4. Who has access: Anyone
5. Click Deploy
6. Copy the URL it gives you

## Step 4: Connect to Review Page
1. Open review.html in the repo
2. Find: `PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE`
3. Replace with the URL from Step 3
4. Commit and push — done!

Every review submission will now appear as a new row in your Google Sheet automatically.

// Google Apps Script — paste this into Extensions > Apps Script in your Google Sheet
// Then deploy as web app (Execute as: Me, Access: Anyone)

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  // Add headers if first row is empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Timestamp',
      'Age Range',
      'Price Preference',
      'Can Size Preference',
      'Calorie Importance',
      'Calorie Size Preference',
      'Black Coffee (No Adj) Rating',
      'Black Coffee Rating',
      'Vanilla Oat Rating',
      'Caramel Latte Rating',
      'Heard of Ashwagandha',
      'Heard of Lions Mane',
      'Heard of L-Theanine'
    ]);
  }

  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    data.ageRange || '',
    data.price || '',
    data.canSize || '',
    data.calorieImportance || '',
    data.calorieSizePreference || '',
    data.blackCoffeeNoAdj || '',
    data.blackCoffee || '',
    data.vanillaOat || '',
    data.caramelLatte || '',
    data.adaptogen_ashwagandha || '',
    data.adaptogen_lionsMane || '',
    data.adaptogen_lTheanine || ''
  ]);

  return ContentService.createTextOutput(JSON.stringify({status: 'success'}))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  return ContentService.createTextOutput('Elevated Coffee Review Webhook is active');
}

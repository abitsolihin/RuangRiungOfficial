# Setup Google Sheets untuk Admin Settings

## Langkah 1: Buat Google Sheet baru
1. Buka https://sheets.google.com
2. Buat spreadsheet baru bernama "Ruang Riung Admin"
3. Buat 2 sheet:
   - Sheet "Settings" dengan kolom: `feature` | `enabled` | `lastUpdated`
   - Sheet "WarTitle" (yang sudah ada untuk form)

## Langkah 2: Isi data awal di Sheet "Settings"
```
feature       | enabled | lastUpdated
topup         | true    | 2024-01-01
wartitle      | true    | 2024-01-01
```

## Langkah 3: Buat Google Apps Script
1. Di Google Sheet, klik Extensions > Apps Script
2. Hapus kode default, paste kode berikut:

```javascript
function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Settings');
  const data = sheet.getDataRange().getValues();
  
  const settings = {};
  for (let i = 1; i < data.length; i++) {
    settings[data[i][0]] = data[i][1];
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    data: settings
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const params = JSON.parse(e.postData.contents);
    const action = params.action;
    
    if (action === 'updateSettings') {
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Settings');
      const feature = params.feature;
      const enabled = params.enabled;
      
      const data = sheet.getDataRange().getValues();
      for (let i = 1; i < data.length; i++) {
        if (data[i][0] === feature) {
          sheet.getRange(i + 1, 2).setValue(enabled);
          sheet.getRange(i + 1, 3).setValue(new Date());
          break;
        }
      }
      
      return ContentService.createTextOutput(JSON.stringify({
        success: true
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Existing war title submission code
    if (action === 'submitWarTitle' || !action) {
      const warTitleSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('WarTitle');
      warTitleSheet.appendRow([
        params.nickname,
        params.username,
        params.discordUsername,
        params.joinedCommunity,
        params.titleChoice,
        params.timestamp || new Date()
      ]);
      
      return ContentService.createTextOutput(JSON.stringify({
        success: true
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Langkah 4: Deploy Apps Script
1. Klik Deploy > New deployment
2. Type: Web app
3. Execute as: Me
4. Who has access: Anyone
5. Deploy dan copy URL

## Langkah 5: Update .env
Paste URL ke file .env:
```
VITE_GOOGLE_SHEET_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

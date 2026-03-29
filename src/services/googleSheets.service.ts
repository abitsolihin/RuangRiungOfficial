import { WarTitleFormData } from '../types/wartitle.types';
import { GOOGLE_SHEET_URL } from '../constants/wartitle.constants';

export const submitToGoogleSheets = async (data: WarTitleFormData): Promise<boolean> => {
  try {
    await fetch(GOOGLE_SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nickname: data.nickname,
        username: data.username,
        discordUsername: data.discordUsername,
        joinedCommunity: data.joinedCommunity,
        titleChoice: data.titleChoice,
        timestamp: new Date().toISOString(),
      }),
    });

    // Note: mode 'no-cors' akan selalu return opaque response
    // Kita assume success jika tidak ada error
    return true;
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    return false;
  }
};

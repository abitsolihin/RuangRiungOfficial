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
        action: 'submitWarTitle',
        nickname: data.nickname,
        username: data.username,
        discordUsername: data.discordUsername,
        joinedCommunity: data.joinedCommunity,
        titleChoice: data.titleChoice,
        timestamp: new Date().toISOString(),
      }),
    });

    return true;
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    return false;
  }
};

export const getAdminSettings = async (): Promise<{ topup: boolean; wartitle: boolean } | null> => {
  try {
    const response = await fetch(GOOGLE_SHEET_URL, {
      method: 'GET',
    });
    const result = await response.json();
    
    if (result.success) {
      return {
        topup: result.data.topup === true || result.data.topup === 'TRUE',
        wartitle: result.data.wartitle === true || result.data.wartitle === 'TRUE',
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching admin settings:', error);
    return null;
  }
};

export const updateAdminSetting = async (feature: 'topup' | 'wartitle', enabled: boolean): Promise<boolean> => {
  try {
    await fetch(GOOGLE_SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'updateSettings',
        feature,
        enabled,
      }),
    });
    
    return true;
  } catch (error) {
    console.error('Error updating admin setting:', error);
    return false;
  }
};

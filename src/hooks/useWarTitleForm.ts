import { useState } from 'react';
import { WarTitleFormData } from '../types/wartitle.types';
import { submitToGoogleSheets } from '../services/googleSheets.service';

export const useWarTitleForm = () => {
  const [formData, setFormData] = useState<WarTitleFormData>({
    nickname: '',
    username: '',
    discordUsername: '',
    joinedCommunity: '',
    titleChoice: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFormChange = (field: keyof WarTitleFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const canSubmit = 
    formData.nickname.length >= 3 &&
    formData.username.length >= 3 &&
    formData.discordUsername.length >= 3 &&
    formData.joinedCommunity !== '' &&
    formData.titleChoice !== '';

  const handleSubmit = async () => {
    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);
    
    try {
      const success = await submitToGoogleSheets(formData);
      
      if (success) {
        setShowSuccess(true);
      } else {
        alert('Gagal mengirim data. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      nickname: '',
      username: '',
      discordUsername: '',
      joinedCommunity: '',
      titleChoice: '',
    });
    setShowSuccess(false);
  };

  return {
    formData,
    isSubmitting,
    showSuccess,
    canSubmit,
    handleFormChange,
    handleSubmit,
    resetForm,
  };
};

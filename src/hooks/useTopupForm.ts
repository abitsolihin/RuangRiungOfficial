import { useState, useRef } from 'react';

export const useTopupForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [username, setUsername] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [proofImage, setProofImage] = useState<string | null>(null);
  const [proofFileName, setProofFileName] = useState('');
  const [copied, setCopied] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file maksimal 5MB');
        return;
      }
      setProofFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProofImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setProofImage(null);
    setProofFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const generateOrderNumber = () => {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `RR-${timestamp}-${random}`;
  };

  const handleSubmitOrder = () => {
    const newOrderNumber = generateOrderNumber();
    setOrderNumber(newOrderNumber);
    setShowSuccess(true);
  };

  const resetForm = () => {
    setCurrentStep(1);
    setSelectedPackage(null);
    setUsername('');
    setWhatsapp('');
    setProofImage(null);
    setProofFileName('');
    setShowSuccess(false);
    setOrderNumber('');
  };

  const canProceedStep2 = selectedPackage !== null;
  const canProceedStep3 = username.length >= 3 && whatsapp.length >= 10;
  const canProceedStep4 = proofImage !== null;

  return {
    currentStep,
    setCurrentStep,
    selectedPackage,
    setSelectedPackage,
    username,
    setUsername,
    whatsapp,
    setWhatsapp,
    proofImage,
    proofFileName,
    copied,
    showSuccess,
    orderNumber,
    fileInputRef,
    copyToClipboard,
    handleFileChange,
    removeImage,
    handleSubmitOrder,
    resetForm,
    canProceedStep2,
    canProceedStep3,
    canProceedStep4,
  };
};

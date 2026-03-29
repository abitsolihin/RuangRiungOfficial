

export interface WarTitleFormData {
  nickname: string;
  username: string;
  discordUsername: string;
  joinedCommunity: 'Ya' | 'Belom' | '';
  titleChoice: 'Jajaka Kasep' | 'Mojang Geulis' | '';
}

export interface WarTitlePageProps {
  darkMode: boolean;
}

export interface WarTitleFormProps {
  darkMode: boolean;
  formData: WarTitleFormData;
  onFormChange: (field: keyof WarTitleFormData, value: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  canSubmit: boolean;
}

export interface SuccessMessageProps {
  darkMode: boolean;
  show: boolean;
  onClose: () => void;
  submittedData: WarTitleFormData;
}

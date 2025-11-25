import { useReducer, useRef } from 'react';

type State = {
  name: string;
  profileFile: File | null;
  previewImgUrl: string;
};

type Action =
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_PROFILE_FILE'; payload: File }
  | { type: 'SET_PREVIEW_URL'; payload: string };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_PROFILE_FILE':
      return { ...state, profileFile: action.payload };
    case 'SET_PREVIEW_URL':
      return { ...state, previewImgUrl: action.payload };
    default:
      return state;
  }
};

export const useEditProfile = (initialUrl: string) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [state, dispatch] = useReducer(reducer, {
    name: '',
    profileFile: null,
    previewImgUrl: initialUrl,
  });

  const triggerFileInput = () => fileInputRef.current?.click();

  const handleInputChange = (value: string) => {
    dispatch({ type: 'SET_NAME', payload: value });
  };

  const handleFileChange = (file?: File) => {
    if (!file) return;
    dispatch({ type: 'SET_PROFILE_FILE', payload: file });
    dispatch({ type: 'SET_PREVIEW_URL', payload: URL.createObjectURL(file) });
  };

  return {
    state,
    fileInputRef,
    triggerFileInput,
    handleInputChange,
    handleFileChange,
  };
};

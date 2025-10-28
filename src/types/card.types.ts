export interface CardProfileData {
  name: string;
  description: string;
  followers: number;
  dark: boolean;
  imageSource: string;
}

export interface CardProfileProps extends CardProfileData {
  isFollowing: boolean;
  onToggle: () => void;
}

export interface CardProfileCallbacks {
  onToggle: () => void;
  onImageLoad?: () => void;
  onImageError?: () => void;
}

export interface CardProfileConfig {
  showFollowerCount: boolean;
  allowToggle: boolean;
  theme: 'ligth' | 'dark' | 'auto';
}

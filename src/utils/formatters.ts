export const formatFollowers = (count: number): string => {
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1)}M`;
  }
  if (count >= 1_000) {
    return `${(count / 1_000).toFixed(1)}K`;
  }
  return count.toString();
};

export const validadeImageUrl = (url: string): boolean => {
  try {
    new URL(url);
    return /\.(jpg|jpeg|png|wepb|gif|svg)$/i.test(url);
  } catch {
    return false;
  }
};
//
//

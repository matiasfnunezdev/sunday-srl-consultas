/* eslint-disable @typescript-eslint/no-unused-vars -- N/A */
/* eslint-disable react/function-component-definition -- N/A */
import type { ReactNode } from 'react';
import React, { createContext, useContext, useState } from 'react';
import type { Tag } from '@/_domain/interfaces/tag/tag';

interface TagsContextProps {
  tags: Tag[];
  selectedTag: Tag | null;
  setSelectedTag: (user: Tag | null) => void;
}

const TagsContext = createContext<TagsContextProps | undefined>(undefined);

interface TagsProviderProps {
  children: ReactNode;
}

export const TagsProvider: React.FC<TagsProviderProps> = ({ children }) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);

  const value = { tags, selectedTag, setSelectedTag };

  return <TagsContext.Provider value={value}>{children}</TagsContext.Provider>;
};

export const useTags = (): TagsContextProps => {
  const context = useContext(TagsContext);
  if (context === undefined) {
    throw new Error('useTags must be used within a TagsProvider');
  }
  return context;
};
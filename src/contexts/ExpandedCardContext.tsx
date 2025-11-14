import React, { createContext, useContext, useState, ReactNode } from "react";

interface ExpandedCardContextType {
  expandedCardId: string | null;
  setExpandedCardId: (id: string | null) => void;
}

const ExpandedCardContext = createContext<ExpandedCardContextType | undefined>(
  undefined,
);

export const useExpandedCard = () => {
  const context = useContext(ExpandedCardContext);
  if (context === undefined) {
    throw new Error(
      "useExpandedCard must be used within an ExpandedCardProvider",
    );
  }
  return context;
};

interface ExpandedCardProviderProps {
  children: ReactNode;
}

export const ExpandedCardProvider: React.FC<ExpandedCardProviderProps> = ({
  children,
}) => {
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const handleSetExpandedCardId = (id: string | null) => {
    setExpandedCardId(id);
  };

  return (
    <ExpandedCardContext.Provider
      value={{ expandedCardId, setExpandedCardId: handleSetExpandedCardId }}
    >
      {children}
    </ExpandedCardContext.Provider>
  );
};

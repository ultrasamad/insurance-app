import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, {
  createContext,
  ReactNode,
  useContext,
  useRef,
  useState,
} from "react";

interface BottomSheetContextType {
  openBottomSheet: (content: ReactNode, snapPoints?: string[]) => void;
  closeBottomSheet: () => void;
}

const BottomSheetContext = createContext<BottomSheetContextType | undefined>(
  undefined
);

export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error("useBottomSheet must be used within a BottomSheetProvider");
  }
  return context;
};

interface BottomSheetProviderProps {
  children: ReactNode;
}

export const BottomSheetProvider: React.FC<BottomSheetProviderProps> = ({
  children,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [content, setContent] = useState<ReactNode>(null);
  const [snapPoints, setSnapPoints] = useState<string[]>(["25%", "50%"]);
  const [isVisible, setIsVisible] = useState(false);

  const openBottomSheet = (
    sheetContent: ReactNode,
    customSnapPoints?: string[]
  ) => {
    setContent(sheetContent);
    if (customSnapPoints) {
      setSnapPoints(customSnapPoints);
    }
    setIsVisible(true);
    setTimeout(() => {
      bottomSheetRef.current?.expand();
    }, 10);
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  const handleSheetChanges = (index: number) => {
    if (index === -1) {
      setContent(null);
      setIsVisible(false);
    }
  };

  const renderBackdrop = (props: any) => (
    <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
  );

  return (
    <BottomSheetContext.Provider value={{ openBottomSheet, closeBottomSheet }}>
      {children}
      {isVisible && (
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enablePanDownToClose={true}
          backdropComponent={renderBackdrop}
          backgroundStyle={{ backgroundColor: "#FFFFFF" }}
          handleIndicatorStyle={{ backgroundColor: "#E2E8F0" }}
          // Important: Don't capture touches when not needed
          android_keyboardInputMode="adjustPan"
        >
          <BottomSheetView style={{ flex: 1, padding: 16 }}>
            {content}
          </BottomSheetView>
        </BottomSheet>
      )}
    </BottomSheetContext.Provider>
  );
};

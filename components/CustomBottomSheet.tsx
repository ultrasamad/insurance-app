import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export type Ref = BottomSheet;

interface Props {
  title: string;
  children?: React.ReactNode;
}

const CustomBottomSheet = forwardRef<Ref, Props>((props, ref) => {
  const snapPoints = useMemo(() => ["25%", "50%", "75%"], []);

  // Custom backdrop component
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    []
  );

  // Close bottom sheet
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  // Close bottom sheet
  const handleCloseSheet = useCallback(() => {
    if (ref && typeof ref !== "function" && ref.current) {
      ref.current.close();
    }
  }, []);

  return (
    <BottomSheet
      ref={ref}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      index={-1} // Start hidden
      enablePanDownToClose={true}
      style={styles.bottomSheet}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView style={styles.contentContainer}>
        <Text style={styles.sheetTitle}>{props.title} 🎉</Text>

        {props.children}

        {/* Close button inside the sheet */}
        <TouchableOpacity style={styles.closeButton} onPress={handleCloseSheet}>
          <Text style={styles.closeButtonText}>Close Sheet</Text>
        </TouchableOpacity>
      </BottomSheetView>
    </BottomSheet>
  );
});

CustomBottomSheet.displayName = "CustomBottomSheet";

export default CustomBottomSheet;

const styles = StyleSheet.create({
  bottomSheet: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 10,
  },
  contentContainer: {
    flex: 1,
    padding: 24,
    alignItems: "center",
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  closeButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#FF3B30",
    borderRadius: 8,
    minWidth: 120,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

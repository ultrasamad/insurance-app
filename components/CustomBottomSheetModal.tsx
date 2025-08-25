import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

type Ref = BottomSheetModal;

interface Props {
  title: string;
  children?: React.ReactNode;
}

const CustomBottomSheetModal = forwardRef<Ref, Props>((props, ref) => {
  const snapPoints = useMemo(() => ["50%", "75%"], []);

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

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View>
          <Text style={styles.sheetTitle}>{props.title}</Text>
        </View>
        {props.children}
      </BottomSheetView>
    </BottomSheetModal>
  );
});

CustomBottomSheetModal.displayName = "CustomBottomSheetModal";

export default CustomBottomSheetModal;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
});

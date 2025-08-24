import { InfoSheet } from "../components/InfoSheet";
import { QuoteCalculatorSheet } from "../components/QuoteCalculatorSheet";
import { useBottomSheet } from "../contexts/BottomSheetContext";

export const useBottomSheetActions = () => {
  const { openBottomSheet, closeBottomSheet } = useBottomSheet();

  const showQuoteCalculator = (
    quoteDetails: any,
    onUpdateQuote: () => void
  ) => {
    openBottomSheet(
      <QuoteCalculatorSheet
        quoteDetails={quoteDetails}
        onUpdateQuote={onUpdateQuote}
      />,
      ["50%", "75%"] // Custom snap points
    );
  };

  const showInfoSheet = (title: string, description: string) => {
    openBottomSheet(
      <InfoSheet title={title} description={description} />,
      ["40%"] // Custom snap points
    );
  };

  const showCustomSheet = (content: React.ReactNode, snapPoints?: string[]) => {
    openBottomSheet(content, snapPoints);
  };

  return {
    showQuoteCalculator,
    showInfoSheet,
    showCustomSheet,
    closeBottomSheet,
  };
};

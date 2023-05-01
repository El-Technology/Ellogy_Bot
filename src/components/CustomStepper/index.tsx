import { Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState, FC, ReactNode } from "react";

interface ICustomStepperProps {
  children: ReactNode[] | ReactNode;
  finalFunc: () => {};
  handleReset: () => void;
}

export const CustomStepper: FC<ICustomStepperProps> = ({
  children,
  finalFunc,
  handleReset,
}) => {
  const pages = Array.isArray(children) ? children : [children];
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps] = useState(pages.length - 1);
  const { t } = useTranslation();

  const handleNext = () => {
    setCurrentStep((curr) => curr + 1);
  };
  const handleBack = () => {
    setCurrentStep((curr) => curr - 1);
  };
  const handleConfirm = () => {
    finalFunc();
    handleNext();
  };
  return (
    <>
      <Box sx={{ height: "100%" }}>{pages[currentStep]}</Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: "auto",
        }}
      >
        <Button
          className="rtl-able"
          onClick={currentStep === 0 ? handleReset : handleBack}
          sx={{
            width: "131px",
            minHeight: "41px",
            height: "41px",
            textAlign: "center !important",
            my: {
              xs: "10px",
              sm: "15px",
              md: "15px",
              xl: "15px",
            },
            alignSelf: {
              xs: "flex-start",
              sm: "flex-end",
              md: "flex-end",
              xl: "flex-end",
            },
            bgcolor: "#000000",
            color: "white",
            zIndex: 0,
            "&:hover": {
              transition: "0.5s opacity",
              bgcolor: "#000000",
              opacity: "0.7",
            },
          }}
        >
          {t(currentStep === 0 ? "clear" : "prev")}
        </Button>

        <Button
          className="rtl-able"
          style={{ display: currentStep === totalSteps ? "none" : "block" }}
          onClick={currentStep === totalSteps - 1 ? handleConfirm : handleNext}
          sx={{
            width: "131px",
            height: "41px",
            textAlign: "center !important",
            my: {
              xs: "10px",
              sm: "15px",
              md: "15px",
              xl: "15px",
            },
            alignSelf: "flex-end",
            bgcolor: "#000000",
            color: "white",
            zIndex: 0,
            "&:hover": {
              transition: "0.5s opacity",
              bgcolor: "#000000",
              opacity: "0.7",
            },
          }}
        >
          {t(currentStep === totalSteps - 1 ? "submit" : "next")}
        </Button>
      </Box>
    </>
  );
};

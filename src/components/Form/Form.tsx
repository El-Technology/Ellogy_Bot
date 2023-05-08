import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { OpenAIApi, Configuration } from "openai";
import { useMemo, useState } from "react";
import "./Form.styles.scss";

const propmtPrefix =
  "Create 5 SMART goals separate in English and separate in Arabic based on the following job description: ";

interface FormValues {
  title: string;
  question: string;
}

const isMobile = document.documentElement.clientWidth < 500;

export const Form = () => {
  const { register, handleSubmit, watch, reset } = useForm<FormValues>();

  const [englishCompletionResult, setEnglishCompletionResult] = useState("");
  const [arabicCompletionResult, setArabicCompletionResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation(["common", "inputs", "createTicket"]);

  const openaiInstance = useMemo(() => {
    const config = new Configuration({
      apiKey: process.env.REACT_APP_OPENAI_SECRET_KEY,
    });
    return new OpenAIApi(config);
  }, []);
  const handleReset = () => {
    reset();
  };
  const onSubmit = async (data: FormValues) => {
    setEnglishCompletionResult("");
    setArabicCompletionResult("");
    setIsLoading(true);
    const request = {
      model: "text-davinci-003",
      prompt: propmtPrefix + data.question + ".",
      temperature: 0.9,
      max_tokens: 650,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
      stop: [" Human:", " AI:"],
    };

    try {
      const result: any = await openaiInstance.createCompletion(request, {
        headers: undefined,
      });
      const choice = result.data.choices[0].text;

      const index = choice.indexOf("Arabic");
      setEnglishCompletionResult(
        (choice.slice(0, index) as string)
          .replace("\n\n", "")
          .replace(":", "")
          .replace("English", "")
          .replaceAll("\n", "<br />")
      );
      setArabicCompletionResult(
        (choice.slice(index) as string)
          .replace("\n\n", "")
          .replace(":", "")
          .replace("-", "")
          .replace(" - ", "")
          .replace("Arabic", "")
          .replaceAll("\n", "<br />")
          .replace("SMART", "")
          .replace("SMART Goals", "الأهداف:")
          .replace("Goals", "الأهداف:")
      );
      reset();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log("isMobile", isMobile);

  return (
    <>
      {isLoading && (
        <Backdrop sx={{ zIndex: "2" }} open={isLoading}>
          <CircularProgress
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              color: "grey",
            }}
          />
        </Backdrop>
      )}

      <Stack
        sx={{
          pointerEvents: isLoading ? "none" : "all",
          mb: "15px",
          height: "inherit",
          width: "100%",
        }}
      >
        <Typography
          className="rtl-able"
          sx={{
            mb: "26px",
            fontFamily: "Arvo",
            fontSize: "24px",
            fontWeight: 400,
            lineHeight: "30px",
          }}
        >
          {t("createTicket:welcome")}
        </Typography>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexGrow: 1,
              height: "inherit",
              justifyContent: "space-between",
              flexDirection: {
                xs: "column",
              },
            }}
          >
            <TextField
              className="rtl-able"
              {...register("title")}
              sx={{
                width: "100%",
                mb: {
                  xs: "15px",
                  sm: "26px",
                  md: "26px",
                  xl: "26px",
                },
              }}
              placeholder={t("inputs:title") || ""}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", tablet: "row" },
                justifyContent: { xs: "center", tablet: "space-between" },
                alignItems: { xs: "center", sm: "flex-start" },
                columnGap: { sm: "25px", md: "50px" },
                width: "100%",
              }}
            >
              <Box sx={{ width: { xs: "100%", tablet: "48%" } }}>
                <TextField
                  className="rtl-able"
                  {...register("question")}
                  multiline
                  dir={
                    watch("question") &&
                    watch("question").match("[\u0600-\u06FF\u0750-\u077F]")
                      ? "rtl"
                      : "ltr"
                  }
                  placeholder={t("inputs:ticketDesc") || ""}
                  inputProps={{
                    sx: {
                      "& > textarea": {
                        height: "100%",
                      },
                      shrink: true,
                    },
                  }}
                  sx={{
                    height: {
                      xs: "250px",
                      sm: "350px",
                      tablet: "450px",
                      md: "500px",
                      xl: "50vh",
                    },
                    width: "100%",
                    "& .MuiInputBase-root": {
                      height: "100%",
                      boxSizing: "content-box",
                      padding: "14px",
                      "& textarea": {
                        overflow: "unset !important",
                        height: "100% !important",
                      },
                    },
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "15px",
                  }}
                >
                  <Button
                    className="rtl-able"
                    onClick={handleReset}
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
                    {t("clear")}
                  </Button>
                  <Button
                    className="rtl-able"
                    style={{
                      display: "block",
                    }}
                    onClick={handleSubmit(onSubmit)}
                    type="submit"
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
                    {t("submit")}
                  </Button>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: {
                    xs: "250px",
                    sm: "350px",
                    tablet: "450px",
                    md: "500px",
                    xl: "50vh",
                  },
                  width: { xs: "100%", tablet: "48%" },
                }}
              >
                <div className="form__output rtl-able">
                  {englishCompletionResult && arabicCompletionResult ? (
                    <>
                      <div
                        dir="ltr"
                        style={{ textAlign: "left" }}
                        dangerouslySetInnerHTML={{
                          __html: englishCompletionResult,
                        }}
                      />
                      <br />
                      <div
                        dir="rtl"
                        dangerouslySetInnerHTML={{
                          __html: arabicCompletionResult,
                        }}
                      />
                    </>
                  ) : (
                    <div className="form__output__placeholder">
                      {t("inputs:ticketResult")}
                    </div>
                  )}
                </div>
              </Box>
            </Box>
          </Box>
        </form>
      </Stack>
    </>
  );
};

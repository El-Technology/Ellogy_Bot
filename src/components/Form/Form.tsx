import { Backdrop, Box, Button, CircularProgress, Stack, TextField, Typography } from "@mui/material"
import { useForm } from "react-hook-form";
import { OpenAIApi, Configuration } from 'openai';
import { useMemo, useState } from 'react';
import './Form.styles.scss';

const propmtPrefix = 'Create 5 SMART goals separate in English and separate in Arabic based on the following job description: ';

interface FormValues {
    title: string;
    question: string;
}

const isMobile = document.documentElement.clientWidth < 500;

export const Form = () => {
  const { register, handleSubmit, watch } = useForm<FormValues>();
  const [englishCompletionResult, setEnglishCompletionResult] = useState('');
  const [arabicCompletionResult, setArabicCompletionResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const openaiInstance = useMemo(() => {
    const config = new Configuration({ apiKey: process.env.REACT_APP_OPENAI_SECRET_KEY })
    return new OpenAIApi(config)
  }, [])

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    const request = {
      model: "text-davinci-003",
      prompt: propmtPrefix + data.question + '.',
      temperature: 0.9,
      max_tokens: 650,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
      stop: [" Human:", " AI:"]
    }
  
    try {
        const result: any = await openaiInstance.createCompletion(request, { headers: undefined });
        const choice = result.data.choices[0].text;
        const index = choice.indexOf('Arabic');
        setEnglishCompletionResult((choice.slice(0, index) as string).replace('\n\n', '')
            .replace(':', '')
            .replace('English', '')
            .replaceAll('\n', '<br />'));
        setArabicCompletionResult((choice.slice(index) as string).replace('\n\n', '')
            .replace(':', '')
            .replace('-', '')
            .replace(' - ', '')
            .replace('Arabic', '')
            .replaceAll('\n', '<br />')
            .replace('SMART', '')
            .replace('SMART Goals', 'الأهداف:')
            .replace('Goals', 'الأهداف:')
            );
    }
    catch (error) {
        console.error(error);
    }
    finally {
        setIsLoading(false);
    }    
  };

  console.log('isMobile', isMobile);

  return (
    <>
    {
        isLoading
        &&
        <Backdrop sx={{ zIndex: '2' }} open={isLoading}>
            <CircularProgress
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    color: 'grey'
                }}
            />
        </Backdrop>
    }

        <Stack sx={{ pointerEvents: isLoading ? 'none' : 'all', mb: '15px' }}>
            <Typography
                sx={{
                    mb: '26px',
                    fontFamily: 'Arvo',
                    fontSize: '24px',
                    fontWeight: 400,
                    lineHeight: '30px',
                }}
            >
                Welcome to your SMART Objective Generator
            </Typography>
            <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    {...register("title")}
                    sx={{
                        mb: {
                            xs: '15px',
                            sm: '26px',
                            md: '26px',
                            xl: '26px'
                        },
                     }}
                    placeholder="Title"
                />
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                            md: 'row',
                            xl: 'row'
                        }
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: {
                                xs: 'flex-start',
                                sm: 'flex-end',
                                md: 'flex-end',
                                xl: 'flex-end',
                            },
                            height: {
                                xs: '162px',
                                sm: 'auto',
                                md: 'auto',
                                xl: 'auto'
                            },
                            width: {
                                xs: '100%',
                                sm: '48%',
                                md: '48%',
                                xl: '48%'
                            },
                            mb: {
                                xs: '65px',
                                sm: 'auto',
                                md: 'auto',
                                xl: 'auto'
                            }
                        }}
                     >
                        <TextField
                            {...register("question")}
                            multiline
                            dir={watch('question') && watch('question').match('[\u0600-\u06FF\u0750-\u077F]') ? 'rtl' : 'ltr'}
                            placeholder="Please describe your role within the organization here, or copy past the key activities from your job description."
                            inputProps={{
                                sx: {
                                    "& > textarea": {
                                        height: '100%',
                                    },
                                    shrink: true,
                                    "&::placeholder": {
                                        position: 'absolute',
                                    }
                                }
                            }}
                            sx={{
                                width: '100%',
                                height: '100%',
                                '& .MuiInputBase-root': {
                                    height: '50.3vh',
                                    boxSizing: 'content-box',
                                    padding: '14px',
                                    '& textarea': {
                                        overflow: 'unset !important',
                                        height: '100% !important'
                                    }
                                }
                            }}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Button
                            type="reset"
                            sx={{
                                width: '131px',
                                minHeight: '41px',
                                height: '41px',
                                my: {
                                    xs: '10px',
                                    sm: '15px',
                                    md: '15px',
                                    xl: '15px',
                                },
                                alignSelf: {
                                    xs: 'flex-start',
                                    sm: 'flex-end',
                                    md: 'flex-end',
                                    xl: 'flex-end'
                                },
                                bgcolor: '#000000',
                                color: 'white',
                                zIndex: 0,
                                opacity: isLoading ? 0.5 : 1,
                                "&:hover": {
                                    transition: '0.5s opacity',
                                    bgcolor: '#000000',
                                    opacity: '0.7'
                                }
                            }}
                            >
                                Clear text
                            </Button>
                            {isMobile && <Button
                                    type="submit"
                                    sx={{
                                        width: '131px',
                                        height: '41px',
                                        my: {
                                            xs: '10px',
                                            sm: '15px',
                                            md: '15px',
                                            xl: '15px',
                                        },
                                        alignSelf: 'flex-end',
                                        bgcolor: '#000000',
                                        color: 'white',
                                        zIndex: 0,
                                        opacity: isLoading ? 0.5 : 1,
                                        "&:hover": {
                                            transition: '0.5s opacity',
                                            bgcolor: '#000000',
                                            opacity: '0.7'
                                        }
                                    }}
                                >
                                    Submit
                                </Button>}
                        </Box>
                        
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: {
                                xs: '250px',
                                sm: 'auto',
                                md: 'auto',
                                xl: 'auto'
                            },
                            width: {
                                xs: '100%',
                                sm: '48%',
                                md: '48%',
                                xl: '48%'
                            }
                        }}
                    >

                        <div
                        className="form__output"
                        >
                            {
                                englishCompletionResult && arabicCompletionResult ? (
                                <>
                                    <div dangerouslySetInnerHTML={{ __html: englishCompletionResult }} />
                                    <br />
                                    <div dir="rtl" dangerouslySetInnerHTML={{ __html: arabicCompletionResult }} />
                                </>
                                ) : <div className="form__output__placeholder">Your suggested SMART Objectives will be shown here</div>
                            }
                        </div>
                        {!isMobile && <Button
                            type="submit"
                            sx={{
                                width: '131px',
                                height: '41px',
                                my: {
                                    xs: '10px',
                                    sm: '15px',
                                    md: '15px',
                                    xl: '15px',
                                },
                                alignSelf: 'flex-end',
                                bgcolor: '#000000',
                                color: 'white',
                                zIndex: 0,
                                opacity: isLoading ? 0.5 : 1,
                                "&:hover": {
                                    transition: '0.5s opacity',
                                    bgcolor: '#000000',
                                    opacity: '0.7'
                                }
                            }}
                        >
                            Submit
                        </Button>}
                    </Box>
                </Box>
            </form>
        </Stack>
    </>
  )
}
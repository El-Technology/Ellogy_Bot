import { Backdrop, Button, CircularProgress, Stack, TextField, Typography } from "@mui/material"
import { useForm } from "react-hook-form";
import { OpenAIApi, Configuration } from 'openai';
import { useMemo, useState } from 'react';
import './Form.styles.scss';

const propmtPrefix = 'Create 5 SMART goals separate in English and separate in Arabic based on the following job description: ';

interface FormValues {
    title: string;
    question: string;
}

export const Form = () => {
  const { register, handleSubmit } = useForm<FormValues>();
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
            .replace('Arabic', '')
            .replaceAll('\n', '<br />').replace('SMART Goals:', 'الأهداف:'));
    }
    catch (error) {
        console.error(error);
    }
    finally {
        setIsLoading(false);
    }    
  };

  return (
    <>
    {
        isLoading
        &&
        <Backdrop open={isLoading}>
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
                    sx={{ mb: '41px' }}
                    placeholder="Title"
                />
                <TextField
                    {...register("question")}
                    multiline
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
                        mb: '5px',
                        '& .MuiInputBase-root': {
                            height: '150px',
                            '& textarea': {
                                overflow: 'unset !important',
                                height: '100% !important'
                            }
                        }
                    }}
                />
                <Button
                    type="submit"
                    sx={{
                        width: '131px',
                        height: '41px',
                        mb: '15px',
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
                </Button>
            </form>
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
        </Stack>
    </>
  )
}
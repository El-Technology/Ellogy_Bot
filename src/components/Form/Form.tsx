import { Button, Stack, TextField, Typography } from "@mui/material"
import { useForm } from "react-hook-form"

export const Form = () => {
const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <Stack>
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
                        height: '198px',
                        '& textarea': {
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
                    color: 'white'
                }}
                >
                Submit
            </Button>
        </form>
        <TextField
            multiline
            disabled
            inputProps={{
                sx: {
                    shrink: true,
                    height: '100% !important',
                    "&::placeholder": {
                        position: 'absolute',
                        opacity: 1
                    }
                }
              }}
            sx={{
                mb: '5px',
                '& .MuiInputBase-root': {
                    height: '170px',
                    '& textarea': {
                        height: '100% !important'
                    }
                }
            }}
            placeholder="Your suggested SMART Objectives will be shown here"
        />
    </Stack>
  )
}

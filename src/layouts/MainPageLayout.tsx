import { Box } from "@mui/material"
import { ReactNode } from "react"
import { Header } from "../components/Header/Header"
import { Sidebar } from "../components/Sidebars/Sidebar"

export const MainPageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Box>
        <Header />
        <Box
          sx={{
            width: 'calc(100vw - 91px)',
            height: 'auto',
            minHeight: 'calc(100vh - 70px)',
            position: 'absolute',
            left: '91px',
            paddingLeft: '70px',
            paddingTop: '30px',
            paddingRight: '82px',
            backgroundColor: '#EFEFEF',
            boxSizing: 'border-box',
          }}
        >
          <Box position="relative">
          {children}
          </Box>
        </Box>

        <Sidebar />
    </Box>
  )
}

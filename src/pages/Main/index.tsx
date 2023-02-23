import { Outlet } from 'react-router-dom'
import styled from 'styled-components/macro'
import CssBaseline from '@mui/material/CssBaseline'
import bg from 'assets/images/pro/bg1.png'
import React from 'react'
import NavBar from 'components/NavBar'
import { ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'

export default function Main() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1946B9',
      },
    },
  })
  return (
    <ThemeProvider theme={theme}>
      <RootWrapper>
        <div className="rootContainer">
          <CssBaseline />
          <Outlet />
          <NavBar />
        </div>
      </RootWrapper>
    </ThemeProvider>
  )
}

const RootWrapper = styled.div`
  .rootContainer {
    position: absolute;
    display: flex;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${bg});
    background-repeat: no-repeat;
    background-size: cover;
  }
`

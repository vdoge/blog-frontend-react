import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppProvider } from '@toolpad/core'

import Blog from './features/blog/components/Blog.tsx'
import Home from './features/home/components/Home.tsx'
import Title from './features/title/components/Title.tsx'
import LoginForm from './features/login/components/LoginForm.tsx'
import { AuthStore } from './shared/components/AuthContext.tsx'


const App = () => {
    
    return (
        <React.Fragment>

            {/* Context which stores user information and triggers auto log in */}
            <AuthStore>

                <AppProvider>

                    <BrowserRouter>
                    
                        <Title />
                        
                        <Routes>

                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<LoginForm />} />
                            <Route path="/blog/:id" element={<Blog />} />
                            
                        </Routes>

                    </BrowserRouter>

                </AppProvider>

            </AuthStore>

        </React.Fragment>
    )
}


createRoot(document.getElementById('root')!).render(
    <StrictMode>

        <App />

    </StrictMode>,
)



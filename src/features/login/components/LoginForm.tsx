import { SignInPage, type AuthProvider } from '@toolpad/core/SignInPage';
import { signInLogic } from '../services/login.service';
import { Container } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../../../shared/components/AuthContext';
import { getUser, type User } from '../../../shared/utils/auth';


const providers = [{ id: 'credentials', name: 'Email and password' }];


function LoginForm() {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const { setUser } = useAuthStore();
    

    const signIn = (_provider: AuthProvider, formData: any): void => {
        const redirect = params.get("redirect") || "/";
        const email: string = formData.get('email');
        const password: string = formData.get('password');

        signInLogic(email, password, async (accessToken: string): Promise<void> => {
            const user: User = await getUser(accessToken);
            await new Promise(resolve => setTimeout(resolve, 500));
            setUser(user)
            navigate(redirect) 
        })
    }


    return (
        <Container>

            {/* MUI signin page */}
            <SignInPage
                signIn={signIn}
                providers={providers}
                slotProps={{ emailField: { autoFocus: false }, form: { noValidate: true } }}
            />

        </Container>
    );

};

export default LoginForm;

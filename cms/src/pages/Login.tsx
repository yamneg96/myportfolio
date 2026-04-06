import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '../store/useAuthStore';
import { loginRequest } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
    const setAuth = useAuthStore((state) => state.setAuth);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data: LoginFormValues) => {
        try {
            const res = await loginRequest(data);
            if (res.success && res.data.token) {
                setAuth(res.data.token, res.data);
                toast.success('Access Granted. Welcome back.');
                navigate('/');
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Login failed. Invalid credentials.');
        }
    };

    return (
        <div className="min-h-screen bg-background text-on-surface font-body flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-surface-container-low p-8 md:p-12 rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none"></div>
                
                <div className="text-center mb-8 relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-dim to-primary flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined text-on-primary-fixed" style={{fontVariationSettings: "'FILL' 1"}}>terminal</span>
                    </div>
                    <h1 className="text-3xl font-headline font-bold tracking-tighter text-on-surface">System Access</h1>
                    <p className="text-xs font-mono uppercase tracking-[0.2em] text-outline-variant mt-2">Authorized Personnel Only</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-outline-variant font-bold ml-1">Admin Identity</label>
                        <div className="flex items-center bg-surface-container rounded-xl px-4 py-3 focus-within:ring-1 ring-primary/50 transition-all border border-white/5">
                            <span className="material-symbols-outlined text-primary mr-3 text-lg opacity-70">person</span>
                            <input 
                                type="email" 
                                {...register('email')}
                                className="bg-transparent border-none focus:ring-0 text-sm text-on-surface w-full p-0 outline-none placeholder:text-outline-variant" 
                                placeholder="name@domain.com"
                            />
                        </div>
                        {errors.email && <p className="text-error text-xs ml-1">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-outline-variant font-bold ml-1">Secure Passkey</label>
                        <div className="flex items-center bg-surface-container rounded-xl px-4 py-3 focus-within:ring-1 ring-primary/50 transition-all border border-white/5">
                            <span className="material-symbols-outlined text-primary mr-3 text-lg opacity-70">lock</span>
                            <input 
                                type={showPassword ? "text" : "password"} 
                                {...register('password')}
                                className="bg-transparent border-none focus:ring-0 text-sm text-on-surface w-full p-0 outline-none placeholder:text-outline-variant" 
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-outline-variant hover:text-on-surface transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        {errors.password && <p className="text-error text-xs ml-1">{errors.password.message}</p>}
                    </div>

                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full py-4 mt-4 bg-gradient-to-r from-primary-dim to-primary rounded-xl text-on-primary font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex justify-center items-center gap-2"
                    >
                        {isSubmitting ? (
                            <span className="material-symbols-outlined animate-spin text-sm">refresh</span>
                        ) : (
                            <span className="material-symbols-outlined text-sm">login</span>
                        )}
                        {isSubmitting ? 'Authenticating...' : 'Establish Connection'}
                    </button>
                </form>

                <div className="mt-8 text-center bg-surface-container rounded-xl p-4 border border-white/5 relative z-10">
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                        Warning: Access attempts are logged. Unauthorized breaches will be reported.
                    </p>
                </div>
            </div>
        </div>
    );
}

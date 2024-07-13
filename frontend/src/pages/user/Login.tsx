import React, {useState } from "react";
import {NavLink, Navigate} from "react-router-dom";
import AuthService from "../../services/auth.service";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";

const Login: React.FC = () => {
    const [redirecionarCaminho, setRedirecionarCaminho] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [mensagem, setMensagem] = useState("");
    
    useEffect(() => {
        const user = AuthService.getUser();
        if(user) {
            setRedirecionarCaminho("/");
        }
    }, []);

    const formik = useFormik({
        initialValues: {
            email: "",
            senha: ""
        },

        validationSchema: Yup.object({
            email: Yup.string().required("Campo obrigatório!"),
            senha: Yup.string().required("Campo obrigatório!")
        }),

        onSubmit: async (valores) => {
            const { email, senha } = valores;
            setMensagem("");
            setLoading(true);
            try {
                const response = await AuthService.login(email, senha);
                if(response.token) {
                    localStorage.setItem("user", JSON.stringify(response));
                    setRedirecionarCaminho("/");
                } else {
                    setMensagem("Token na recebido.");
                }

            } catch (error) {
                setMensagem("Tente novamente mais tarde.");
            } finally {
                setLoading(false);
            }
        }
    });

    if(redirecionarCaminho) {
        return <Navigate to={redirecionarCaminho}/>
    }

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <form onSubmit={formik.handleSubmit} className="sm p-4 rounded h-[400px] shadow-md w-full max-w-md flex flex-col items-center justify-center bg-gray-200 text-blue-900">
                <div className="mb-1 h-[80px] p-2">
                    <label htmlFor="email">E-mail</label>
                    <input type="text" name="email" 
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        className="rounded p-1 ml-4 mb-1"/>
                    { formik.touched.email && formik.errors.email ? (
                        <div className="text-red-500">{formik.errors.email}</div>
                            ) : null}
                </div>

                <div className="mb-1 h-[80px] p-2">
                    <label htmlFor="senha">Senha</label>
                    <input type="password" name="senha" 
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.senha}
                        className="rounded p-1 ml-4 mb-1"/>
                    {formik.touched.senha && formik.errors.senha ? (
                        <div className="text-red-500">{formik.errors.senha}</div>
                            ) : null}
                </div>

                <button type="submit"
                    disabled={loading}
                    className="mb-4 rounded-lg w-full sm:w-40 px-4 py-2 text-center bg-blue-900 focus:ring-blue-100 text-white">
                    Login
                </button>
                {mensagem && <div>{mensagem}</div>}
            
                <NavLink className="mb-6 rounded-lg w-full sm:w-40 bg-blue-900 text-center px-4 py-2 text-white " to="/register">Register</NavLink>
            </form>
        </div>
    );
};

export default Login;

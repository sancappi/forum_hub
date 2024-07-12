import React, { useState } from "react";
import {Navigate} from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthService from "../../services/auth.service";

const Register: React.FC = () => {
    const [redirecionarCaminho, setRedirecionarCaminho] = useState<string | null>(null);
    const [mensagem, setMensagem] = useState("");

    const formik = useFormik ({
        initialValues: {
            nome: "",
            email: "",
            senha: ""
        },

        validationSchema: Yup.object({
            nome: Yup.string().required("Campo obrigatório!"),
            email: Yup.string().email("E-mail inválido!").required("Campo obrigatório!"),
            senha: Yup.string().required("Campo obrigatório!")
        }),

        onSubmit: async (valores, { setSubmitting}) => {
            try { 
                const resposta = await AuthService.register(valores);
                console.log("Usuário registrado", resposta.data);
                setRedirecionarCaminho("/login");
            } catch (error) {
                setMensagem("Erro ao registrar usuário. Tente mais tarde."); 
            } finally {
                setSubmitting(false);
            }
        }
    });

    if(redirecionarCaminho) {
        return <Navigate to={redirecionarCaminho}/>;
    }

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <form className="sm p-4 rounded h-[400px] shadow-md w-full max-w-md  flex  flex-col items-center justify-center bg-gray-200 text-blue-900" onSubmit={formik.handleSubmit}>
                <div className="mb-1 h-[80px] p-2">
                    <label>Nome</label>
                    <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur}
                        value={formik.values.nome} name="nome"
                        className="rounded p-1 ml-9 mb-1"/>
                    {formik.touched.nome && formik.errors.nome ? (
                        <div className="text-red-500">{formik.errors.nome}</div>
                    ) : null }
                </div>

                <div className="mb-1 h-[80px] p-2">               
                    <label>E-mail</label>
                    <input type="email" onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        value={formik.values.email} 
                        name="email"
                        className="rounded p-1 ml-9 mb-1"/>
                    {formik.touched.email && formik.errors.email ? (
                        <div className="text-red-500">{formik.errors.email}</div>
                    ) : null }
                </div>

                <div className="mb-1 h-[80px] p-2">               
                    <label>Senha</label>
                    <input type="password" onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        value={formik.values.senha} 
                        name="senha"
                        className="rounded p-1 ml-9 mb-1"/>
                    {formik.touched.senha && formik.errors.senha ? (
                        <div className="text-red-500">{formik.errors.senha}</div>
                    ) : null }
                </div>

                <button type="submit" 
                    className="mb-4 rounded-lg w-40 px-4 py-2 text-center bg-blue-900 focus:ring-blue-100 text-white"
                    disabled={formik.isSubmitting}>
                    Submit
                </button>
                {mensagem && <div>{mensagem}</div>}
            </form>
        </div>
    )
}

export default Register;
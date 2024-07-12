import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useFormik } from "formik";
import * as Yup from "yup";
import UserService from "../../services/user.service";
import Token from "../../services/token";

const Create: React.FC = () => {
    const [mensagemRetorno, setMensagem] = useState("");

    const id = Token();

    const formik = useFormik ({
        initialValues: {
            idEstudante: id || 0,
            curso: "",
            titulo: "",
            mensagem: "",
        },

        validationSchema: Yup.object({
            curso: Yup.string().required("Campo obrigatório!"),
            titulo: Yup.string().required("Campo obrigatório!"),
            mensagem: Yup.string().required("Campo obrigatório!")
        }),

        onSubmit: async (valores, { setSubmitting}) => {
            try { 
                const resposta = await UserService.postRegisterTopic(valores);
                setMensagem("Tópico criado");
                console.log("Tópico criado", resposta.data);

            } catch (error) {
                console.error("erro ao criar", error);
                setMensagem("Erro ao criar tópico. Tente mais tarde.");
            } finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <div className="h-screen flex flex-col">
            <Header />
            <main className=" flex-grow p-8 rounded w-full max-w-3xl flex items-center justify-center mx-auto">
                <form className="sm p-4 rounded h-[400px] shadow-md w-full max-w-md flex flex-col items-center justify-center bg-gray-200 text-blue-900" onSubmit={formik.handleSubmit}>
                    <div className="mb-1 h-[80px] p-2">
                        <label>Curso</label>
                        <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur}
                            value={formik.values.curso} name="curso"
                            className="rounded p-1 ml-12 mb-1"/>
                        {formik.touched.curso && formik.errors.curso ? (
                            <div className="text-red-500 flex justify-center">{formik.errors.curso}</div>
                        ) : null }
                    </div>

                    <div className="mb-1 h-[80px] p-2">
                        <label>Título</label>
                        <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur}
                            value={formik.values.titulo} name="titulo" className="rounded p-1 ml-14 mb-1"/>
                        {formik.touched.titulo && formik.errors.titulo ? (
                            <div className="text-red-500 flex justify-center">{formik.errors.titulo}</div>
                        ) : null }
                    </div>

                    <div className="mb-1 h-[80px] p-2">
                        <label>Mensagem</label>
                        <input type="texto" onChange={formik.handleChange} onBlur={formik.handleBlur}
                            value={formik.values.mensagem} name="mensagem" 
                            className="rounded p-1 ml-4 mb-1"/>
                        {formik.touched.mensagem && formik.errors.mensagem ? (
                            <div className="text-red-500 flex justify-center">{formik.errors.mensagem}</div>
                        ) : null }
                    </div>

                    <button type="submit" className=" mb-4 rounded-lg w-60 sm:w-40 px-4 py-2 text-center bg-blue-900 focus:ring-blue-100 text-white"
                        disabled={formik.isSubmitting}>
                        Submit
                    </button>
                    {mensagemRetorno && <div>{mensagemRetorno}</div>}
                </form>
            </main>

            <Footer />
        </div>
    )
}

export default Create;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import UserService from "../../services/user.service";
import { Topico } from "../../services/user.service";

const Topic: React.FC = () => {
    const { id } = useParams<{id: string}>();
    const [topico, setTopico] = useState<Topico>({
        id: 0,
        dataHoraPostagem: "",
        dataHoraAtualizacao: null,
        estudante: "",
        curso: "",
        titulo: "",
        mensagem: ""
    });

    const navigate = useNavigate();

    useEffect(()=> {
        detailTopic(Number(id));
    }, [id]);

    const detailTopic = async (id: number) => {
        try {
            const data = await UserService.getDetailTopic(id);
            setTopico(data)
        } catch (error) {
            console.error(error);
        };
    };

    const deleteTopic = async () => {
        try {
            await UserService.delDeleteTopic(Number(id));
            navigate("/topics");
        } catch(error) {
            console.error(error);
        }
    };

    return (
        <div className="h-screen flex flex-col">
            <Header />
            <main className="flex-grow p-8 w-full max-w-3xl flex flex-col items-center justify-center mx-auto">
                <div className="w-[600px] mb-2 p-4 flex flex-col gap-4 bg-gray-200 border border-gray-300 rounded">
                    <h2 className="">{topico.titulo}</h2>
                    <p className="">Postado em: {topico.dataHoraPostagem}</p>
                    <p className="">{topico.dataHoraAtualizacao === null? "" : topico.dataHoraAtualizacao}</p>
                    <p className="">Estudante: {topico.estudante}</p>
                    <p className="">Curso: {topico.curso}</p>
                    <p className="">Mensagem: {topico.mensagem}</p>
                </div>
                
                <div className="w-[600px] flex justify-between">
                    <div>
                        <button onClick={() => deleteTopic()} className=" mb-4 rounded-lg w-full sm:w-40 px-4 py-2 text-center bg-blue-900 focus:ring-blue-100 text-white">
                            Deletar
                        </button>
                    </div>

                    <NavLink to={`/update/${id}`} className=" mb-4 rounded-lg w-full sm:w-40 px-4 py-2 text-center bg-blue-900 focus:ring-blue-100 text-white">
                        Atualizar
                    </NavLink>
                </div>
            </main>

            <Footer />
        </div>    
    )
}

export default Topic;
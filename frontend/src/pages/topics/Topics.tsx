import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import UserService from "../../services/user.service";
import { Topico } from "../../services/user.service";

const Topics: React.FC = () => {
    const [topicos, setTopicos] = useState<Topico[]>([]);

    useEffect(() => {
        const listAllTopics = async () => {
            try {
                const data = await UserService.getListTopics();
                setTopicos(data);
            } catch(error) {
                console.error("erro ao listar topicos", error);
            }
        };
        
        listAllTopics();
    }, []);
    
    return (
        <div className="h-screen flex flex-col">
            <Header />
            <main className="flex-grow p-8 w-full max-w-3xl flex items-center justify-center mx-auto">
                <ul>
                    {topicos.length === 0 ? (
                        <p>Não há tópicos salvos.</p> 
                    ) : ( 
                        topicos.map((topico) => (
                            <li key={topico.id} className="w-[600px] mb-2 p-2 bg-gray-200 border border-gray-300 rounded">
                                <h2 className="p-2">{topico.titulo}</h2>
                                <p className="p-2">Postado em: {topico.dataHoraPostagem}</p>
                                <p className="p-2" >Curso: {topico.curso}</p>
                                <p className="p-2">Mensagem: {topico.mensagem}</p>
                                <div className="flex justify-center">
                                    <NavLink to={`/topic/${topico.id}`} className=" mb-4 rounded-lg w-full sm:w-40 px-4 py-2 text-center bg-blue-900 focus:ring-blue-100 text-white">
                                        Detalhes                          
                                    </NavLink>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </main>
            <Footer />
        </div>
    );
}

export default Topics;
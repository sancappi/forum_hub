import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import UserService from "../../services/user.service";

const Update: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [mensagem, setMensagem] = useState("");
    const topicoMensagem = {
        id: Number(id),
        mensagem: mensagem
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMensagem(event.target.value);
    };

    const updateTopic = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            await UserService.putUpdateTopic(topicoMensagem);
            navigate("/topics");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="h-screen flex flex-col">
            <Header />
            <main className="flex-grow p-8 w-full max-w-3xl flex items-center justify-center mx-auto">
                <form className="sm p-4 rounded h-[400px] shadow-md w-full max-w-md flex flex-col items-center justify-center bg-gray-200 text-blue-900" 
                    onSubmit={updateTopic}>
                    <div className="mb-1 h-[80px] p-2">
                        <label>Mensagem</label>
                        <input 
                            type="text" 
                            name="mensagem" 
                            value={mensagem} 
                            onChange={handleInputChange}
                            className="rounded p-1 ml-4 mb-1"
                        />
                    </div>
                    <button type="submit" className="mb-4 rounded-lg w-full sm:w-40 px-4 py-2 text-center bg-blue-900 focus:ring-blue-100 text-white">Atualizar</button>
                </form>
            </main>
            <Footer />
        </div>
    );
};

export default Update;

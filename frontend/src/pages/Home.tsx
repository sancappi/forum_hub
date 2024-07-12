import React, { useState, useEffect } from "react";
import {Navigate, NavLink} from "react-router-dom"
import AuthService from "../services/auth.service";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Delete from "./user/Delete";
import question from "../assets/question.png";

const Home: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    
    useEffect(() => {
        const checkAuth = () => {
            try {
                const userAuth = AuthService.getUser();
                if (!userAuth || !userAuth.token) {
                    setAuthenticated(false);

                } else {
                    setAuthenticated(true);
                }
            } catch (error) {
                console.error("Erro ao carregar página home", error);
                setAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (!authenticated) {
        return <Navigate to={"/login"} />;
    }

    return (
        <div className="h-screen flex flex-col">
            <Header />

            <main className="flex-grow p-8 rounded w-full max-w-3xl flex items-center justify-center mx-auto">
                <div className="grid grid-cols-2 grid-rows-2 gap-4 w-[600px] h-full text-blue-900">
                    <div className=" rounded bg-gray-200 p-4 flex items-center justify-center">
                        <NavLink to="/create" className="rounded bg-purple-300 px-16 py-8 text-center">
                            Criar
                        </NavLink>
                    </div>

                    <div className=" rounded bg-gray-200 p-4 flex items-center justify-center">
                        <NavLink to="/topics" className="rounded bg-purple-300 px-16 py-8 text-center">
                            Listar
                        </NavLink>
                    </div>

                    <div className="rounded bg-gray-200 p-4 flex items-center justify-center">
                        <img src={question} alt="Imagem de interrogação, representando dúvida." className="rounded bg-purple-300 px-12 py-8"/>
                    </div>

                    <div className="rounded bg-gray-200 p-4 flex items-center justify-center">
                        <Delete />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Home;

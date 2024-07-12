import axios from "axios";
import AuthHeader from "./auth.header";
import Token from "./token";

const API_URL = "http://localhost:8080/";

export interface Topico {
    id: number;
    dataHoraPostagem: string;
    dataHoraAtualizacao: string | null;
    estudante: string;
    curso: string;
    titulo: string;
    mensagem: string;
}

const headers = AuthHeader(); 

const UserService = {
    delDeleteAccount() {
        if (headers.Authorization) {
            const id = Token();
            
            if (id !== null && id !== undefined) {
                return axios.delete(`${API_URL}students/${id}`, {
                    headers: headers
                });
            } else {
                return Promise.reject(new Error("Id do usuário não disponível"));
            }
        } else {
            return Promise.reject(new Error("Usuário não autenticado"));
        }
    },


    postRegisterTopic: async (topico: {idEstudante: number; curso:string ; titulo:string; mensagem:string}) => {
        const response = await axios.post(`${API_URL}topics`, topico, {
            headers: headers
        });
        return response.data;
    },

    getListTopics: async (): Promise<Topico[]> => {
        const response = await axios.get<Topico[]>(`${API_URL}topics`, {
            headers: headers
        });
        return response.data;
    },

    getDetailTopic: async (id: number): Promise<Topico> => {
        const response = await axios.get(`${API_URL}topics/${id}`, {
           headers: headers
      });
      return response.data;
    },


    delDeleteTopic: async (id: number) => {
        return axios.delete(`${API_URL}topics/${id}`, {
            headers: headers
        });
    },


    putUpdateTopic: async (topicoMensagem: {id: number, mensagem: string}) => {
        const response = await axios.put(API_URL + "topics", topicoMensagem, {
            headers: headers
        });
        return response;
    }
}

export default UserService;
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import UserService from "../../services/user.service";

const Delete: React.FC = () => {
    const [redirecionar, setRedirecionar] = useState<string | null>(null);

    const deleteAccount = async () => {
        UserService.delDeleteAccount()
            .then(() => {
                localStorage.removeItem("user");
                setRedirecionar("/login");
            })
            .catch(error => {
                console.error("Erro ao deletar conta. Tente novamente mais tarde.", error);

            });
    }

    if (redirecionar) {
        return <Navigate to={redirecionar} />;
    }

    return (
        <button className="rounded bg-purple-300 px-8 py-8" onClick={deleteAccount}>Deletar conta</button>
    );
}

export default Delete;

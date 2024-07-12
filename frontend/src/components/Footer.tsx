import React from "react"

const Footer: React.FC = () => {
    return (
        <footer className=" bg-blue-900 static bottom-0 p-3 flex justify-center 
        text-white">
            <div className=" flex flex-col items-center">
                <p>&copy; 2024 - Todos os direitos reservados</p>
                <p>Entre em contato pelo e-mail: sempresan@outlook.com</p>
            </div>
        </footer>
    )
}

export default Footer;
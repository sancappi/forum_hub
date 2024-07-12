import AuthHeader from "./auth.header";
import { jwtDecode } from "jwt-decode";

export default function Token() {
    interface JwtPayload {
        id:number
    }
    
    const headers = AuthHeader();

    if(headers.Authorization) {
        const token = headers.Authorization.split(' ')[1];
        const decodedToken = jwtDecode<JwtPayload>(token);
        const id = decodedToken.id;
        return id;
    } else {
        return 0;
    }
}
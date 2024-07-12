export default function AuthHeader() {
    const userData = localStorage.getItem("user");

    let user = null;
    if (userData) {
        user = JSON.parse(userData);
    }

    if (user && user.token) {
        return {
            Authorization: "Bearer " + user.token
        };
    } else {
        return {};
    }
}

const { default: useAuth } = require("./useAuth")



const checkPermission = (route) => {
    const { authState } = useAuth()
    if (authState.role === "admin") {
        return route
    } else if (authState.role === "planning") {
        return route
    } else if (authState.role === "finance") {
        return route
    } else if (authState.role === "engineer") {
        return route
    }
}
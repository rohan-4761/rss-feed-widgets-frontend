export const route = {
    "HOME": '/',
    "MY_WIDGETS": '/widgets',
    "CREATE_WIDGETS": '/widgets/create',
    "LOGIN": '/login',
    "SIGNUP": '/signup',
    "FORGOT_PASSWORD": '/forgot-password',
    "EDIT_WIDGET": '/widgets/edit'
}

export const apiRoute = {
    "LOGIN": process.env.NEXT_PUBLIC_API_ENDPOINT + '/login',
    "SIGNUP": process.env.NEXT_PUBLIC_API_ENDPOINT + '/signup',
    "FEEDS": process.env.NEXT_PUBLIC_API_ENDPOINT + '/feeds',
    "WIDGETS": process.env.NEXT_PUBLIC_API_ENDPOINT + '/widgets',
    "USER_WIDGET": process.env.NEXT_PUBLIC_API_ENDPOINT + "/widget",
    "REFRESH": process.env.NEXT_PUBLIC_API_ENDPOINT + "/refresh"
}
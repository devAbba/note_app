
const isLoggedIn = function (req: any, res: any, next: Function) {
    if (req.session.userId) {
        next();
    } else {
        res.redirect('/api/users/login')
    }
}

export default isLoggedIn
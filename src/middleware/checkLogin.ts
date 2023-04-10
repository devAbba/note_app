function checkLogin (req: any, res: any, next: Function){
    if (!req.session.userId){
        next()
    }
    else {
        res.redirect('/api/dashboard')
    }

}

export default checkLogin
import jwt from 'jsonwebtoken'

export function authRequired(req, res, next) {
    const token = req.header('Authorization')

    if (!token) {
        return res.status(401).json({
            "message": "Not exist token, denied autorization"
        })
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) =>{
        if(err){
            return res.status(403).json({
                "message": "Invalid token"
            })
        }

        req.user = user

        next()
    })
}
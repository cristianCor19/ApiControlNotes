import jwt from 'jsonwebtoken'

export function authRequired(req, res, next) {
    const authHeader = req.header('Authorization')
  
    if (!authHeader) {
        return res.status(401).json({
            "message": "Not exist token, denied autorization"
        })
    }

    if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            "message": "Invalid authorization format. Must use Bearer scheme"
        });
    }
    
    const token = authHeader.slice(7);

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) =>{
        if(err){
            return res.status(403).json({
                "message": "Invalid token"
            })
        }

        req.user = user

        next();
    });
}
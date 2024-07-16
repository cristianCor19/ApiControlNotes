import jwt from 'jsonwebtoken'

export async function createAccessToken(payload){
    const {id, uid} = payload

    try {
        const token = jwt.sign(
            {
                id, uid
            },
            process.env.TOKEN_SECRET,
            { expiresIn: "365d", algorithm: "HS512" }
        )
        return token
    } catch (error) {
        throw new Error(error)
    }
}
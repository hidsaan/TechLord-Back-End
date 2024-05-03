const jwt = require("jsonwebtoken");

const authHandler = async (req, res, next) => {
    try {
        const token = req.headers.token;
        if (!token) {
            return res.status(403).json({ message: "Forbidden!" });

        } else {
            await jwt.verify(token, "thepotatoishungry", (err, decode) => {

                if (err) {
                    return res.status(401).json({ message: "Unauthorized" });
                } else {
                    
                    req.info = decode;
                    return next()
                }
            });
        }


        // const token = req.headers.token;
        // if (!token) {
        //     return res.json({ message: "Unauthorized!" });
        // }

        // else {
        //     const response = jwt.verify(token, "thepotatoishungry")

        //     if (!response) {
        //         return res.status(403).json({ message: "Forbidden!" });
        //     }

        //     else {
        //         // res.json({ username: response.appUser });
        //         req.info = decode;
        //         return next();
        //     }
        // }
    }

    catch (error) {
        console.log(error);
        // res.status(500).json({ message: `${error}` });
    }
};

module.exports = authHandler

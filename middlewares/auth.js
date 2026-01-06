const jwt=require('jsonwebtoken');
//this is the only middleware that takes 3 paramters req,res,next
const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: Token missing' });
  }

  const token = authHeader.split(' ')[1];//to get the token without Bearer

  try {
    //and this verify will compare and check the token is correct and not expired and then return the payload which is the id and the email and attach
    //them in the request to can use them normally later
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    req.user = decoded; // attach user info to req
    next();//going to the next thing which is the routes to know which controller
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = authMiddleware;

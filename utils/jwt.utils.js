var jwt = require('jsonwebtoken');
var jwtUtils = {};

const JWT_SIGN_SECRET = 'drgfsrgh45r6th465t4h65r4thr65th4r65trth4trh564rth565aziu6h8n';

jwtUtils.generateToken = function(user) {
  return jwt.sign({
    id: user.id,
    isAdmin: user.admin
  }, JWT_SIGN_SECRET, {
    expiresIn: '3h'
  });
}

jwtUtils.checkToken = function(request, response, next) {
    if(request.headers.authorization) {
        jwt.verify(request.headers.authorization.split(" ")[1], JWT_SIGN_SECRET, function(err, decoded) {
            if(err) {
                return response.json({ 'error': 'Failed to authenticate token' });
            } else {
                request.decoded = decoded;
                request.id_user = decoded.id;
                next();
            }
        })
    } else {
		return response.status(500).json({ "error": "No token sent" });
	}
}

jwtUtils.checkTokenAdmin = function(request, response, next) {
	var auth = request.headers.authorization;
    console.log("auth = " + auth);
	if(auth !== undefined) {
		jwt.verify(auth.split(" ")[1], JWT_SIGN_SECRET, function(err, decoded) {
			if(err) {
				return response.json({ 'error': 'Failed to authenticate token' });
			} else {
				if(decoded.isAdmin === 1){
					request.decoded = decoded;
					request.id = decoded.id;
					next();
				} else {
					return response.json({ 'error': 'User not admin' });
				}
			}
		});
	} else {
		return response.status(500).json({ "error": "No token sent" });
	}
}

module.exports = jwtUtils;
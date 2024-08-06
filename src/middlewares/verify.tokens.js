const { User } = require("../models");
const { jwtToken, AppError } = require("../utils");

// Middleware to verify the refresh token
const verifyRefreshToken = async (req, res, next) => {
  const refreshToken = req.query.token;
  console.log(req.query.token, "kkk");
  if (!refreshToken) {
    return next(new AppError("Forbidden", 403, "fail", "ForbiddenError"));
  }

  const decoded = jwtToken.verifyRefreshToken(refreshToken);

  if (!decoded) {
    return next(new AppError("Forbidden", 403, "fail", "ForbiddenError"));
  }
  req.user = decoded;
  next();
};
// Middleware to verify the token
const Authanticated = async (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
  if (!token) {
    next(new AppError("Unauthorized", 401, "UnauthorizedError"));
  }
  try {
    const decoded = jwtToken.verifyToken({ token });

    if (!decoded) {
      return next(new AppError("Forbidden", 403, "ForbiddenError"));
    }

    const user = await User.findById(decoded._id);
    if (!user) {
      return next(new AppError("Unauthorized", 401, "UnauthorizedError"));
    }

    req.user = decoded; // Attach user data to request
    next();
  } catch (err) {
    return next(new AppError("Unauthorized", 401, "UnauthorizedError"));
  }
};

// const Authorized =async(req,res,next)=>{
//     try {
//         const role=await req.role.populate("roleUrls")
//         // if(req.path == roleUrls.path && req.method  === roleUrls.method)
//         const isAuth=role.roleUrls.find(roleUrl=>{
//             const firstRoote=req.path.split('/')[1]
//             const firstRooteToMatch=roleUrl.path.split('/')[1]
//             return firstRoote === firstRooteToMatch && req.method == roleUrl.method
//         })
//         // console.log(isAuth)
//         if(!isAuth)throw new Error
//         ("don't have peremission!\n if you need to get access ask super admin please")
//         next()
//     } catch (err) {
//         resHelper(res,401,false,err.message,"UnAuthorized!")

//     }
// }

module.exports = { verifyRefreshToken, Authanticated };

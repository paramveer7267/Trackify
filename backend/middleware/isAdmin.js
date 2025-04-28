export const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admins only.",
    });
  }
  next(); // User is admin, continue to the route handler
};
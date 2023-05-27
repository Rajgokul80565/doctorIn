// @desc Authenticate User
// @route POST - /api/user/auth
// @access public
const authUser = (req, res) => {

    res.status(201).json({message:"Auth User"});
}


export { authUser };

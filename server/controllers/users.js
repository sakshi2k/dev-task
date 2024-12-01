const { connection } = require('../db');

const checkUser = async (req, res) => {
    console.log("Finding user in database")
    query = `SELECT count(*) as userExists from users where email = '${req.email}'`
    dbRes = await connection.query(query)
    if (dbRes.err) return res.status(500).json({ message: 'Error fetching users' });
    dbResStatus = dbRes[0][0].userExists == 1
    console.log(dbResStatus)
    res.json({ status: dbResStatus });
};

const addUser = async (req, res) => {
    console.log("Registering user in database")
    const { email, given_name, family_name } = req;
    
    dbRes = await connection.query(`INSERT INTO Users (FirstName, LastName, Email) values (${given_name}, ${family_name}, ${email})`);
    if (dbRes.err) return res.status(500).json({ message: 'Error in registering user' });
    res.json({ message: 'User inserted', success: true });
};
    
exports.handleUser = async (req, res) => {
    userExists = await checkUser(req, res).status
    if(!userExists) {
        addUserRes = await addUser(req, res)
        if(addUserRes.success) {
            res.body(addUserRes)
            // res.redirect('/');
        }
    };
}
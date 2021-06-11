const path = require('path')
const User = require(path.resolve('src','models','Users.model'))
const bcrypt = require('bcryptjs')

const { GeneralError, DuplicateUser } = require(path.resolve('src','utils','errors'))

exports.registerUser = async function registerUser(registerDTO) {
    // Destructure email and password from registerDTO
    // not a true DTO, but it'll do
    const { email, password } = registerDTO;

    // Check database to ensure user doesn't already exist
    const userAlreadyExists = await User.findOne({email: email})
    if(userAlreadyExists) {
        console.log("Dupes")
        throw new DuplicateUser("A user with that email already exists")
    }

    // Bcrypt password before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hashSync(password, saltRounds);

    var newUser = new User({
        email: email,
        password: hashedPassword
    })

    // Save the new User to MongoDB
    try {
        await newUser.save()
    } catch (err) {
        throw new GeneralError("An error ocurred")
    }

    // Can't think of a reason the saved User object would actually need
    // to be sent back to the client at this point, we'll just send a success
    // message in the controller instead
    return
}
const path = require('path')
const User = require(path.resolve('src','models','Users.model'))
const VerificationToken = require(path.resolve('src','models','VerificationTokens.model'))
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')

const { sendAccountVerificationEmail } = require(path.resolve('src','utils','mailer'))
const { GeneralError, DuplicateUser } = require(path.resolve('src','utils','errors'))

exports.registerUser = async function(registerDTO) {
    // Destructure email and password from registerDTO
    // not a true DTO, but it'll do
    const { email, password } = registerDTO;

    // Check database to ensure user doesn't already exist
    const userAlreadyExists = await User.findOne({email: email})
    if(userAlreadyExists) {
        throw new DuplicateUser
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
        var savedUser = await newUser.save()
    } catch (err) {
        throw new GeneralError("An error ocurred")
    }

    // Once the new User is saved, create a verification token, then send an email with the token
    try {
        var verificationToken = await generateVerificationToken(savedUser)
        await sendAccountVerificationEmail(savedUser, verificationToken)
    } catch (err) {
        // TODO: delete user if verification token error occurs? or maybe create endpoint to request new verification code
        console.log(err)
        throw new GeneralError("An error ocurred generating a verification token")
    }


    // Can't think of a reason the saved User object would actually need
    // to be sent back to the client at this point, we'll just send a success
    // message in the controller instead
    return
}

exports.verifyToken = async function(verificationCode) {
    // Find verificationToken by searching verificationCode
    const verificationToken = await VerificationToken.findOne({verificationCode: verificationCode})
    if(!verificationToken) {
        throw new GeneralError("Verification token does not exist")
    }

    // Lookup user attached to verificationToken and update isEmailVerified
    try {
        var user = await User.findByIdAndUpdate(verificationToken.user, {isEmailVerified: true})
        if(!user) {
            throw new GeneralError("User not found")
        }
    } catch (err) {
        console.log(err)
        throw new GeneralError("Something went wrong")
    }

    // Delete verificationToken to clean up DB
    try {
        await VerificationToken.deleteOne({_id: verificationToken._id});
    } catch (err) {
        throw new GeneralError("An error ocurred deleting the old verification token")
    }

    return
}

// If this needs to be called externally: 
// exports.generateVerificationToken = async function(userDTO)
// then call the function with exports.generateVerificationToken()
generateVerificationToken = async function(userDTO) {
    const { _id } = userDTO;
    const verificationCode = await uuidv4();

    var newVerificationToken = new VerificationToken({
        user: _id,
        verificationCode: verificationCode
    })

    try {
        var savedVerificationToken = await newVerificationToken.save()
    } catch (err) {
        return err
    }

    return savedVerificationToken
}
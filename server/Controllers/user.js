import User from "../Models/user.js";

export const saveOrUpdateUser = async (req, res) => {
    const { _id, fullName, email, address, gender, dateOfBirth, phone } = req.body;
    const userData = {
        fullName,
        email,
        address,
        gender,
        dateOfBirth: new Date(dateOfBirth),
        phone,
        orders: [] // Initialize with an empty array for orders
    };

    try {
        let user;

        if (_id) {
            // Update existing user
            user = await User.findOneAndUpdate(
                { _id },
                userData,
                { new: true }
            );
        } else {
            // Create a new user
            user = new User(userData);
            await user.save();
        }

        const formattedDateOfBirth = user.dateOfBirth.toISOString().split('T')[0];
        req.session.user = { user: { ...user.toObject(), dateOfBirth: formattedDateOfBirth } }
        return res.status(200).json({ exists: true, user: { ...user.toObject(), dateOfBirth: formattedDateOfBirth } });
    } catch (error) {
        console.error('Error saving/updating user:', error);
        res.status(500).json({ message: 'Error saving/updating user', error });
    }
};


export const isUser = async (req, res) => {

    console.log("isuser hit")
    //send session data, it exists.
    if (req.session.user) {
        console.log("user sent")
        return res.status(200).json({ exists: true, user: req.session.user });
    }

    const { phone } = req.body;

    // response if there is no session.
    if (!phone) {
        console.log("isuser hit no phone found")
        return res.status(200).json({ exists: false, message: 'Phone number is required' });
    }


    try {
        const user = await User.findOne({ phone: phone });

        if (user) {
            const formattedDateOfBirth = user.dateOfBirth.toISOString().split('T')[0];
            req.session.user = { user: { ...user.toObject(), dateOfBirth: formattedDateOfBirth } }

            return res.status(200).json({ exists: true, user: { ...user.toObject(), dateOfBirth: formattedDateOfBirth } });
        } else {
            return res.status(200).json({ exists: false });
        }
    } catch (error) {
        console.error('Error checking user existence:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to logout' });
        }
        res.clearCookie('connect.sid'); // Clear the cookie as well
        return res.status(200).json({ message: 'Logged out successfully' });
    });
}


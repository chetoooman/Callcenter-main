const bcrypt = require('bcrypt');

const beforeCreateUser = async (user) => {
    if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
}

module.exports = {
    beforeCreateUser
};


const User = require('../models/User');

module.exports = {

    async create(req, res) {
        const { name, email, password, active = 1 } = req.body;

        const user = await User.findOne({ where: { email: email }});

        if(user) {
            return res.status(400).json({ error: 'User Already Registered'});
        }
        
        const newUser = await User.create({ name, email, password, active });

        return res.status(201).json(newUser);
    },

    async update(req, res) {
        const { user_id } = req.params;
        const { name, email, password, active = 1} = req.body;

        const user = await User.findByPk(user_id);

        if(!user) {
            return res.status(400).json({ error: 'User Not Found'});
        }

        const updatedUser = await user.update({
            name: name || user.name,
            email: email || user.email,
            password: password || user.password,
            active: active || user.active
        })

        return res.status(200).json(updatedUser);
    },

    async delete(req, res) {
        const { user_id } = req.params;

        const user = await User.findByPk(user_id);

        if(!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        await User.destroy({ where: {
            id: user_id
        }})

        return res.status(200).json();
    }
};
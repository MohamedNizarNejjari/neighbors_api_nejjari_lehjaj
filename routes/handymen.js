let HandyMan = require('../model/handyman');

function getAll(req, res) {
    HandyMan.find().then((handymen) => {
        res.send(handymen);
    }).catch((err) => {
        res.status(500).send(err);
    });
}

function getOne(req, res) {
    let userId = parseInt(req.params.id); // Conversion en Number
    HandyMan.findOne({ userId: userId })
        .then((handyman) => {
            if (!handyman) {
                res.status(404).send({ message: 'Handyman not found' });
            } else {
                res.send(handyman);
            }
        })
        .catch((err) => {
            res.status(500).send(err);
        });
}

async function create(req, res) {
    try {
        let lastHandyman = await HandyMan.findOne().sort({ userId: -1 });

        let newUserId = (lastHandyman && !isNaN(lastHandyman.userId)) ? lastHandyman.userId + 1 : 1;

        if (isNaN(newUserId) || newUserId <= 0) {
            newUserId = 1; // Fallback de sécurité
        }

        let handyman = new HandyMan({
            userId: newUserId, // ✅ Utilisation d'un `userId` valide
            name: req.body.name,
            avatarUrl: req.body.avatarUrl,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            aboutMe: req.body.aboutMe,
            favorite: req.body.favorite,
            facebookUrl: req.body.facebookUrl,
            linkedinUrl: req.body.linkedinUrl
        });

        await handyman.save();
        res.json({ message: `${handyman.name} saved with userId ${handyman.userId}!` });

    } catch (err) {
        console.error('Error creating handyman:', err);
        res.status(500).send({ message: 'Error saving handyman', error: err });
    }
}

async function update(req, res) {
    try {
        let userId = parseInt(req.params.id); // Convertir en Number
        const handyman = await HandyMan.findOneAndUpdate({ userId: userId }, req.body, { new: true });

        if (!handyman) {
            return res.status(404).json({ message: 'Handyman not found' });
        }

        res.json({ message: 'Updated successfully', handyman });

    } catch (err) {
        console.error('Error updating handyman:', err);
        res.status(500).send(err);
    }
}

async function deleteOne(req, res) {
    try {
        let userId = parseInt(req.params.id); // Convertir en Number
        const handyman = await HandyMan.findOneAndDelete({ userId: userId });

        if (!handyman) {
            return res.status(404).json({ message: 'Handyman not found' });
        }

        res.json({ message: `${handyman.name} deleted successfully` });

    } catch (err) {
        console.error('Error deleting handyman:', err);
        res.status(500).send(err);
    }
}

module.exports = { getAll, create, getOne, update, deleteOne };

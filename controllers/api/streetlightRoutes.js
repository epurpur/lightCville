const router = require('express').Router();
const { Streetlight } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newStreetlight = await Streetlight.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newStreetlight);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const streetlightData = await Streetlight.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!streetlightData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(streetlightData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

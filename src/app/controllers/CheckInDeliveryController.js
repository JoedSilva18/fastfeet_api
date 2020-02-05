import { startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';
import Delivery from '../models/Delivery';

class CheckInDeliveryController {
  async update(req, res) {
    const hour = new Date().getHours();

    if (hour < 8 || hour > 23) {
      return res.status(400).json({ error: 'service currently unavailable' });
    }

    const { id } = req.params;
    // current date
    const nowDate = new Date();

    const resultStartOfDay = startOfDay(nowDate);
    const resultEndOfDay = endOfDay(nowDate);

    const checkins = await Delivery.findAll({
      where: {
        deliveryman_id: id,
        start_date: {
          [Op.between]: [resultStartOfDay, resultEndOfDay],
        },
      },
    });

    if (checkins.length >= 5) {
      return res.status(400).json({ error: 'Checkin limit exceeded' });
    }

    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exists' });
    }

    const deliveryUpdated = await delivery.update({
      start_date: new Date(),
    });

    return res.json(deliveryUpdated);
  }
}

export default new CheckInDeliveryController();

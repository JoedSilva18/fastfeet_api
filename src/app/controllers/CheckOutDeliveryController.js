import * as Yup from 'yup';
import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import File from '../models/File';

class CheckOutDeliveryController {
  async update(req, res) {
    const schema = Yup.object().shape({
      signature_id: Yup.number()
        .integer()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const { signature_id } = req.body;

    const signature = await File.findOne({
      where: {
        id: signature_id,
      },
    });

    if (!signature) {
      return res.status(400).json({ error: 'signature does not exists' });
    }

    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exists' });
    }

    const deliveryUpdated = await delivery.update({
      end_date: new Date(),
      signature_id,
    });

    return res.json(deliveryUpdated);
  }

  async index(req, res) {
    const { id } = req.params;

    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id: id,
        end_date: { [Op.ne]: null },
      },
    });

    return res.status(200).json(deliveries);
  }
}

export default new CheckOutDeliveryController();

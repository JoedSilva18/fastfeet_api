import * as Yup from 'yup';
import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';

class DeliveryProblemController {
  async store(req, res) {
    // Validando dados de entrada
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    // Registrando o problema
    const deliveryProblem = await DeliveryProblem.create({
      delivery_id: id,
      description: req.body.description,
    });

    return res.status(200).json(deliveryProblem);
  }

  async index(req, res) {
    const deliveriesProblem = await DeliveryProblem.findAll();

    return res.status(200).json(deliveriesProblem);
  }

  async show(req, res) {
    const { id } = req.params;

    const deliveryProblem = await DeliveryProblem.findAll({
      delivery_id: id,
    });

    if (!deliveryProblem) {
      return res
        .status(400)
        .json({ error: 'Delivery problem does not exists' });
    }

    return res.status(200).json(deliveryProblem);
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const { delivery_id } = await DeliveryProblem.findByPk(id);

      if (!delivery_id) {
        return res
          .status(400)
          .json({ error: 'Delivery problem does not exists' });
      }

      const deliveryProblem = await Delivery.findByPk(delivery_id);

      if (deliveryProblem && deliveryProblem.canceled_at !== null) {
        return res
          .status(200)
          .json({ message: 'Delivery problem already canceled' });
      }

      await deliveryProblem.update({
        canceled_at: new Date(),
      });

      return res.status(200).json({ message: 'Delivery problem canceled' });
    } catch (err) {
      return res.status(500).json({ message: 'Internal error' });
    }
  }
}

export default new DeliveryProblemController();

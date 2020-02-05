import * as Yup from 'yup';
import Delivery from '../models/Delivery';

class DeliveryController {
  async store(req, res) {
    // Validando dados de entrada
    const schema = Yup.object().shape({
      recipient_id: Yup.number()
        .integer()
        .required(),
      deliveryman_id: Yup.number()
        .integer()
        .required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const delivery = await Delivery.create(req.body);

    return res.json(delivery);
  }

  async index(req, res) {
    const { id } = req.params;

    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id: id,
        canceled_at: null,
        end_date: null,
      },
    });

    return res.status(200).json(deliveries);
  }

  async update(req, res) {
    // Validando dados de entrada
    const schema = Yup.object().shape({
      recipient_id: Yup.number().integer(),
      deliveryman_id: Yup.number().integer(),
      signature_id: Yup.number().integer(),
      product: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    try {
      // ID da entrega
      const { id } = req.params;

      // Buscando a entrega
      const delivery = await Delivery.findByPk(id);

      // Verifica se a entrega existe
      if (!delivery) {
        return res.status(400).json({ error: 'Delivery does not exists' });
      }

      // Atualiza a entrega
      const deliveryUpdated = await delivery.update(req.body);

      return res.status(200).json(deliveryUpdated);
    } catch (err) {
      return res.status(500).json({ error: 'Internal error' });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      // Verificando se a entregada existe na base
      const delivery = await Delivery.findByPk(id);

      if (!delivery) {
        return res.status(400).json({ error: 'Delivery does not exists' });
      }

      // Removendo a entregada
      await delivery.destroy();

      return res.status(200).json({ message: 'Delivery deleted' });
    } catch (err) {
      return res.status(500).json({ message: 'Internal error' });
    }
  }
}

export default new DeliveryController();

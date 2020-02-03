import * as Yup from 'yup';
import Deliveryman from '../models/Deliveryman';

class DeliverymanController {
  // Cadastro de entregadores
  async store(req, res) {
    // Validando dados de entrada
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { name, email } = req.body;

    // Verificando se o entregador ja existe na base
    const deliverymanExists = await Deliveryman.findOne({ where: { email } });

    if (deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman already exists' });
    }

    // Cadastrando o entregador
    const deliveryman = await Deliveryman.create({ name, email });

    return res.status(200).json(deliveryman);
  }

  // Atualizacao de entregadores
  async update(req, res) {
    // Validando dados de entrada
    const schema = Yup.object().shape({
      name: Yup.string(),
      avatar_id: Yup.number().integer(),
      email: Yup.string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    try {
      // Recuperando id passado por parametro
      const { id } = req.params;

      // Verificando se o entregador existe na base
      const deliveryman = await Deliveryman.findByPk(id);

      if (!deliveryman) {
        return res.status(400).json({ error: 'Deliveryman does not exists' });
      }

      const deliverymanUpdated = await deliveryman.update(req.body);

      return res.status(200).json(deliverymanUpdated);
    } catch (err) {
      return res.status(500).json({ error: 'Internal error' });
    }
  }

  // Listagem de entregadores
  async index(req, res) {
    const deliverymen = await Deliveryman.findAll();

    return res.status(200).json(deliverymen);
  }

  // Remocao de entregadores
  async delete(req, res) {
    try {
      const { id } = req.params;

      // Verificando se o entregador existe na base
      const deliveryman = await Deliveryman.findByPk(id);

      if (!deliveryman) {
        return res.status(400).json({ error: 'Deliveryman does not exists' });
      }

      // Removendo entregador
      await deliveryman.destroy();

      return res.status(200).json({ message: 'Deliveryman deleted' });
    } catch (err) {
      return res.status(500).json({ message: 'Internal error' });
    }
  }
}

export default new DeliverymanController();

import User from '../models/User';

class UserController {
  // Criacao de novos usuarios
  async store(req, res) {
    const userExists = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    // Verifica se o usuario ja existe
    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    // Se nao existir, cria um novo usuario
    const user = await User.create(req.body);

    return res.json(user);
  }
}

export default new UserController();

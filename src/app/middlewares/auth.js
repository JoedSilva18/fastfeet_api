import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

// Tratamento do token passado pelo header da aplicacao
export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Verifica se o token foi passado pelo header
  if (!authHeader) {
    return res.status(404).json({ error: 'Token not provided' });
  }

  // Busca o token no header
  const [, token] = authHeader.split(' ');

  try {
    // Converte o token
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    // Insere o valor do id passada pelo token
    req.useId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};

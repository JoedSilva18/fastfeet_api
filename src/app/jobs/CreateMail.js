import Mail from '../../lib/Mail';

class CreateMail {
  get key() {
    return 'CreateMail';
  }

  async handle({ data }) {
    const { delivery, deliveryman } = data;
    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Encomenda cadastrada',
      template: 'create',
      context: {
        deliveryman: deliveryman.name,
        product: delivery.product,
      },
    });
  }
}

export default new CreateMail();

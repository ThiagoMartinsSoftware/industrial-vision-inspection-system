export class AnaliseService {
  async analisarImagem() {
    return {
      status: "APROVADA",
      defeito: null
    };
  }
}

export const analiseService =
  new AnaliseService();
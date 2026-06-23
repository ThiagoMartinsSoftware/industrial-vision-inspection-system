import sharp from "sharp";

export class AnaliseService {
  async analisarImagem(
    caminhoImagem: string
  ) {
    const imagem = await sharp(caminhoImagem)
      .resize(300, 150)
      .grayscale()
      .raw()
      .toBuffer();

    const aprovada = await sharp(
      "src/referencias/aprovada.png"
    )
      .resize(300, 150)
      .grayscale()
      .raw()
      .toBuffer();

    const reprovada = await sharp(
      "src/referencias/reprovada.jpeg"
    )
      .resize(300, 150)
      .grayscale()
      .raw()
      .toBuffer();

    let diferencaAprovada = 0;
    let diferencaReprovada = 0;

    for (let i = 0; i < imagem.length; i++) {
      diferencaAprovada += Math.abs(
        imagem[i] - aprovada[i]
      );

      diferencaReprovada += Math.abs(
        imagem[i] - reprovada[i]
      );
    }

    if (
      diferencaAprovada <
      diferencaReprovada
    ) {
      return {
        status: "APROVADA",
        pinos: 4
      };
    }

    return {
      status: "REPROVADA",
      pinos: 3
    };
  }
}

export const analiseService =
  new AnaliseService();
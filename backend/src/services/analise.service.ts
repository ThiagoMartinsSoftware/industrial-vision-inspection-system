import sharp from "sharp";

export class AnaliseService {

    async analisarImagem(caminhoImagem: string) {

        const inicio = Date.now();

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

        const aprovado =
            diferencaAprovada < diferencaReprovada;

        const fim = Date.now();

        return {

            status: aprovado
                ? "APROVADA"
                : "REPROVADA",

            pinos: aprovado ? 4 : 3,

            tempo: fim - inicio,

            horario: new Date().toLocaleTimeString(),

            id:
                "TAM-" +
                Math.floor(
                    100000 + Math.random() * 900000
                ),

            confianca: aprovado
                ? 99.84
                : 97.12,

            modelo: "IVIS 1.0",

            diferenca: aprovado
                ? diferencaAprovada
                : diferencaReprovada

        };

    }

}

export const analiseService =
    new AnaliseService();
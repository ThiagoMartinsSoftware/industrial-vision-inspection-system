type Resultado = {
    resultado: {
        status: string;
        pinos: number;
        tempo: number;
        horario: string;
        id: string;
        confianca: number;
        modelo: string;
    };
};

type Props = {
    resultado: Resultado | null;
};

export default function ResultCard({ resultado }: Props) {

    const aprovado =
        resultado?.resultado.status === "APROVADA";

    return (

        <div className="result">

            <h2>RESULTADO</h2>

            <div
                className="result-box"
                style={{
                    background: aprovado ? "#1e5e2a" : "#7a1f1f",
                    transition: ".3s"
                }}
            >

                <h1>

                    {
                        resultado
                            ? resultado.resultado.status
                            : "AGUARDANDO"
                    }

                </h1>

                <p>

                    <strong>Status:</strong>{" "}

                    {
                        resultado
                            ? "Inspeção concluída"
                            : "Aguardando inspeção"
                    }

                </p>

                <p>

                    <strong>Pinos:</strong>{" "}

                    {
                        resultado
                            ? `${resultado.resultado.pinos} / 4`
                            : "-- / 4"
                    }

                </p>

                <p>

                    <strong>Latência:</strong>{" "}

                    {
                        resultado
                            ? `${resultado.resultado.tempo} ms`
                            : "-- ms"
                    }

                </p>

                <p>

                    <strong>ID da peça:</strong>{" "}

                    {
                        resultado
                            ? resultado.resultado.id
                            : "---------"
                    }

                </p>

                <p>

                    <strong>Confiança:</strong>{" "}

                    {
                        resultado
                            ? `${resultado.resultado.confianca}%`
                            : "-- %"
                    }

                </p>

                <p>

                    <strong>Captura:</strong>{" "}

                    {
                        resultado
                            ? resultado.resultado.horario
                            : "--:--:--"
                    }

                </p>

            </div>

        </div>

    );

}
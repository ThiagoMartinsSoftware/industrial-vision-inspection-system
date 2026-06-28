import "./ResultCard.module.css";

type ResultCardProps = {
    resultado: any;
};

export default function ResultCard({
    resultado
}: ResultCardProps) {

    if (!resultado) {

        return (

            <div className="result">

                <h2>RESULT</h2>

                <div className="result-box waiting">

                    <h1>WAITING</h1>

                    <div className="result-grid">

                        <p><strong>Status</strong> Waiting inspection</p>
                        <p><strong>Pins</strong> - / 4</p>
                        <p><strong>Latency</strong> - ms</p>
                        <p><strong>Part ID</strong> --------</p>
                        <p><strong>Confidence</strong> -- %</p>

                    </div>

                </div>

            </div>

        );

    }

    const aprovado =
        resultado.resultado.status === "APROVADA";

    const confianca = aprovado ? "99.84%" : "97.12%";

    return (

        <div className="result">

            <h2>RESULT</h2>

            <div className={`result-box ${aprovado ? "approved" : "rejected"}`}>

                <h1>

                    {aprovado ? "APPROVED" : "REJECTED"}

                </h1>

                <div className="result-grid">

                    <p>

                        <strong>Status</strong>

                        {resultado.resultado.status}

                    </p>

                    <p>

                        <strong>Pins</strong>

                        {resultado.resultado.pinos} / 4

                    </p>

                    <p>

                        <strong>Latency</strong>

                        {resultado.resultado.tempo} ms

                    </p>

                    <p>

                        <strong>Part ID</strong>

                        {resultado.resultado.id}

                    </p>

                    <p>

                        <strong>Confidence</strong>

                        {confianca}

                    </p>

                    <p>

                        <strong>Capture</strong>

                        {resultado.resultado.horario}

                    </p>

                </div>

            </div>

        </div>

    );

}
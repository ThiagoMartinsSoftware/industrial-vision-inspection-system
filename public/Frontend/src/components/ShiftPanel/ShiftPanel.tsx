type Turno = {
    total: number;
    aprovadas: number;
    reprovadas: number;
};

type Props = {
    turno: Turno;
    onNovoTurno: () => void;
};

export default function ShiftPanel({

    turno,

    onNovoTurno

}: Props) {

    const precisao =
        turno.total > 0
            ? (
                (turno.aprovadas / turno.total) * 100
            ).toFixed(2)
            : "0.00";

    return (

        <div className="shift">

            <h2>TODAY</h2>

            <div className="shift-grid">

                <div>

                    <span>Parts</span>

                    <strong>{turno.total}</strong>

                </div>

                <div>

                    <span>Approved</span>

                    <strong style={{ color: "#2ecc71" }}>

                        {turno.aprovadas}

                    </strong>

                </div>

                <div>

                    <span>Rejected</span>

                    <strong style={{ color: "#e74c3c" }}>

                        {turno.reprovadas}

                    </strong>

                </div>

                <div>

                    <span>Accuracy</span>

                    <strong>

                        {precisao}%

                    </strong>

                </div>

            </div>

            <button
                className="new-shift"
                onClick={onNovoTurno}
            >

                NEW SHIFT

            </button>

        </div>

    );

}
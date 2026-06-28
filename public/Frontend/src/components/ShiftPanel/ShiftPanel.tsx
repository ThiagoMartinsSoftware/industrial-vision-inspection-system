type ShiftPanelProps = {
    turno: {
        total: number;
        aprovadas: number;
        reprovadas: number;
    };

    onNovoTurno: () => void;
};

export default function ShiftPanel({
    turno,
    onNovoTurno,
}: ShiftPanelProps) {

    const precisao =
        turno.total === 0
            ? 0
            : (
                (turno.aprovadas / turno.total) *
                100
            ).toFixed(2);

    return (

        <div className="shift">

            <h2>TODAY</h2>

            <p>

                Parts: {turno.total}

            </p>

            <p>

                Approved: {turno.aprovadas}

            </p>

            <p>

                Rejected: {turno.reprovadas}

            </p>

            <p>

                Accuracy: {precisao}%

            </p>

            <button
                onClick={onNovoTurno}
            >

                NEW SHIFT

            </button>

        </div>

    );

}
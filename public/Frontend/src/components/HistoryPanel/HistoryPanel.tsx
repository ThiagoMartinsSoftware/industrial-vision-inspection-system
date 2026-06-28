type HistoryPanelProps = {
    historico: any[];
};

export default function HistoryPanel({
    historico
}: HistoryPanelProps) {

    return (

        <div className="history">

            <h2>LAST INSPECTIONS</h2>

            <table>

                <tbody>

                    {

                        historico.length === 0 && (

                            <tr>

                                <td
                                    colSpan={3}
                                    style={{
                                        textAlign: "center",
                                        padding: "20px"
                                    }}
                                >

                                    Waiting for first inspection...

                                </td>

                            </tr>

                        )

                    }

                    {

                        historico.map((item, index) => (

                            <tr key={index}>

                                <td>

                                    {item.resultado.horario}

                                </td>

                                <td>

                                    {

                                        item.resultado.status === "APROVADA"

                                            ? "APPROVED"

                                            : "REJECTED"

                                    }

                                </td>

                                <td>

                                    {item.resultado.pinos}/4

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}
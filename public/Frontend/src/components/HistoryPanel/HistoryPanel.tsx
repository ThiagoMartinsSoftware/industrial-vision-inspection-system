type ItemHistorico = {

    resultado: {

        status: string;

        pinos: number;

        horario: string;

        tempo: number;

    };

};

type Props = {

    historico: ItemHistorico[];

};

export default function HistoryPanel({

    historico

}: Props) {

    return (

        <div className="history">

            <h2>LAST INSPECTIONS</h2>

            <table>

                <thead>

                    <tr>

                        <th>TIME</th>

                        <th>STATUS</th>

                        <th>PINS</th>

                        <th>TIME(ms)</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        historico.length === 0

                            ?

                            <tr>

                                <td
                                    colSpan={4}
                                    style={{
                                        textAlign: "center",
                                        color: "#777"
                                    }}
                                >

                                    No inspections yet

                                </td>

                            </tr>

                            :

                            historico.map(

                                (item, index) => (

                                    <tr key={index}>

                                        <td>

                                            {item.resultado.horario}

                                        </td>

                                        <td>

                                            {

                                                item.resultado.status === "APROVADA"

                                                    ?

                                                    "🟢 APPROVED"

                                                    :

                                                    "🔴 REJECTED"

                                            }

                                        </td>

                                        <td>

                                            {item.resultado.pinos}/4

                                        </td>

                                        <td>

                                            {item.resultado.tempo}

                                        </td>

                                    </tr>

                                )

                            )

                    }

                </tbody>

            </table>

        </div>

    );

}
import { useRef, useState } from "react";
import { api } from "../services/api";

import CameraFeed from "../components/CameraFeed/CameraFeed";
import ResultCard from "../components/ResultCard/ResultCard";
import StatusPanel from "../components/StatusPanel/StatusPanel";
import HistoryPanel from "../components/HistoryPanel/HistoryPanel";
import ShiftPanel from "../components/ShiftPanel/ShiftPanel";

import "../styles/dashboard.css";

export default function Home() {

  const [resultado, setResultado] = useState<any>(null);

  const [historico, setHistorico] = useState<any[]>([]);

  const analisando = useRef(false);



  const [turno, setTurno] = useState({
    total: 0,
    aprovadas: 0,
    reprovadas: 0
  });

  async function capturarImagem(file: File) {

    if (analisando.current) return;

    analisando.current = true;

    try {

      const formData = new FormData();

      formData.append("imagem", file);

      const response = await api.post(
        "/analisar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      const dados = response.data;

      setResultado(dados);

      setHistorico((anterior) => [

        {
          ...dados,
          resultado: {
            ...dados.resultado,
            horario: new Date().toLocaleTimeString()
          }
        },

        ...anterior

      ].slice(0, 10));

      setTurno((anterior) => ({

        total: anterior.total + 1,

        aprovadas:

          dados.resultado.status === "APROVADA"

            ? anterior.aprovadas + 1

            : anterior.aprovadas,

        reprovadas:

          dados.resultado.status === "REPROVADA"

            ? anterior.reprovadas + 1

            : anterior.reprovadas

      }));
      analisando.current = false;
    }

    catch (erro) {
      analisando.current = false;

      console.error(erro);

      alert("Erro ao comunicar com o backend.");

    }

  }

  function novoTurno() {

    setResultado(null);

    setHistorico([]);

    setTurno({

      total: 0,

      aprovadas: 0,

      reprovadas: 0

    });

  }

  return (

    <div className="dashboard">

      <header className="topbar">

        <h1>

          INDUSTRIAL VISION INSPECTION SYSTEM

        </h1>

        <div className="running">

          <span className="dot"></span>

          RUNNING

        </div>

      </header>

      <section className="inspection">

        <CameraFeed
          onCapture={capturarImagem}
        />

        <ResultCard
          resultado={resultado}
        />

      </section>

      <StatusPanel

        cameraOnline={false}

        backendOnline={true}

        inspecao="🟢 READY"

      />

      <HistoryPanel
        historico={historico}
      />

      <ShiftPanel
        turno={turno}
        onNovoTurno={novoTurno}
      />

    </div>

  );

}
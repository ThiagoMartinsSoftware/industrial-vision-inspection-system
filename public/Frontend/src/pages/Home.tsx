import { useState } from "react";
import { api } from "../services/api";
import "../app.css";

export function Home() {
  const [imagem, setImagem] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [resultado, setResultado] = useState<any>(null);
  const [carregando, setCarregando] = useState(false);

  async function analisarImagem() {
    if (!imagem) return;

    const formData = new FormData();

    formData.append("imagem", imagem);

    try {
      setCarregando(true);

      const response = await api.post(
        "/analisar",
        formData
      );

      setResultado(response.data.resultado);
    } catch (error) {
      console.error(error);
    } finally {
      setCarregando(false);
    }
  }

  function selecionarImagem(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const arquivo = event.target.files?.[0];

    if (!arquivo) return;

    setImagem(arquivo);

    setPreview(
      URL.createObjectURL(arquivo)
    );
  }

  return (
    <div className="container">
      <h1>
        Industrial Vision Inspection
      </h1>

      <input
        type="file"
        accept="image/*"
        onChange={selecionarImagem}
      />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="preview"
        />
      )}

      <button
        onClick={analisarImagem}
      >
        {carregando
          ? "Analisando..."
          : "Analisar"}
      </button>

      {resultado && (
        <div className="resultado">
          <h2>
            {resultado.status ===
            "APROVADA"
              ? "✅ APROVADA"
              : "❌ REPROVADA"}
          </h2>

          <p>
            Pinos Detectados:{" "}
            {resultado.pinos}
          </p>
        </div>
      )}
    </div>
  );
}
const API_URL = "https://parseapi.back4app.com/classes/dadosWeb";

// Configuração da requisição
const config = {
  headers: {
    "X-Parse-Application-Id": "HVYd0xlML8xGdfLGqSjE5up02GK8ALADhExuQDJA",
    "X-Parse-REST-API-Key": "iUQckbckYqInLFGWmdoHH42n2yNeEvIQhWlldzXt",
  },
};

// Função para obter dados da API
async function fetchData() {
  const response = await fetch(API_URL, config);
  const data = await response.json();
  console.log("data", data);
  return data.results;
}

const getCount = async (query) => {
  let url = API_URL;
  const whereClause = JSON.stringify(query);
  url = `${url}?count=1&where=${whereClause}`;
  url = encodeURI(url);
  console.log("url", url);
  const response = await fetch(url, config);
  const data = await response.json();
  console.log("data count", data);
  return data.count;
};

// Função para criar gráfico
async function createChart() {
  const dataAguaPotavel = await getCount({ AGUA_POTAVEL: 1 });
  const dataSemAguaPotavel = await getCount({ AGUA_POTAVEL: 0 });
  const aguaPotavelData = [dataAguaPotavel, dataSemAguaPotavel];

  // Processar os dados conforme necessário
  // const labels = data.map((item) => item.MUNICIPIO);
  // const values = data.map((item) => item.AGUA_POTAVEL);

  // Crie os gráficos
  var ctx1 = document.getElementById("chart1").getContext("2d");
  var chart1 = new Chart(ctx1, {
    type: "pie",
    data: {
      labels: ["Com água potável", "Sem água potável"],
      datasets: [
        {
          label: "Água potável",
          data: aguaPotavelData,
          backgroundColor: [
            "rgba(75, 192, 192, 0.2)",
            "rgba(0, 100, 192, 0.2)",
          ],
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  const dataAguaPotavelMA = await getCount({ AGUA_POTAVEL: 1, UF: "MA" });
  const dataSemAguaPotavelMA = await getCount({ AGUA_POTAVEL: 0, UF: "MA" });
  const aguaPotavelDataMA = [dataAguaPotavelMA, dataSemAguaPotavelMA];

  var ctx2 = document.getElementById("chart2").getContext("2d");
  var chart2 = new Chart(ctx2, {
    type: "pie",
    data: {
      labels: ["Com água potável", "Sem água potável"],
      datasets: [
        {
          label: "Água potável",
          data: aguaPotavelDataMA,
          backgroundColor: [
            "rgba(75, 192, 192, 0.2)",
            "rgba(0, 100, 192, 0.2)",
          ],
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

window.onload = createChart;

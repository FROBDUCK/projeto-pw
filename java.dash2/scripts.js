


const selectEstados = document.getElementById("selectEstados");
const API_URL = "https://parseapi.back4app.com/classes/dadosWeb";

let chart1, chart2, chart3, chart4, chart5, chart6;

// Configuração da requisição
const config = {
    headers: {
        "X-Parse-Application-Id": "HVYd0xlML8xGdfLGqSjE5up02GK8ALADhExuQDJA",
        "X-Parse-REST-API-Key": "iUQckbckYqInLFGWmdoHH42n2yNeEvIQhWlldzXt",
    },
};

// Função para obter dados da API
async function fetchData(query) {
    try {
        let url = `${API_URL}?where=${encodeURIComponent(JSON.stringify(query))}`;
        const response = await fetch(url, config);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

const getCount = async (query) => {
    try {
        let url = `${API_URL}?count=1&where=${encodeURIComponent(JSON.stringify(query))}`;
        const response = await fetch(url, config);
        const data = await response.json();
        return data.count;
    } catch (error) {
        console.error("Error fetching count:", error);
        return 0;
    }
};

// Função para criar gráficos
async function createChart() {
    if (chart1) chart1.destroy();
    if (chart2) chart2.destroy();
    if (chart3) chart3.destroy();
    if (chart4) chart4.destroy();
    if (chart5) chart5.destroy();
    if (chart6) chart6.destroy();

    const dataAguaPotavel = await getCount({ AGUA_POTAVEL: 1 });
    const dataSemAguaPotavel = await getCount({ AGUA_POTAVEL: 0 });
    const aguaPotavelData = [dataAguaPotavel, dataSemAguaPotavel];

    const ctx1 = document.getElementById("chart1").getContext("2d");
    chart1 = new Chart(ctx1, {
        type: "pie",
        data: {
            labels: ["Com água potável", "Sem água potável"],
            datasets: [
                {
                    label: "Água potável",
                    data: aguaPotavelData,
                    backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(0, 100, 192, 0.2)"],
                    borderColor: ["rgba(75, 192, 192, 1)", "rgba(0, 100, 192, 1)"],
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

    const estadoSelecionado = selectEstados.value;
    const dataAguaPotavelEstSelec = await getCount({ AGUA_POTAVEL: 1, UF: estadoSelecionado });
    const dataSemAguaPotavelEstSelec = await getCount({ AGUA_POTAVEL: 0, UF: estadoSelecionado });
    const aguaPotavelDataEstSelec = [dataAguaPotavelEstSelec, dataSemAguaPotavelEstSelec];

    const ctx2 = document.getElementById("chart2").getContext("2d");
    chart2 = new Chart(ctx2, {
        type: "pie",
        data: {
            labels: ["Com água potável", "Sem água potável"],
            datasets: [
                {
                    label: "Água potável no estado selecionado",
                    data: aguaPotavelDataEstSelec,
                    backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(0, 100, 192, 0.2)"],
                    borderColor: ["rgba(75, 192, 192, 1)", "rgba(0, 100, 192, 1)"],
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

    const dataEnergiaEletrica = await getCount({ ENERGIA_REDE_PUBLICA: 1 });
    const dataSemEnergiaEletrica = await getCount({ ENERGIA_REDE_PUBLICA: 0 });
    const energiaEletricaData = [dataEnergiaEletrica, dataSemEnergiaEletrica];

    const ctx3 = document.getElementById("chart3").getContext("2d");
    chart3 = new Chart(ctx3, {
        type: "pie",
        data: {
            labels: ["Com energia elétrica", "Sem energia elétrica"],
            datasets: [
                {
                    label: "Energia elétrica",
                    data: energiaEletricaData,
                    backgroundColor: ["rgba(255, 159, 64, 0.2)", "rgba(255, 99, 132, 0.2)"],
                    borderColor: ["rgba(255, 159, 64, 1)", "rgba(255, 99, 132, 1)"],
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

    const dataEnergiaEletricaEstSelec = await getCount({ ENERGIA_REDE_PUBLICA: 1, UF: estadoSelecionado });
    const dataSemEnergiaEletricaEstSelec = await getCount({ ENERGIA_REDE_PUBLICA: 0, UF: estadoSelecionado });
    const energiaEletricaDataEstSelec = [dataEnergiaEletricaEstSelec, dataSemEnergiaEletricaEstSelec];

    const ctx4 = document.getElementById("chart4").getContext("2d");
    chart4 = new Chart(ctx4, {
        type: "pie",
        data: {
            labels: ["Com energia elétrica", "Sem energia elétrica"],
            datasets: [
                {
                    label: "Energia elétrica no estado selecionado",
                    data: energiaEletricaDataEstSelec,
                    backgroundColor: ["rgba(255, 159, 64, 0.2)", "rgba(255, 99, 132, 0.2)"],
                    borderColor: ["rgba(255, 159, 64, 1)", "rgba(255, 99, 132, 1)"],
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

    const dataEsgoto = await getCount({ ESGOTO_REDE_PUBLICA: 1 });
    const dataSemEsgoto = await getCount({ ESGOTO_REDE_PUBLICA: 0 });
    const esgotoData = [dataEsgoto, dataSemEsgoto];

    const ctx5 = document.getElementById("chart5").getContext("2d");
    chart5 = new Chart(ctx5, {
        type: "pie",
        data: {
            labels: ["Com esgoto", "Sem esgoto"],
            datasets: [
                {
                    label: "Esgoto",
                    data: esgotoData,
                    backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(75, 192, 192, 0.2)"],
                    borderColor: ["rgba(54, 162, 235, 1)", "rgba(75, 192, 192, 1)"],
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

    const dataEsgotoEstSelec = await getCount({ ESGOTO_REDE_PUBLICA: 1, UF: estadoSelecionado });
    const dataSemEsgotoEstSelec = await getCount({ ESGOTO_REDE_PUBLICA: 0, UF: estadoSelecionado });
    const esgotoDataEstSelec = [dataEsgotoEstSelec, dataSemEsgotoEstSelec];

    const ctx6 = document.getElementById("chart6").getContext("2d");
    chart6 = new Chart(ctx6, {
        type: "pie",
        data: {
            labels: ["Com esgoto", "Sem esgoto"],
            datasets: [
                {
                    label: "Esgoto no estado selecionado",
                    data: esgotoDataEstSelec,
                    backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(75, 192, 192, 0.2)"],
                    borderColor: ["rgba(54, 162, 235, 1)", "rgba(75, 192, 192, 1)"],
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
selectEstados.onchange = createChart;
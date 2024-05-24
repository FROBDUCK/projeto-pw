document.addEventListener('DOMContentLoaded', function () {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Atualize os contadores dos cartões
            document.getElementById('usuarios-count').textContent = data.usuarios;
            document.getElementById('vendas-count').textContent = `R$ ${data.vendas}`;
            document.getElementById('visitantes-count').textContent = data.visitantes;

            // Crie os gráficos
            var ctx1 = document.getElementById('chart1').getContext('2d');
            var chart1 = new Chart(ctx1, {
                type: 'bar',
                data: {
                    labels: data.mensal.meses,
                    datasets: [{
                        label: 'Vendas',
                        data: data.mensal.vendas,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            var ctx2 = document.getElementById('chart2').getContext('2d');
            var chart2 = new Chart(ctx2, {
                type: 'line',
                data: {
                    labels: data.mensal.meses,
                    datasets: [{
                        label: 'Visitantes',
                        data: data.mensal.visitantes,
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Erro ao carregar o arquivo JSON:', error));
});

let evolucaoChart = null;

async function buscarEvolucaoNome() {
    const nome = document.getElementById('nomeInput').value.trim();
    if (!nome) {
        alert('Por favor, digite um nome');
        return;
    }

    try {
        const response = await axios.get(`http://localhost:3000/api/nome/${nome}`);
        const dados = response.data[0].res;
        
        const decadas = dados.map(item => item.periodo);
        const frequencias = dados.map(item => item.frequencia);

        if (evolucaoChart) {
            evolucaoChart.destroy();
        }

        const ctx = document.getElementById('evolucaoNomeChart').getContext('2d');
        evolucaoChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: decadas,
                datasets: [{
                    label: `Evolução do nome ${nome}`,
                    data: frequencias,
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: `Evolução do nome ${nome} por década`
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Frequência'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Década'
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        alert('Erro ao buscar dados do nome. Tente novamente.');
    }
} 
let comparacaoChart = null;

async function compararNomes() {
    const nome1 = document.getElementById('nome1Input').value.trim();
    const nome2 = document.getElementById('nome2Input').value.trim();

    if (!nome1 || !nome2) {
        alert('Por favor, digite os dois nomes para comparação');
        return;
    }

    try {
        const response = await axios.get(`${API_BASE_URL}/api/comparar?nome1=${nome1}&nome2=${nome2}`);
        
        if (!response.data.nome1 || !response.data.nome2) {
            throw new Error('Dados incompletos recebidos da API');
        }

        const dados1 = response.data.nome1[0]?.res || [];
        const dados2 = response.data.nome2[0]?.res || [];

        if (dados1.length === 0 || dados2.length === 0) {
            throw new Error('Nenhum dado encontrado para um ou ambos os nomes');
        }

        // Garantir que temos dados para todas as décadas
        const decadas = dados1.map(item => item.periodo);
        const frequencias1 = dados1.map(item => item.frequencia);
        const frequencias2 = dados2.map(item => item.frequencia);

        if (comparacaoChart) {
            comparacaoChart.destroy();
        }

        const ctx = document.getElementById('comparacaoNomesChart').getContext('2d');
        comparacaoChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: decadas,
                datasets: [
                    {
                        label: nome1,
                        data: frequencias1,
                        borderColor: '#3498db',
                        backgroundColor: 'rgba(52, 152, 219, 0.1)',
                        tension: 0.4,
                        fill: false
                    },
                    {
                        label: nome2,
                        data: frequencias2,
                        borderColor: '#e74c3c',
                        backgroundColor: 'rgba(231, 76, 60, 0.1)',
                        tension: 0.4,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Comparação da evolução dos nomes por década'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.raw.toLocaleString()} pessoas`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Frequência'
                        },
                        ticks: {
                            callback: function(value) {
                                return value.toLocaleString();
                            }
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
        alert('Erro ao comparar nomes. Verifique se os nomes estão corretos e tente novamente.');
    }
} 
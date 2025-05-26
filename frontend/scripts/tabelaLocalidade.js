function atualizarCodigoIBGE() {
    const estadoSelect = document.getElementById('estadoSelect');
    const codigoInput = document.getElementById('codigoLocalidade');
    codigoInput.value = estadoSelect.value;
}

async function buscarTopNomes() {
    const codigo = document.getElementById('codigoLocalidade').value.trim();
    if (!codigo) {
        alert('Por favor, selecione um estado');
        return;
    }

    try {
        const response = await axios.get(`http://localhost:3000/api/top-nomes/${codigo}`);
        
        if (!response.data || !response.data[0] || !response.data[0].res) {
            throw new Error('Dados incompletos recebidos da API');
        }

        const dados = response.data[0].res;
        
        if (dados.length === 0) {
            throw new Error('Nenhum dado encontrado para esta localidade');
        }

        const tbody = document.querySelector('#topNomesTable tbody');
        tbody.innerHTML = '';

        dados.forEach((item, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.nome}</td>
                <td>${item.frequencia.toLocaleString()} pessoas</td>
                <td>${index + 1}º</td>
            `;
            tbody.appendChild(tr);
        });

        // Adicionar informações da localidade
        const localidadeInfo = document.createElement('div');
        localidadeInfo.className = 'localidade-info';
        localidadeInfo.innerHTML = `
            <p><strong>Estado:</strong> ${document.getElementById('estadoSelect').options[document.getElementById('estadoSelect').selectedIndex].text}</p>
            <p><strong>Sexo:</strong> ${response.data[0].sexo}</p>
        `;
        
        const tableContainer = document.querySelector('.table-container');
        const existingInfo = tableContainer.querySelector('.localidade-info');
        if (existingInfo) {
            existingInfo.remove();
        }
        tableContainer.insertBefore(localidadeInfo, tableContainer.firstChild);

    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        alert('Erro ao buscar top nomes. Verifique se o estado está correto e tente novamente.');
    }
} 
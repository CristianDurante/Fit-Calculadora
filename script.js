document.getElementById("form-calculadora").addEventListener('submit', function (e){
        e.preventDefault();

        // coletar dados do formulário
        const idade = parseInt(document.getElementById('idade').value)
        const genero = document.getElementById('genero').value
        const peso = parseFloat(document.getElementById('peso').value)
        const altura = parseFloat(document.getElementById('altura').value)
        const nivelAtividade = parseFloat(document.getElementById('nivel-atividade').value)
        const objetivo = document.getElementById('objetivo').value

        // Calcular IMC
        const alturaEmMetros = altura / 100
        const imc = (peso / (alturaEmMetros * alturaEmMetros)).toFixed(2)

        // Calcular TBM
        let tmb
        if(genero == 'masculino'){
            tmb = 88.362 + (13.397 * peso) + (4.799 * altura) - (5.677 * idade)
        } else {
            tmb = 447.593 + (9.247 * peso) + (3.098 * altura) - (4.330 * idade)
        }
        tmb = (tmb * nivelAtividade).toFixed(2)

        // Calcular Macronutrientes 
        let proteina, gordura, carboidratos
        proteina = (2 * peso).toFixed(2) // 2g de proteina por kg de peso
        gordura = ((tmb * 0.25) / 9).toFixed(2) // 25% das calorias em gorduras (1g = 9 kcal)
        carboidratos = ((tmb - (proteina * 4) - (gordura * 9)) / 4).toFixed(2) // Restante em Carboidratos (1g = 4kcal)

        // Ajustar calorias com base no objetivo
        if(objetivo === 'emagrecer'){
            tmb = (tmb - 500).toFixed(2) // Defict de 500kcal para emagrecer
        } else if (objetivo === 'ganharMassa'){
            tmb = (parseFloat(tmb) + 500).toFixed(2) // Superávit de 500kcal para ganhar massa
        }
        
        // Exibir Resultados no modal
        document.getElementById('resultado-imc').textContent = imc
        document.getElementById('resultado-tmb').textContent = tmb
        document.getElementById('resultado-proteina').textContent = proteina
        document.getElementById('resultado-gordura').textContent = gordura
        document.getElementById('resultado-carbo').textContent = carboidratos
        
        // Geradr plano de treino
        const PlanoDeTreino = geradorDeTreino(objetivo)
        document.getElementById('PlanoTreino').innerHTML = PlanoDeTreino
        
        // Mostrar o modal
        document.getElementById('modal').classList.remove('hidden')
        document.getElementById('modal').classList.add('visible')
    })

    // Fechar o modal ao clicar no "X"
    document.getElementById('fechar-modal').addEventListener('click', function(){
        document.getElementById('modal').classList.remove('visible')
        document.getElementById('modal').classList.add('hidden')
    })

    // Fechar o modal ao clicar fora da caixa
    window.addEventListener('click', function(e){
        const modal = this.document.getElementById('modal')
        if(e.target === modal){
            modal.classList.remove('visible')
            modal.classList.add('hidden')
        }
    })

    // Função para gerar o plano de treino 
    function geradorDeTreino(objetivo){
        let plano = ''

        if(objetivo === 'emagrecer'){
            plano = `
                <div class="diaTreino">
                    <h3>Segunda-feira: Cardio e Core</h3>
                    <ul>
                        <li>Corrida ou caminhada rápida - 30 minutos</li>
                        <li>Prancha - 3 séries de 1 minuto</li>
                        <li>Abdominais - 3 séries de 15 repetições</li>
                    </ul>
                </div>
                <div class="diaTreino">
                    <h3>Quarta-feira: Treino de Força (Superior)</h3>
                    <ul>
                        <li>Flexões - 3 séries de 12 repetições</li>
                        <li>Remada curvada - 3 séries de 12 repetições</li>
                        <li>Desenvolvimento de ombros - 3 séries de 12 repetições</li>
                    </ul>
                </div>
                <div class="diaTreino">
                    <h3>Sexta-feira: Cardio e Inferiores</h3>
                    <ul>
                        <li>Bicicleta ou elíptico - 30 minutos</li>
                        <li>Agachamentos - 3 séries de 15 repetições</li>
                        <li>Afundos - 3 séries de 12 repetições</li>
                    </ul>
                </div>
            `
        } else if (objetivo === 'manterPeso'){
            plano = `
                <div class="diaTreino">
                    <h3>Segunda-feira: Treino Completo</h3>
                    <ul>
                        <li>Agachamentos - 3 séries de 12 repetições</li>
                        <li>Flexões - 3 séries de 12 repetições</li>
                        <li>Prancha - 3 séries de 1 minuto</li>
                    </ul>
                </div>
                <div class="diaTreino">
                    <h3>Quarta-feira: Cardio</h3>
                    <ul>
                        <li>Corrida ou caminhada rápida - 40 minutos</li>
                    </ul>
                </div>
                <div class="diaTreino">
                    <h3>Sexta-feira: Treino de Força</h3>
                    <ul>
                        <li>Levantamento terra - 3 séries de 10 repetições</li>
                        <li>Desenvolvimento de ombros - 3 séries de 12 repetições</li>
                        <li>Abdominais - 3 séries de 15 repetições</li>
                    </ul>
                </div>
            
            `
        } else if (objetivo === 'ganharMassa'){
            plano = `
                <div class="diaTreino">
                    <h3>Segunda-feira: Peito e Tríceps</h3>
                    <ul>
                        <li>Supino - 4 séries de 8 repetições</li>
                        <li>Flexões - 3 séries de 12 repetições</li>
                        <li>Tríceps testa - 3 séries de 10 repetições</li>
                    </ul>
                </div>
                <div class="diaTreino">
                    <h3>Quarta-feira: Costas e Bíceps</h3>
                    <ul>
                        <li>Barra fixa - 3 séries de 8 repetições</li>
                        <li>Remada curvada - 4 séries de 10 repetições</li>
                        <li>Rosca direta - 3 séries de 12 repetições</li>
                    </ul>
                </div>
                <div class="diaTreino">
                    <h3>Sexta-feira: Pernas e Ombros</h3>
                    <ul>
                        <li>Agachamentos - 4 séries de 10 repetições</li>
                        <li>Afundos - 3 séries de 12 repetições</li>
                        <li>Desenvolvimento de ombros - 4 séries de 10 repetições</li>
                    </ul>
                </div>
            `
        }
        return plano

    }


        //--------------- CAIXA FEEDBACK ---------------
        const botaoFeedback = document.getElementById("botao-feedback")
        const modalFeedback = document.getElementById("modal-feedback")
        const fecharFeedbackModal = document.getElementById("fechar-feedback-modal")
        const formFeedback = document.getElementById("form-feedback")

        // Abre o modal de Feedback
        botaoFeedback.addEventListener('click', function(){
            modalFeedback.classList.remove('hidden')
            modalFeedback.classList.add('visible')
        })

        // Fecha o modal de Feedback
        fecharFeedbackModal.addEventListener('click', function(){
            modalFeedback.classList.remove('visible')
            modalFeedback.classList.add('hidden')
        })

        // Fecha o modal ao clicar fora dele
        window.addEventListener('click', function(e){
            if(e.target == modalFeedback){
                modalFeedback.classList.remove('visible')
                modalFeedback.classList.add('hidden')
            }
        })

let modal;
let selecionarObj;
const idArray = ['nomeModal', 'ruaModal', 'numeroModal', 'bairroModal', 'cidadeModal', 'estadoModal']

window.onload = () => {


    buscarEmpresas()

    function buscarEmpresas() {
        const url = "http://localhost:3000/"

        fetch(url)
            .then(response => response.json())
            .then((empresas) => {
                if (empresas.length > 0) {
                    empresas.forEach(item => criarTabela(item))
                }
                else {
                    const meuContainer = document.getElementById("mensagemEmpresa")
                    let p_ = document.createElement("p");
                    p_.innerText = "Ainda não há empresas cadastradas"
                    meuContainer.appendChild(p_)
                }
                }
            )
    }


}


function criarTabela(obj) {
    const botaoEditar = document.createElement('button')
    const botaoDetalhes = document.createElement('button')
    const botaoExcluir = document.createElement('button')

    const table = document.getElementById('table');

    const newTr = document.createElement('tr');

    const td_1 = document.createElement('td');
    td_1.innerText = obj.id

    const td_2 = document.createElement('td');
    td_2.innerText = obj.nome

    const td_3 = document.createElement('td');
    td_3.innerText = obj.rua

    const empresa = [td_1, td_2, td_3, botaoDetalhes, botaoEditar, botaoExcluir]

    botaoDetalhes.innerText = "Detalhes"
    botaoDetalhes.addEventListener('click', () => {
        selecionarObj = obj

        new bootstrap.Modal(modal).show()
        preencherModal(selecionarObj)
        habilitaDesabilita(false)


    })


    empresa.forEach(item => newTr.appendChild(item))

    table.appendChild(newTr)



    botaoEditar.innerText = "Editar"
    modal = document.getElementById("exampleModalEditar");
    botaoEditar.addEventListener("click", () => {

        selecionarObj = obj
        new bootstrap.Modal(modal).show()
        preencherModal(selecionarObj)
        habilitaDesabilita(true)


    })

    botaoExcluir.innerText = "Excluir"
    botaoExcluir.addEventListener("click", () => {
        const confirmarExclusao = confirm("Deseja realmente excluir essa empresa?")

        if (confirmarExclusao) {
            excluirEmpresa(obj.id)
        }
    })
}

function habilitaDesabilita(desabilitado) {

    if (desabilitado) {
        idArray.forEach((item) => {
            document.getElementById(item).disabled = false;
            document.getElementById("botaoAtualizar").style.display = "inline"
            document.getElementById("botaoCancelar").style.display = "inline"

        })

    }
    else {
        idArray.forEach((item) => {
            document.getElementById(item).disabled = true;
            document.getElementById("botaoAtualizar").style.display = "none"
            document.getElementById("botaoCancelar").style.display = "none"


        })
    }
}

function preencherModal(obj) {
    document.getElementById("idModal").value = obj.id;
    document.getElementById("nomeModal").value = obj.nome;
    document.getElementById("ruaModal").value = obj.rua;
    document.getElementById("numeroModal").value = obj.numero;
    document.getElementById("bairroModal").value = obj.bairro;
    document.getElementById("cidadeModal").value = obj.cidade;
    document.getElementById("estadoModal").value = obj.estado;

}


function criarEmpresa() {
    const nome = document.getElementById('nomeInput').value;
    const rua = document.getElementById('ruaInput').value;
    const numero = Number(document.getElementById('numeroInput').value)
    const bairro = document.getElementById('bairroInput').value;
    const cidade = document.getElementById('cidadeInput').value;
    const estado = document.getElementById('estadoInput').value;

    const novaEmpresa = {
        nome,
        rua,
        numero,
        bairro,
        cidade,
        estado
    }
    if (novaEmpresa.nome && novaEmpresa.rua && novaEmpresa.numero && novaEmpresa.bairro && novaEmpresa.cidade && novaEmpresa.estado) {
        adicionarEmpresa(novaEmpresa)

    }
    else {
        alert("Todos os campos devem estar preenchidos")
    }

}



function atualizarCadastro() {
    const id = document.getElementById('idModal').value
    const nome = document.getElementById('nomeModal').value;
    const rua = document.getElementById('ruaModal').value;
    const numero = Number(document.getElementById('numeroModal').value)
    const bairro = document.getElementById('bairroModal').value;
    const cidade = document.getElementById('cidadeModal').value;
    const estado = document.getElementById('estadoModal').value;


    const novaEmpresa = {
        id,
        nome,
        rua,
        numero,
        bairro,
        cidade,
        estado
    }
    if (novaEmpresa.nome && novaEmpresa.rua && novaEmpresa.numero && novaEmpresa.bairro && novaEmpresa.cidade && novaEmpresa.estado) {
        editarEmpresa(novaEmpresa)
    }
    else {
        alert("Todos os campos devem estar preenchidos")
    }

}

function adicionarEmpresa(obj) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
    };

    fetch("http://localhost:3000/criar/empresa", options)
        .then(response => response.json())
        .then(empresas => console.log(empresas))
    window.location.reload(true);
}

function editarEmpresa(obj) {
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
    };

    fetch("http://localhost:3000/editar", options)
        .then(response => response.json())
        .then(empresas => console.log(empresas))
    window.location.reload(true);
}

function excluirEmpresa(id) {

    fetch("http://localhost:3000/deletar/" + id, { method: 'DELETE' })
        .then(response => response.json())
        .then(empresas => console.log(empresas))
    window.location.reload(true);
}
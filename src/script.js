

window.onload = () => {

    buscarEmpresas()

    function buscarEmpresas() {
        const url = "http://localhost:3000/"

        fetch(url)
            .then(response => response.json())
            .then(empresas => empresas.forEach(item => criarTabela(item)))
    }
}


function criarTabela(obj) {
    const table = document.getElementById('table');

    const newTr = document.createElement('tr');

    const td_1 = document.createElement('td');
    td_1.innerText = obj.id

    const td_2 = document.createElement('td');
    td_2.innerText = obj.nome

    const td_3 = document.createElement('td');
    td_3.innerText = obj.endereco

    const botaoEditar = document.createElement('button')
    botaoEditar.innerText = "editar"

    const botaoExcluir = document.createElement('button')
    botaoExcluir.innerText = "excluir"
    botaoExcluir.addEventListener("click", () => excluirEmpresa(obj.id) )


    const empresa = [td_1, td_2, td_3, botaoEditar, botaoExcluir]

    empresa.forEach(item => newTr.appendChild(item))

    table.appendChild(newTr)


}


 function excluirEmpresa(id) {


    fetch("http://localhost:3000/deletar/" + id, { method: 'DELETE' })
         .then(response => response.json())
         .then(empresas => console.log(empresas))
         window.location.reload(true);

 }
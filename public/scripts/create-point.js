function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .catch( neg => alert("Não foi possivel acessar os estados do servidor IBGE!!") ) //.catch((res) => { return alert("Deu ruim!!!")})
    .then( res => res.json() )
    .then( states => {

        for( const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()


function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .catch( neg => alert("Não foi possivel acessar os municipios do servidor IBGE!!") ) //.catch((res) => { return alert("Deu ruim!!!")})
    .then( res => res.json() )
    .then( cities => {

                for( const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false;
    })

}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

    //itens de coleta
    const itemsToCollect = document.querySelectorAll(".items-grid li") // variavel recebe o array de itens de coleta

    for (const item of itemsToCollect){
        item.addEventListener("click", handleSelectedItem)// para cada item do array de itens de coleta, se houver click ele chama a função handleSelectedItem
    }

    const collectedItems = document.querySelector("input[name=items]")

    let selectedItems = [];

    function handleSelectedItem(event) {//função recebe o evento que disparou seu gatilho
        //console.log("função handleSelectedItem() chamada com sucesso")
        const itemLi = event.target //Recebe o item do evento q disparou seu gatilho, nesta caso o <li> selecionado

        itemLi.classList.toggle("selected") //.add,.remove,.toggle(add or remove) || adiciona ou remove a classe selected ao item <li> q recebeu um click

        const itemId = itemLi.dataset.id // variavel recebe a Id do item clicado

        //verificar itens selecionados e retornar os selecionados
        const alreadySelected = selectedItems.findIndex( function( item) {//simplificando const alreadySelected = selectedItems.findIndex( item => item == itemId)
            //criada a variavel alreadySelectd q vai receber os itens que receberam cliques e estão ativas
            //selectedItem.findIndex(função anonima) procura o 'id' do array findIndex, para cada item que receber, recebe uma função anonima(arrow function) esta função percorre todo vetor para cada item recebido (ex. se receber '2' percorre todo o vetor na procura deste valor)
            //function(item) função parametro do findIndex, retorna verdadeiro ou falso - Se achou ou não o 'id' de 'item'
            //Se o retorno de function() for verdadeiro a variavel 'alreadySelected' recebe o valor 'id' do item retornado pela função findIndex()
            //Se o retorno de function() for falso
            const itemFound = item == itemId  //boolean
            
            //console.log(alreadySelected) variavel so é inicializada apos o fechamento da função
            return itemFound // se retorna false, ele roda de novo com o proximo item
            
        })

        //se ja estiver selecionado, remover da seleção
        if(alreadySelected != -1 ){//se alreadySelected = -1 ela não está no array
            const filteredItems = selectedItems.filter( item => { //filteredItems[] recebe os items que estão selecionadas
                  const itemIsDifferent = item != itemId //se o item estiver selecionado, item = itemId, ele é adicionado no novo array (itemIsDifferente) e o retorno é falso
                  return itemIsDifferent    
            })

            selectedItems = filteredItems

        }else {// se não estiver selecionado, será adiconado a seleção
            selectedItems.push(itemId)
        }

        console.log(selectedItems)
        collectedItems.value = selectedItems
    }
function populateUFs() {
  const ufSelect = document.querySelector("select[name=UF]")

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      // .then( (res) => { return res.json() })   pode resumir o codigo quando tem so um valor (res)
      .then(res => res.json())
      .then(states => {

          for (const state of states) {
              ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
          }
      })
}

populateUFs()


function getCities(event) {
  const citySelect = document.querySelector("[name=city]")
  const stateinput = document.querySelector("[name=state]")

  const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateinput.value = event.target.options[indexOfSelectedState].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`


      // .then( (res) => { return res.json() })   pode resumir o codigo quando tem so um valor (res)
      citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
      citySelect.disabled = true


  fetch(url)
      .then(res => res.json())
      .then(cities => {
        

          for (const city of cities) {
              const citySelect = document.querySelector("[name=city]")
              citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
          }
          
          citySelect.disabled = false
      })
}


document
        .querySelector("select[name=UF]")
        .addEventListener("change", getCities)

// items de coleta
//pegar todos os li´s
const itemsToCollect = document.querySelectorAll(".items-grid li")
 
for(const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}
const collectedItems = document.querySelector("input[name=items]")
 let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    //adicionar ou remover = (toggle) uma classe com javaScript
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    //vereficar se existem itens selecionados, se sim
    //pegar os itens selecionados
    const alreadySelected  = selectedItems.findeindex(item => {
        const itemFound = item == itemId // sera true ou false
        return itemFound
    })
    
    //se ja estiver selecionado
    if(alreadySelected >= 0 ) {
        //tirar da seleção 
        const filteredItems = selectedItems.filter(item => {
            const itemIsDiferent = item != itemId
            return itemIsDiferent
        })

        selectedItems = filteredItems 

    }else{
         //se não estiver selecionado, adicionar a seleção 

         //adicionar à seleção
         selectedItems.push(itemId)

    }

    //atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems

}








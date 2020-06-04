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

  fetch(url)
      .then(res => res.json())
      .then(cities => {

          for (const city of cities) {
              const citySelect = document.querySelector("[name=city]")
              citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
          }
          
          citySelect.disabled = false
      })
}


document
        .querySelector("select[name=UF]")
        .addEventListener("change", getCities)
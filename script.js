const button = document.querySelector('.button')
const cpf = document.querySelector('.cpf')
const name = document.querySelector('.name')
const age = document.querySelector('.age')
const weight = document.querySelector('.weight')
const height = document.querySelector('.height')

button.addEventListener('click', e => {
  e.preventDefault()
  let value = weight.value / (height.value * 2)

  firebase.database().ref(cpf.value).set({
    name: name.value,
    age: age.value,
    weight: weight.value,
    height: height.value,
    imc: imc(value)
  })

  console.log(name.value + ' tem ' + age.value + ' anos, pesa ' + weight.value + ' kg e tem ' + height.value + ' de altura.')
  console.log('O IMC de ' + name.value + ' é: ' + value + ' situação: ' + imc(value))
  name.value = ''
  age.value = ''
  weight.value = ''
  height.value = ''

})

function imc(param) {
  if(param <= 18.5) {
    return 'Abaixo do peso'
  }
  if(param > 18.5 && param <= 24.9) {
    return 'Peso normal'
  }
  if(param >= 25 && param <= 29.9) {
    return 'Sobrepeso'
  }
}
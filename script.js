const button = document.querySelector('.button')
const cpf = document.querySelector('.cpf')
const name = document.querySelector('.name')
const age = document.querySelector('.age')
const weight = document.querySelector('.weight')
const height = document.querySelector('.height')

var citiesRef = firebase.database().ref('teste7-28555').orderByChild('name')
citiesRef.once('value', function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val()
    console.log(childKey)
    console.log(childData)
  });
});

console.log(citiesRef)

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

  row(cpf.value, name.value, age.value, weight.value, height.value, imc(value))

  console.log(name.value + ' tem ' + age.value + ' anos, pesa ' + weight.value + ' kg e tem ' + height.value + ' de altura.')
  console.log('O IMC de ' + name.value + ' é: ' + value + ' situação: ' + imc(value))
  name.value = ''
  age.value = ''
  weight.value = ''
  height.value = ''

})

let row = (cpf, name, age, weight, height, situation) => {
  let row = document.querySelector('.row')
  let tr = document.createElement('tr')
  let tdCPF = document.createElement('td')
  let tdName = document.createElement('td')
  let tdAge = document.createElement('td')
  let tdWeight = document.createElement('td')
  let tdHeight = document.createElement('td')
  let tdSituation = document.createElement('td')

  tdCPF.innerText = cpf
  tdName.innerText = name
  tdAge.innerText = age
  tdWeight.innerText = weight
  tdHeight.innerText = height
  tdSituation.innerText = situation
  
  tdSituation.setAttribute('class', 'situation')

  row.appendChild(tr)
  tr.appendChild(tdCPF)
  tr.appendChild(tdName)
  tr.appendChild(tdAge)
  tr.appendChild(tdWeight)
  tr.appendChild(tdHeight)
  tr.appendChild(tdSituation)
}

let imc = param => {
  if(param <= 18.5) {
    return 'Abaixo do peso'
  }
  if(param > 18.5 && param <= 24.9) {
    return 'Peso ideal'
  }
  if(param >= 25 && param <= 29.9) {
    return 'Sobrepeso'
  }
  if(param >= 30 && param <= 34.9) {
    return 'Obesidade grau I'
  }
  if(param >= 35 && param <= 39.9) {
    return 'Obesidade grau II'
  }
  if(param > 40) {
    return 'Obesidade grau III'
  }
}
const button = document.querySelector('.button')
const cpf = document.querySelector('.cpf')
const name = document.querySelector('.name')
const email = document.querySelector('.email')
const birth = document.querySelector('.birth')
const weight = document.querySelector('.weight')
const height = document.querySelector('.height')
const fat = document.querySelector('.fat')
const tbw = document.querySelector('.tbw')
const mus = document.querySelector('.mus')
const bone = document.querySelector('.bone')
const bmi = document.querySelector('.bmi')
const kcal = document.querySelector('.kcal')
const notification = document.querySelector('.notification')

const citiesRef = firebase.database().ref('teste7-28555').orderByChild('name')
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
    email: email.value,
    birth: birth.value,
    weight: weight.value,
    height: height.value,
    fat: fat.value,
    tbw: tbw.value,
    mus: mus.value,
    bone: bone.value,
    bmi: bmi.value,
    kcal: kcal.value,
    imc: imc(value)
  })

  row(cpf.value, name.value, birth.value, weight.value, height.value, imc(value), fat.value, tbw.value, mus.value, bone.value, bmi.value, kcal.value)

  console.log(name.value + ' tem ' + birth.value + ' anos, pesa ' + weight.value + ' kg e tem ' + height.value + ' de altura.')
  console.log('O IMC de ' + name.value + ' é: ' + value + ' situação: ' + imc(value))
  name.value = ''
  birth.value = ''
  weight.value = ''
  height.value = ''
  fat.value = ''
  tbw.value = ''
  mus.value = ''
  bone.value = ''
  bmi.value = ''
  kcal.value = ''

})

const row = (cpf, name, birth, weight, height, situation, fat, tbw, mus, bone, bmi, kcal) => {
  let row = document.querySelector('.row')
  let tr = document.createElement('tr')
  let tdCPF = document.createElement('td')
  let tdName = document.createElement('td')
  let tdBirth = document.createElement('td')
  let tdWeight = document.createElement('td')
  let tdHeight = document.createElement('td')
  let tdSituation = document.createElement('td')
  let tdFat = document.createElement('td')
  let tdTbw = document.createElement('td')
  let tdMus = document.createElement('td')
  let tdBone = document.createElement('td')
  let tdBmi = document.createElement('td')
  let tdKcal = document.createElement('td')

  tdCPF.innerText = cpf
  tdName.innerText = name
  tdBirth.innerText = birth
  tdWeight.innerText = weight
  tdHeight.innerText = height
  tdSituation.innerText = situation
  tdFat.innerText = fat
  tdTbw.innerText = tbw
  tdMus.innerText = mus
  tdBone.innerText = bone
  tdBmi.innerText = bmi
  tdKcal.innerText = kcal
  
  tdSituation.setAttribute('class', 'situation')

  row.appendChild(tr)
  tr.appendChild(tdCPF)
  tr.appendChild(tdName)
  tr.appendChild(tdBirth)
  tr.appendChild(tdWeight)
  tr.appendChild(tdHeight)
  tr.appendChild(tdSituation)
  tr.appendChild(tdFat)
  tr.appendChild(tdTbw)
  tr.appendChild(tdMus)
  tr.appendChild(tdBone)
  tr.appendChild(tdBmi)
  tr.appendChild(tdKcal)

  notify(situation)
}

const notify = (situation, result, imc) => {
  if(imc === 'Abaixo do peso') {
    return notification.style = 'display: block'
  }
}

const imc = param => {
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
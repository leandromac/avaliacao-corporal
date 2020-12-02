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

const citiesRef = firebase.database().ref('teste7-28555').orderByChild('name')
citiesRef.once('value', snapshot => {
  snapshot.forEach(childSnapshot => {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val()
  });
});

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

  notify(imc(value))

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
  let today = new Date()

  tdCPF.innerText = cpf
  tdName.innerText = name
  tdBirth.innerText = ((today.getFullYear()) - (birth.split('-')[0]))
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

}

const notify = (param) => {
  let notification = document.querySelector('article')
  let title = document.querySelector('.title-tile')
  let subtitle = document.querySelector('.subtitle-tile')
  
  if(param === 'Abaixo do peso') {
    notification.className = 'tile is-child notification is-warning'
    notification.style = 'display: block'
    title.innerText = param
    subtitle.innerText = 'O seu IMC está abaixo de 18.5'
  }

  if(param === 'Peso ideal') {
    notification.className = 'tile is-child notification is-success'
    notification.style = 'display: block'
    title.innerText = param
    subtitle.innerText = 'O seu IMC é o ideal, entre 18.50 e 24.9.'
  }

  if(param === 'Sobrepeso') {
    notification.className = 'tile is-child notification is-warning'
    notification.style = 'display: block'
    title.innerText = param
    subtitle.innerText = 'O seu IMC está entre 30 e 34.9.'
  }

  if(param === 'Obesidade grau I') {
    notification.className = 'tile is-child notification is-danger'
    notification.style = 'display: block'
    title.innerText = param
    subtitle.innerText = 'O seu IMC está entre 30 e 34.9.'
  }

  if(param === 'Obesidade grau II') {
    notification.className = 'tile is-child notification is-danger'
    notification.style = 'display: block'
    title.innerText = param
    subtitle.innerText = 'O seu IMC está entre 35 e 39.9.'
  }

  if(param === 'Obesidade grau III') {
    notification.className = 'tile is-child notification is-danger'
    notification.style = 'display: block'
    title.innerText = param
    subtitle.innerText = 'O seu IMC está acima de 40.'
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
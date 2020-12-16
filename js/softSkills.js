const softSkills = () => {
  const skillsArr = [
    'Communicative', 
    'Quick-Study',
    'Collaborative',
    'Problem Solver',
    'Critical Thinker',
    'Attentive to Detail',
    'Ethical',
    'Committed',
    'Open-Minded',
    'Analytical',
    'Forward Thinker',
    'Resilient',
    'Perseverant',
    'Lifelong Learner',
    'Father',
    'Adaptable',
    'Patient',
    'Compassionate',
  ]

  const getIndex = (arr) => Math.floor(Math.random() * arr.length)

  const textBox = document.querySelector('#soft-skills')

  textBox.innerText = skillsArr[getIndex(skillsArr)]

  let tl = gsap.timeline()

  const changeText = () =>{
    tl.to(textBox, 1, {opacity: 0, onComplete: (box=textBox)=>{
      box.innerText = skillsArr[getIndex(skillsArr)]
    }}).to(textBox, 1, {opacity:1})
  }

  setInterval(changeText, 5000)

}
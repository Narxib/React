import { useState, useEffect } from 'react'

export function CatImages () {
  const RANDOM_CAT_FACT = 'https://catfact.ninja/fact'
  // const RANDOM_CAT_IMAGE = `https://cataas.com/cat/says/${firstWord}?json=true`

  const [fact, setFact] = useState()
  const [image, setImage] = useState()

  useEffect(() => {
    fetch(RANDOM_CAT_FACT)
      .then((response) => response.json())
      .then((data) => {
        const { fact } = data
        setFact(fact)
        const firstWord = fact.split(' ', 3).join(' ')
        fetch(`https://cataas.com/cat/says/${firstWord}?fontSize=50&fontColor=red&json=true`)
          .then(response => response.json())
          .then((data) => {
            setImage(data._id)
          })
      })
  }, [])

  return (
    <main>
      <h2>CAT APP</h2>
      {fact && <p>{fact}</p>}
      {image && <img src={`https://cataas.com/cat/says/${image}`} alt='image extracted using first word' />}
    </main>
  )
}

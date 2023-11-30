import { useCatImage } from './src/hooks/useCatImage.js'
import { useCatFact } from './src/hooks/useCatFact.js'

export function CatImages () {
  const { fact, refreshFact } = useCatFact()
  const { imageUrl } = useCatImage({ fact })

  const handleClick = () => {
    refreshFact()
  }

  return (
    <main>
      <h2>CAT APP</h2>
      <button onClick={handleClick}>New Fact</button>
      {fact && <p>{fact}</p>}
      {imageUrl && <img src={imageUrl} alt={`Image extracted using the first rhee words for ${fact}`} />}
    </main>
  )
}

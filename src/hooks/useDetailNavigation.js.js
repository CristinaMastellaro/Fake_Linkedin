import { useNavigate } from 'react-router-dom'

// Hook personalizzato per gestire la navigazione ai dettagli
export const useDetailNavigation = () => {
  const navigate = useNavigate()

  const navigateToDetails = (item, type = 'post') => {
    // Estrae l'ID dall'oggetto, supportando diverse strutture
    let itemId = item._id || item.id

    if (!itemId) {
      console.error("ID non trovato nell'oggetto:", item)
      return
    }

    // Naviga alla pagina dei dettagli con tipo e ID
    navigate(`/details/${type}/${itemId}`)
  }

  // Funzioni specifiche per diversi tipi di contenuto
  const navigateToPostDetails = (post) => {
    navigateToDetails(post, 'post')
  }

  const navigateToExperienceDetails = (experience) => {
    navigateToDetails(experience, 'experience')
  }

  const navigateToProfileDetails = (profile) => {
    navigateToDetails(profile, 'profile')
  }

  return {
    navigateToDetails,
    navigateToPostDetails,
    navigateToExperienceDetails,
    navigateToProfileDetails,
  }
}

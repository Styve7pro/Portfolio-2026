/**
 * useImageCompress — compression d'image côté client via Canvas
 * Redimensionne si > maxWidth et compresse en JPEG/WebP
 */
export function compressImage(file, { maxWidth = 1400, quality = 0.80 } = {}) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('Fichier invalide : doit être une image'))
      return
    }

    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Erreur de lecture du fichier'))
    reader.onload = (e) => {
      const img = new Image()
      img.onerror = () => reject(new Error('Impossible de charger l\'image'))
      img.onload = () => {
        // calcul dimensions
        let { width, height } = img
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width)
          width  = maxWidth
        }

        // dessin sur canvas
        const canvas  = document.createElement('canvas')
        canvas.width  = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)

        // export en webp si supporté, sinon jpeg
        const outputType = 'image/webp'
        const dataUrl = canvas.toDataURL(outputType, quality)

        // fallback jpeg si webp non supporté (dataUrl vide)
        if (!dataUrl || dataUrl === 'data:,') {
          resolve(canvas.toDataURL('image/jpeg', quality))
        } else {
          resolve(dataUrl)
        }
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  })
}

function arrayBufferToBase64(buffer: ArrayBuffer) {
  var binary = ''
  var bytes = new Uint8Array(buffer)
  var len = bytes.byteLength
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

async function urlToBaseURL(url: string, mimeType?: string) {
  let type = mimeType ?? 'image/png'
  const res = await fetch(url)
  const arrayBuffer = await res.arrayBuffer()
  const base64String = arrayBufferToBase64(arrayBuffer)
  const data = 'data:' + type + ';base64,' + base64String
  return data
}

export { urlToBaseURL }

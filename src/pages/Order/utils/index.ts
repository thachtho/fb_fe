import { IPost } from 'shared/interface'

const combinePosts = (posts: IPost[], dataSocket: IPost[]) => {
  const uniqueIds = new Set(posts.map((item) => item.id))
  const postNews = dataSocket
    .filter((item) => !uniqueIds.has(item.id))
    .map((item) => {
      return {
        ...item,
        isNew: true
      }
    })

  const postOlds = posts.map((item) => {
    return {
      ...item,
      isNew: false
    }
  })
  const combinedArray = [...postOlds, ...postNews]

  combinedArray
    .sort(function (a, b) {
      const dateA = new Date(a.created_at).getTime()
      const dateB = new Date(b.created_at).getTime()
      return dateB - dateA
    })
    .slice(0, 20)

  return combinedArray
}

const handleRemoveSpecialCharactersContent = (content: string) => {
  return content.replace(/<br\s*class="html-br">/g, ', ')
}

const getFees = (content: string) => {
  const regex = /(?:phí|phi|Phi|Phí|PHI|PHÍ)\s+(\d+)/i
  const regex1 = /[Pp](\d+)/

  return getValueByRgex(content, regex) || getValueByRgex(content, regex1)
}

const getAdvanceMoney = (content: string) => {
  const regex = /(?:ứng|ưng|ung|Ứng|UNG|ỨNG)\s+(\d+)/i
  const regex1 = /[Uu](\d+)/

  return getValueByRgex(content, regex) || getValueByRgex(content, regex1)
}

const getValueByRgex = (content: string, regex: RegExp) => {
  const match = content.match(regex)
  if (match) {
    return match[1]
  }

  return null
}

export {
  combinePosts,
  handleRemoveSpecialCharactersContent,
  getFees,
  getAdvanceMoney
}

import IData from "../interfaces/IData"
import validLetters from "./validLetters"
import ISectionData from "../interfaces/ISectionData"

interface IAlphabetSet {
  [key: string]: IData[]
}

interface IEntry {
  title: string
  data: IData[]
}

const getSectionData = (data: IData[]) => {
  const alphabetEntrySet: [string, IData[]][] = getAlphabetEntrySet(data)
  let latestIndex = 0

  return alphabetEntrySet
    .map(formatEntry)
    .sort(sortSectionsAlphabetically)
    .map((section: ISectionData, index: number) => {
      let currentIndex = latestIndex
      const withData = section?.data?.length > 0
      if (withData) {
        latestIndex++
      }
      return { ...section, index: withData ? currentIndex : null }
    })
}

const getAlphabetEntrySet = (data: IData[]) => {
  const alphabetSet: IAlphabetSet = {}

  data.forEach((item) => {
    const letter = getItemFirstLetter(item.value)

    if (!letter) {
      return
    }

    if (!alphabetSet[letter]) {
      alphabetSet[letter] = []
    }

    alphabetSet[letter].push(item)
  })

  let alphabetChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  alphabetChar.split("").map((alphabet) => {
    if (!alphabetSet[alphabet]) {
      alphabetSet[alphabet] = []
    }
  })

  // console.log("alphabetSet: ", JSON.stringify(alphabetSet, null, 3))

  // console.log(
  //   "alphabetSet: ",
  //   JSON.stringify(Object.entries(alphabetSet), null, 3),
  // )

  return Object.entries(alphabetSet)
}

const getItemFirstLetter = (value: string) => {
  const firstChar: string = value.substring(0, 1)
  const isValidLetter: boolean = validLetters[firstChar.toLowerCase()]

  if (isValidLetter) {
    return firstChar.toUpperCase()
  }

  return "#"
}

const formatEntry = (entry: [string, any[]]) => {
  const [title, unsortedData] = entry

  const data = unsortedData.sort((a, b) =>
    alphabeticComparison(a.value, b.value),
  )

  return { title, data } as IEntry
}

const sortSectionsAlphabetically = (a: IEntry, b: IEntry) => {
  const { title: charA } = a
  const { title: charB } = b

  const isBHash = charA !== "#" && charB === "#"
  if (isBHash) {
    return -1
  }

  const isAHash = charA === "#" && charB !== "#"
  if (isAHash) {
    return 1
  }

  return alphabeticComparison(charA, charB)
}

const alphabeticComparison = (a: string, b: string) => {
  const aCap = a.toUpperCase()
  const bCap = b.toUpperCase()

  if (aCap < bCap) {
    return -1
  }

  if (aCap > bCap) {
    return 1
  }

  return 0
}

export default getSectionData

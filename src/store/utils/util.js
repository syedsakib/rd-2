import moment from "moment"
import queryString from "query-string"
import validator from "email-validator"
import postscribe from "postscribe"
import shortid from "shortid"
import { formatPhoneNumber } from "react-phone-number-input"

export const getDefaultHomeImage = () => {
  const hostUrl = "https://dsycmkw0fbubc.cloudfront.net/default/"
  const imageNames = [
    "home_first.svg",
    "home_second.svg",
    "home_third.svg",
    "home_fourth.svg",
  ]
  const rnd = Math.floor(Math.random() * imageNames.length)
  return `${hostUrl}${imageNames[rnd]}`
}

export const validateEmail = email => {
  return validator.validate(email)
}

export const formatDate = (dateValue, formatStyle = "MM/DD/YYYY h:mm a") => {
  return moment(dateValue).format(formatStyle)
}

export const checkUrl = (pathName, searchWith) => {
  return pathName.search(searchWith) > -1
}

export const getQueryParams = searchQuery => {
  let queryObj = queryString.parse(searchQuery)
  delete queryObj[""]
  return queryObj
}
export const encodeQuery = params => {
  return queryString.stringify(params)
}

export const getColumnClass = (title, component) => {
  let className = "text-left"
  if (component.state.sortingColumn == title) {
    if (component.state.sortingOrder == "asc") {
      className = "text-left ascd"
    } else {
      className = "text-left decd"
    }
  }
  return className
}

export const toBase64 = file =>
  new Promise((resolve, reject) => {
    let reader
    if (window.reader) {
      reader = window.reader
    } else {
      window.reader = new FileReader()
      reader = window.reader
    }
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })

export const toObjectUrl = file => {
  new Promise((resolve, reject) => {
    let src = URL.createObjectURL(file)
    return src
  })
}

export const addDynamicScript = url => {
  const script = document.createElement("script")
  script.src = url
  script.async = true
  document.head.appendChild(script)
}

export const calculatePercentage = (base, percent) => {
  return (base * percent) / 100
}

export function loadWithPostCrib(url, id, elementId) {
  return new Promise((resolve, reject) => {
    try {
      let el = document.getElementById(elementId)
      if (!el) {
        postscribe(
          id,
          `<script language="javascript" src="${url}" id=${elementId}></script>`,
          {
            done: function () {
              console.info(`${url} script has been delivered.`)
              resolve(true)
            },
          }
        )
      } else {
        resolve(true)
      }
    } catch (err) {
      console.log(err)
      reject(err)
    }
  })
}

export function generateHomeCareUrl(state, city, slug) {
  city = city.replace(/\s+/g, "-").toLowerCase()
  state = state.replace(/\s+/g, "-").toLowerCase()
  //return `/home-care/${state}/${city}/${slug}`;
  return `/home-care/${slug}`
}

export function generatePropertyUrl(careType, state, city, slug) {
  careType = careType.replace(/\s+/g, "-").toLowerCase()
  city = city.replace(/\s+/g, "-").toLowerCase()
  state = state.replace(/\s+/g, "-").toLowerCase()
  return `/${careType}/${state}/${city}/${slug}`
}

export function addPlus(value) {
  if (value && value.charAt(0) != "+") {
    return `+${value}`
  }
  return value
}

export function addCode(value) {
  if (value && !value.startsWith(`+1`)) {
    return `+1${value}`
  }
  return value
}

export const getFirstMonthDate = () => {
  const date = new Date()
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
  return firstDay
}

export const getCurrentDate = () => {
  return new Date()
}

export const generateRandomNum = (min = 10000, max = 99999) => {
  let number = Math.round(Math.random() * (max - min) + min)
  return number
}

export const generateRandomId = () => {
  try {
    shortid.characters(
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@"
    )
    return shortid.generate()
  } catch (e) {
    console.log(e)
    return generateRandomNum()
  }
}

export const addLinkTag = (href, rel, className) => {
  const linkTag = document.createElement("link")
  linkTag.href = href
  linkTag.rel = rel
  linkTag.classList = className
  document.head.appendChild(linkTag)
}

export const removeLingTags = className => {
  let $ = window.jQuery
  $(`.${className}`).remove()
}

export const isBotAgent = () => {
  console.log(`User Agent `, window.navigator.userAgent)
  let isHeadless = window.navigator.userAgent.match(/HeadlessChrome/i)
  let isDriver = navigator.webdriver
  if (!isHeadless && !isDriver) {
    return false
  } else {
    console.log(`Request from bot Map Request prevented`)
    return true
  }
}

export const filterTitle = title => {
  title = title.replace("Llc", "")
  title = title.replace("Inc", "")
  title = title.replace("Ltd", "")
  title = title.replace(/\(1\)/g, "")
  return title
}

export const getEnv = () => {
  let url = window.location.href
  if (url.search("/panel") > -1) {
    return "development"
  } else if (url.search("/dashboard") > -1) {
    return "production"
  }
  return "local"
}

export const getURL = () => {
  let url = window.location.href
  if (url.search("/panel.boomershub.com") > -1) {
    return "https://dev.boomershub.com"
  } else if (url.search("/dashboard.boomershub.com") > -1) {
    return "https://www.boomershub.com"
  }
  return "http://localhost:3567"
}

export const getFrontUrl = () => {
  let url = window.location.href
  if (url.search("/panel") > -1) {
    return "https://dev.boomershub.com"
  } else if (url.search("/dashboard") > -1) {
    return "https://www.boomershub.com"
  }
  return "http://localhost:3000"
}

export const formatNumber = pNumber => {
  let number = formatPhoneNumber(pNumber)
  if (!number) {
    return pNumber
  }
  return number
}

export const extractTitle = title => {
  // let title = data.businessName.replace(/(Inc)(Ltd)(Llc)/g,"");
  title = title.replace("Llc", "")
  title = title.replace("Inc", "")
  title = title.replace("Ltd", "")
  title = title.replace(/\(1\)/g, "")

  return title
}

export const getPhotoUrl = urlPath => {
  if (urlPath.search("https") === -1) {
    return `https://boomershub-property-images.s3.amazonaws.com/${urlPath}`
  }
  return urlPath
}

export const getElapsedTime = startTime => {
  let endTime = Date.now()
  let totalSeconds = (endTime - startTime) / 1000
  let hours = Math.floor(totalSeconds / 3600)
  let minutes = Math.floor((totalSeconds % 3600) / 60)
  let seconds = Math.floor((totalSeconds % 3600) % 60)
  return `${hours}:${minutes}:${seconds}`
}

export const slugify = str => {
  if (str) {
    str = str.trim()
    str = str.replace(/[^a-zA-Z0-9 ]/g, "")
    str = str.replace(/\s\s+/g, " ")
    str = str.toLowerCase().replace(/\s/g, "-")
    return str
  }
  return ""
}

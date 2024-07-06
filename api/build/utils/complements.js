const puppeteer = require('puppeteer')

async function getWebData(ticker) {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 400,
  })
  const page = await browser.newPage()
  await page.goto(`https://bonos.ecovalores.com.ar/eco/ticker.php?t=${ticker}`)
  const result = await page.evaluate(() => {
    const obj = document.querySelector('.precioticker')
    if (!obj) return 0
    const value = obj.innerText
    return Number(value.replace('.', '').replace(',', '.'))
  })
  await browser.close()
  console.log(result)
}

getWebData('MRCAO')
getWebData('MRCAD')

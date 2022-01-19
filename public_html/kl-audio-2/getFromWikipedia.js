listOfDeletions = []

const getFromWikipedia = async () => {

  return new Promise(async (resolve, reject) => {
    let response = await fetch(
      "https://en.wikipedia.org/w/api.php?origin=*&action=feedrecentchanges&hidebots=1&hidepatrolled=1&hidecategorization=1", { method: "GET" }
    )

    response.text().then((x) => {



      let results = []

      let parser = new DOMParser()
      let temp = parser.parseFromString(x, "text/xml")
      let items = temp.getElementsByTagName("item")

      for (let i = 0; i < items.length; i++) {

        let contents = items[i].getElementsByTagName("description")[0]

        if (contents) {



          if (contents.textContent.indexOf("del") > -1) {
            let deletionPage = {
              title: "",
              link: "",
              pubDate: "",
              guid: "",
              deletions: []
            }



            // deletionPage.pageName

            let itemParser = new DOMParser()
            let description = itemParser.parseFromString(contents.textContent, "text/html")

            if (description.getElementsByTagName("del").length > 0) {

              deletionPage.title = items[i].getElementsByTagName("title")[0].textContent
              deletionPage.link = items[i].getElementsByTagName("link")[0].textContent
              deletionPage.pubDate = items[i].getElementsByTagName("pubDate")[0].textContent
              deletionPage.guid = items[i].getElementsByTagName("guid")[0].textContent
              deletionPage.deletions = [...description.getElementsByTagName("del")].map((x) => { return x.textContent })

              results.push(deletionPage)
            }

          }
        }
      }
      resolve(results)

    })
  }
  )
}

function refresh() {
  getFromWikipedia().then((x) => {
    listOfDeletions = x
    // console.log(listOfDeletions)
  })
}

refresh()




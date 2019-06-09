let query; //user search 
let apiUrl; //url to giphy resource
let limit = 25 //limit for entries
let gifUrls = []; //empty list to save all of the image urls
let articleHeadlineList = []; //empty list to save all of the article Headlines (default limit 10)
let articleUrl = []; //empty list to save all of the article urls (default limit 10)

//rows for organizing gifs
let row0 =  document.querySelector("#row0")
let row1 =  document.querySelector("#row1")
let row2 =  document.querySelector("#row2")
let row3 =  document.querySelector("#row3")
let row4 =  document.querySelector("#row4")

// sections for gifs and articles
let results = document.querySelector("#results")
let articleDiv = document.querySelector('#articles')


//resets html to original state
function refresh(){
relatedGifs.innerHTML = ''
articleDiv.innerHTML = ''
relatedArticles.innerHTML = ''
row0.innerHTML = ''
row1.innerHTML = ''
row2.innerHTML = ''
row3.innerHTML = ''
row4.innerHTML = ''
articleHeadlineList = []
articleUrl = []
console.log(results);
  
}

//Action when Submit button is clicked
function submitQuery(){
    query = document.getElementById("query").value; //save input for title into title variable
    apiUrl = "https://api.giphy.com/v1/gifs/search?api_key=dCr6X2LAHBCJYVOcWl6RtFh26uNQAi8Y&q=" + query + "&limit=" + limit + "&offset=0&rating=G&lang=en";
    timesUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=` + query + `&api-key=BtZJZn80GkTCwOS4vYkr9YvGYKvVpwUZ`
    console.log(query);
    console.log(apiUrl);
    console.log(timesUrl);
    sendApiRequest();
}

async function sendApiRequest() { //async allows the code to run asynchronously
  //gets the info from api urls and puts in in a promise (but waits for the information to be available first)
  //a promise lets you know it is getting something from someplace else and will show once its done getting it (but it cant do it all in one shot)
    let response = await fetch(apiUrl);
    let responseTimes = await fetch(timesUrl)
    //this prints out the promise (which should be a response once it fetches the data)
    //console.log(timesUrl)
    //console.log(response); 
    
    //Now that we waited for the promise to turn into a response we can do things with it
    //this "unpacks" the response (we need to wait for it) and puts it into a json object
    let  items = await response.json(); 
    let articles = await responseTimes.json();
    
    //In the console we should see our json transformed into nested lists (unique to each api are the subsections)
    //console.log(items) 
    //console.log(articles)
  

   //fill in the array of Gif URLs (limit is 25 in our API request)
    for (var i = 0; i < limit; i++){
      gifUrls[i] = items.data[i].images.fixed_width_small.url
    }
    
     //fill in the array of News Headlines and Article Urls (limit is 10 in our API request-----Default for NYT Api)
    for (var i = 0; i < 10; i++){
      articleHeadlineList[i] = articles.response.docs[i].headline.main
      articleUrl[i] = articles.response.docs[i].web_url
    }
    
    //console.log(articleHeadlineList)
    //console.log(articleUrl)
    //console.log(gifUrls);
    
    //put each gif on page with function
    addImageToScreen(gifUrls);
    addArticlesToScreen(articleHeadlineList,articleUrl);
}

//function that displays the Gif image on a div in html
function addImageToScreen(myURLs){
  let relatedGifs = document.querySelector("#relatedGifs") //Heading for section
  relatedGifs.innerHTML += `<h4 class="white-text"> Related Gifs</h4>`
  
  //1st row
  for(var i =0; i < 5; i++){
    row0.innerHTML += `<img src ="${myURLs[i]}">`
  }
  
  //2nd row
  for(var i =5; i < 10; i++){
    row1.innerHTML += `<img src ="${myURLs[i]}">`
  }
  
  //3rd row
  for(var i =10; i < 15; i++){
    row2.innerHTML += `<img src ="${myURLs[i]}">`
  }
  
  //4th row
  for(var i =15; i < 20; i++){
    row3.innerHTML += `<img src ="${myURLs[i]}">`
  }
  
  //5th row
  for(var i =20; i < 25; i++){
    row4.innerHTML += `<img src ="${myURLs[i]}">`
  }
}

//Lists Headings with Link to article
function addArticlesToScreen(titles,urls){
    let relatedArticles = document.querySelector("#relatedArticles") //Heading for section
    relatedArticles.innerHTML += `<h4 class="white-text"> Related Articles</h4>`
  
  for(var i =0; i < 10; i++){
    articleDiv.innerHTML += `<p><a href="${urls[i]}">"${titles[i]}"</a></p>`
  }
}
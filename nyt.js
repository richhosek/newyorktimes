// web api calls

function getArticles(search, numberOfArticles, start, end) {
    console.log(search, numberOfArticles, start, end);
    // build our URL
    let queryUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${search}&api-key=bvTgMulCaY7DRleDmz3KbzSKdPEJwaNc`;

    console.log(new Date().getFullYear());
    if (start && start.length == 4 && parseInt(start) <= new Date().getFullYear() && parseInt(start) >= 1851 ) {
        queryUrl += `&begin_date=${start}0101`;
        // queryUrl += "&begin_date=" + start + "0101"
    }

    if (end && end.length == 4 && parseInt(end) <= new Date().getFullYear() && parseInt(end) >= parseInt(start)) {
        queryUrl += `&end_date=${end}1231`
    }
    console.log(queryUrl);
    $.ajax({
        method: "GET",
        url: queryUrl
    })
    .then(function(response){
        console.log(response.response.docs)
        $("#articles").empty();
        let articles = response.response.docs;
        // loop through results
        articles.slice(0, numberOfArticles).forEach(article => {
            let articleHtml = $("<article>");
            let headline = $("<h3>").text(article.headline.print_headline || article.headline.main);

            
            let dateJs = new Date(article.pub_date)
            

            let date = $("<h5>").text(dateJs.toDateString());
            let summary = $("<p>").text(article.snippet);
            articleHtml.append(headline, date, summary);
            $("#articles").append(articleHtml);
        });

        /*
<article>
    <h1>headline</h1>
    <h3>date</h3>
    <p>summary</p>
</article>
        */
    })


    
}
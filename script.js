const apikey = '18cdf35c7f9c4dcd9e83a41bc3f14c59';

const blogContainer = document.getElementById("blog-container");

async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${apikey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching random news", error);
        return [];
    }
}

function displayBlogs(articles) {
    blogContainer.innerHTML = "";
    articles.forEach(article => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog");
        const img = document.createElement("img");
        img.src = article.urlToImage; // Fix typo here (urlToImage instead of urlToimage)
        img.alt = article.title;
        const title = document.createElement("h2");
        title.textContent = article.title;
        const description = document.createElement("p");
        description.textContent = article.description;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener("click", () => {
            window.open(article.url, "_blank");
        });
        blogContainer.appendChild(blogCard);
    });
}

(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.error("Error fetching random news", error);
    }
})();

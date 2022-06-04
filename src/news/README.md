### Top 10 most occurring words in the titles of the last 25 stories (method: top10WordsInTitlesOfLast25Stories())

1. I first made a request to the Hacker news endpoint for new stories, it returned the ids of up to 500 new stories.
1. Next, I retrieved the ids of the lastest 25 stories
1. Since I was sure the ids are all for stories, I made 25 parallel requests to the Hacker news endpoint for fetching item details using the ids
1. Then, I held all the story titles in a variable for processing
1. Futhermore, I sanitized the titles, removing special characters and numbers. This increased the reliablity of the result
1. Next, I merged all the sanitized titles and computed the frequency of occurrance of each word
1. Finally, I sorted the words by their frequency of occurrance and returned the top 10 most occuring words.

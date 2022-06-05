### Top 10 most occurring words in the titles of the last 25 stories

#### Implemented? Yes.

1. I first made a request to the Hacker news endpoint for new stories, it returned the ids of up to 500 new stories.
1. Next, I retrieved the ids of the lastest 25 stories
1. Since I was sure the ids are all for stories, I made 25 parallel requests to the Hacker news endpoint for fetching item details using the ids
1. Then, I held all the story titles in a variable for processing
1. Futhermore, I sanitized the titles, removing special characters and numbers. This increased the reliablity of the result
1. Next, I merged all the sanitized titles and computed the frequency of occurrance of each word
1. Finally, I sorted the words by their frequency of occurrance and returned the top 10 most occuring words.

### Top 10 most occurring words in the titles of the post of exactly the last week

#### Implemented? No.

- Reason: I couldn't find an endpoint to query by date range on the Hacker news documentation (https://github.com/HackerNews/API)

- At first, I wanted to compute a guess range using the /maxItem and item details endpoints, but it will involve a lot of network requests with a very long response time.
- Next, I wanted to introduce a Job queue and database to queue the task and process it later while I return a pending status to the user. But, I wasn't sure the assessment goes as far as introducing a database.

### Top 10 most occurring words in titles of the last 600 stories of users with at least 10.000 karma

#### Implemented? No.

- Reason: I couldn't find an endpoint that returns the list of users or karma filter on the Hacker news documentation (https://github.com/HackerNews/API)

# Listen
A text to speech web application that speaks word, sentences or even long articles in a music player like interface.

**View the app at https://vivek-nexus.github.io/listen**

<img src="https://vivek-nexus.github.io/listen/link-preview.png" />


<br />

<br />

<br />

## Passing a link to fetch
Pass the link as a URL parameter

Example: https://vivek-nexus.github.io/listen/app?url=https://ideas.ted.com/how-to-handle-anxiety-lionel

<br />

<br />

<br />

## Integrating Listen on your blog
#### [Option 1] Load Listen as an iframe
- On your blog pages, load the site as an iframe in a suitable way. Make sure the iframe size is at least 360px by 780px for optimal UI experience.
- Set the iframe src to `https://vivek-nexus.github.io/listen/app?url=https://yourblog.com/article-1.html`

#### [Option 2] Open Listen in a new tab
- On your blog page, provide a button such as `Listen to this article`
- On click of the button, open Listen in a new tab, by passing the blog page link as url parameter `https://vivek-nexus.github.io/listen/app?url=https://yourblog.com/article-1.html`

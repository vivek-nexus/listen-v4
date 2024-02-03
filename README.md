# Listen
A text to speech web application that speaks word, sentences or even long articles in a music player like interface.

**View the app at https://vivek-nexus.github.io/listen**

<img src="https://vivek-nexus.github.io/listen/link-preview.png" />


<br />

<br />

<br />

## Passing article text to pre-fill
Pass the article text as a URL parameter. URL encode the text for sanity.

Example: https://vivek-nexus.github.io/listen/app?text=This%20is%20the%20first%20line%20of%20the%20article.%0A%0AThis%20is%20the%20second%20line.%20Make%20sure%20to%20URL%20encode%20the%20text%20before%20passing

<br />

## Passing a link to fetch
Pass the link as a URL parameter 
- This is not a reliable method. There can be failures in fetching the article or in parsing the article. Pass the article text as a URL param instead.
- Do not use this for high traffic sites, results in slow performance and poor UX. Pass the article text as a URL param instead.

Example: https://vivek-nexus.github.io/listen/app?url=https://ideas.ted.com/how-to-handle-anxiety-lionel

<br />

<br />

<br />


## Integrating Listen on your blog
**NON-COMMERCIAL USE ONLY**

#### [Option 1] Load Listen as an iframe
- On your blog pages, load the site as an iframe in a suitable way. Make sure the iframe size is at least 360px by 780px for optimal UI experience.
- Use URL params to send your article

#### [Option 2] Open Listen in a new tab
- On your blog page, provide a button such as `Listen to this article`
- On click of the button, open Listen in a new tab. Send your article using URL params.

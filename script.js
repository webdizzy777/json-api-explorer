/*
1. Fetch and Display Posts
  ● Use fetch() to retrieve a list of posts from
  https://jsonplaceholder.typicode.com/posts
  ● Convert the response to JSON
  ● Dynamically render the post titles and bodies inside the #postList div

2. Create and Send a New Post
  ● Add a form with title and body fields
  ● Use fetch() with the POST method to send the data as JSON to the API
  ● Show a confirmation message with the response data

3. Add Loading and Error States
  ● Show a “Loading…” message while the fetch is in progress
  ● Display an error message if the fetch fails
*/
window.addEventListener("load", function () {
  /***** Get / Create Elements ****/
  const postList = document.getElementById("postList");
  const postUl = document.createElement("ul");
  const postForm = document.getElementById("postForm");
  const formSuccess = document.getElementById("formSuccess");
  const titleInput = document.getElementById("titleInput");
  const bodyInput = document.getElementById("bodyInput");
  const successP = document.createElement("p");
  const formError = document.getElementById("formError");
  const errorF = document.getElementById("error");
  const loadingMessage = document.createElement("p");
  const fetchButton = document.getElementById("fetchButton");

  /***** Submit Post ****/
  postForm.setAttribute("method", "post");

  postForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const postData = {
      title: titleInput.value,
      body: bodyInput.value,
    };

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        formSuccess.appendChild(successP);
        successP.innerHTML = `Post Confirmation for:<br />User ID: ${data.userId} <br />
        Post ID: ${data.id}<br/ >Post Title: ${data.title}<br />Post Body: ${data.body}`;
        console.log(data);
        titleInput.value = "";
        bodyInput.value = "";
      })
      .catch((error) => {
        console.error(error);
        formError.innerHTML = `<p>Error submitting form: ${error}</p>`;
      });
  });

  /***** Fetch Posts ****/
  fetchButton.addEventListener("click", () => {
    loadingMessage.innerHTML = `Loading Posts...`;
    postList.prepend(loadingMessage);

    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        postUl.id = "postUl";
        postList.appendChild(postUl);

        console.log(json);

        //display data
        json.forEach((element) => {
          const li = document.createElement("li");
          li.innerHTML = `User ID: ${element.userId}<br />ID: ${element.id}
        <br />Title: ${element.title}<br />Body: ${element.body}<br /><br />`;
          postUl.appendChild(li);
        });
        loadingMessage.innerHTML = ``;
      })
      .catch(function (error) {
        console.error(error);
        errorF.innerHTML = `<p>Error submitting form: ${error}</p>`;
      });
  });
});

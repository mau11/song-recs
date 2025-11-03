const thumbUp = document.getElementsByClassName("fa-thumbs-up");
const thumbDown = document.getElementsByClassName("fa-thumbs-down");
const trash = document.getElementsByClassName("fa-trash");

Array.from(thumbUp).forEach((element) => {
  element.onclick = (e) => updateThumb(e, "thumbUp");
});

Array.from(thumbDown).forEach((element) => {
  element.onclick = (e) => updateThumb(e, "thumbDown");
});

function updateThumb(e, thumb) {
  const username = e.target.parentNode.parentNode.childNodes[1].innerText;
  const message = e.target.parentNode.parentNode.childNodes[3].innerText;
  const thumbValue = parseFloat(
    e.target.parentNode.parentNode.childNodes[5].innerText
  );

  fetch("/messages", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      message,
      [thumb]: thumbValue,
    }),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Error with response");
      return response.json();
    })
    .then(() => window.location.reload());
}

Array.from(trash).forEach((element) => {
  element.onclick = (e) => {
    const username = e.target.parentNode.parentNode.childNodes[1].innerText;
    const message = e.target.parentNode.parentNode.childNodes[3].innerText;

    fetch("/messages", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        message,
      }),
    }).then(() => window.location.reload());
  };
});

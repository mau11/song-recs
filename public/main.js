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
  const element = e.target.closest(".message");
  const ps = element.getElementsByTagName("p");

  const username = ps[0].innerText.trim();
  const message = element.children[0].dataset.song; // iframe dataset;

  const thumbValue =
    parseFloat(element.querySelector("div span").innerText) || 0;

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
    const messageElement = e.target.closest(".message");
    const ps = messageElement.getElementsByTagName("p");

    const username = ps[0].innerText.trim();
    const message = messageElement.children[0].dataset.song; // iframe dataset;

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

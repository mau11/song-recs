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
  const element = e.target.closest(".thumb-count");
  const username = element.dataset.username;
  const song = element.dataset.song;

  const thumbValue = parseFloat(element.querySelector("span").innerText) || 0;

  fetch("/songs", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      song,
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
    const songElement = e.target.closest(".thumb-count");
    const username = songElement.dataset.username;
    const song = songElement.dataset.song;

    fetch("/songs", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        song,
      }),
    }).then((res) => window.location.reload());
  };
});

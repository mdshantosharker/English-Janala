const loadLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayAllLesson(data.data));
};

const displayAllLesson = (lessons) => {
  let levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  lessons.map((lesson) => {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
        <button href="" class="btn btn-outline btn-primary">
        <i class="fa-brands fa-leanpub"></i>Lesson-${lesson.level_no}</button>
    `;
    levelContainer.appendChild(btnDiv);
    console.log(lesson);
    console.log(levelContainer);
  });
};

loadLesson();

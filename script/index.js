const loadLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayAllLesson(data.data));
};

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWord(data.data));
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length == 0) {
    wordContainer.innerHTML = `<div class="p-14 col-span-full  flex flex-col justify-center items-center">
                <img  src="./assets/alert-error.png" alt="">
              <h1 class="hind-siliguri-regular text-[13px] text-center">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h1>
              <h1 class="hind-siliguri-regular text-[32px] text-[#292524] text-center">নেক্সট Lesson এ যান</h1>
             </div>`;
    return;
  }
  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
     <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-5">
        <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
        <p class="font-semibold">Meaning /Pronounciation </p>

        <div class="font-medium text-2xl bangla-fonts">"${word.meaning ? word.meaning : "অর্থহীন"}/ ${word.pronunciation ? word.pronunciation : "প্রণাঊন্সিয়েশন পাওয়া যায়নি"}"</div>
        <div class="flex justify-between items-center">
          <button class="btn bg-[#1A91FF1A] hover:bg-[#52a3ee]">
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <button class="btn bg-[#1A91FF1A] hover:bg-[#52a3ee]">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>
    `;
    wordContainer.append(card);
  });
};

const displayAllLesson = (lessons) => {
  let levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  lessons.map((lesson) => {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
        <button onclick="loadLevelWord(${lesson.level_no})" href="" class="btn btn-outline btn-primary">
        <i class="fa-brands fa-leanpub"></i>Lesson-${lesson.level_no}</button>
    `;
    levelContainer.appendChild(btnDiv);
    // console.log(lesson);
    // console.log(levelContainer);
  });
};

loadLesson();

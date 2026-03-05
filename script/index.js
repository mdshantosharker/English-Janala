const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

const loadLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayAllLesson(data.data));
};

const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  lessonButtons.forEach((btn) => btn.classList.remove("active"));
};

const loadLevelWord = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      // console.log(clickBtn);
      clickBtn.classList.add("active");
      displayLevelWord(data.data);
    });
};

const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details);
};

const displayWordDetails = (word) => {
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
  <h3 class="text-[36px] font-semibold  text-[#000000] mb-5">${
    word.data.word
  } (<i class="fa-solid fa-microphone-lines"></i> :${
    word.data.pronunciation
  })!</h3>
  <p class="font-semibold text-[24px] ">Meaning</p>
  <p class="text-[24px] hind-siliguri-regular  mb-6">${word.data.meaning !== null ? word.data.meaning : "অর্থ পাওয়া যায়নি"}
</p>
  <p class="font-semibold text-[24px]">Example</p>
  <p class="font-semibold text-[18px] text-[#00000080] mb-6">${
    word.data.sentence
  }</p>

  <p class=" text-[24px] hind-siliguri-regular text-[#000000]">সমার্থক শব্দ গুলো</p>
  <div>
    
  ${word?.data?.synonyms
    ?.map(
      (item) => `<button class="btn mt-3 mr-3 bg-[#EDF7FF]">${item}</button>`,
    )
    .join(" ")}
  </div>
</div>

<div class="mt-5">
  <form method="dialog">
    
    <button class="btn btn-primary">Complete Learning</button>
  </form>
</div>
</div>
  `;
  document.getElementById("my_modal").showModal();
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
    manageSpinner(false);
    return;
  }
  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
     <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-5">
        <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
        <p class="font-semibold">Meaning /Pronounciation </p>

        <div class="font-medium  bangla-fonts">"${word.meaning ? word.meaning : "অর্থহীন"}/ ${word.pronunciation ? word.pronunciation : "প্রণাঊন্সিয়েশন পাওয়া যায়নি"}"</div>
        <div class="flex justify-between items-center">
          <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF1A] hover:bg-[#52a3ee]">
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
  manageSpinner(false);
};

const displayAllLesson = (lessons) => {
  let levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  lessons.map((lesson) => {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
        <button id='lesson-btn-${lesson.level_no}' onclick="loadLevelWord(${lesson.level_no})" href="" class="btn btn-outline btn-primary lesson-btn">
        <i class="fa-brands fa-leanpub"></i>Lesson-${lesson.level_no}</button>
    `;
    levelContainer.appendChild(btnDiv);
    // console.log(lesson);
    // console.log(levelContainer);
  });
};

loadLesson();

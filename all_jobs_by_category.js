const user_type = localStorage.getItem("user_type");

let countdownIntervals = {}; // Object to keep track of countdown intervals

// Fetch categories and render them
fetch(`${config.baseUrl}/category/`)
  .then((res) => res.json())
  .then((data) => {
    const categoryContainer = document.getElementById("category-container");
    const div = document.createElement("div");
    div.classList.add(
      "flex",
      "flex-wrap",
      "justify-evenly",
      "mx-auto",
      "mt-10",
      "mb-16",
      "items-center",
      "gap-x-6",
      "gap-y-10",
      "lg:mx-0"
    );
    data.forEach((cat) => {
      div.innerHTML += `
        <a href="#" class="animated-border px-3.5 py-2.5 text-sm font-semibold text-center" onclick="getJobs('${cat.slug}')">
          ${cat.name}
        </a>
      `;
    });
    categoryContainer.appendChild(div);
  })
  .catch((err) => {
    console.log(err);
  });

// Function to fetch and display jobs dynamically
const getJobs = (categorySlugName = "") => {
  // Clear existing intervals
  for (const intervalId in countdownIntervals) {
    clearInterval(countdownIntervals[intervalId]);
  }
  countdownIntervals = {};

  // initially, to load all jobs data by default
  let url = `${config.baseUrl}/job_posts/all/`;

  if (categorySlugName) {
    // load jobs for a category only if category is selected
    url = `${config.baseUrl}/job_posts/job_posts_of_a_category/?slug=${categorySlugName}`;
  }

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const AllJobsContainer = document.getElementById("all-jobs");

      AllJobsContainer.innerHTML = "";

      data.forEach((post) => {
        const div = document.createElement("div");
        div.classList.add(
          "lg:flex",
          "lg:items-center",
          "lg:justify-between",
          "mx-5",
          "my-10",
          "border",
          "border-gray-300", // Default border color
          "hover:border-indigo-500", // Border color on hover
          "transition", // Smooth transition for the hover effect
          "duration-300", // Duration of the transition
          "ease-in-out", // Easing function for the transition
          "rounded-xl",
          "p-5"
        );

        const currentDate = new Date();

        div.innerHTML = `
          <div class="min-w-0 flex-1">
            <div class="flex justify-between items-center gap-3">
              <div class="flex justify-start items-center gap-3">
                <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">${
                  post.job_title
                }</h2>
                ${
                  // Convert the job post deadline to UTC for comparison purposes
                  new Date(post.deadline + "T23:59:59Z") > currentDate
                    ? `
                    <p class="bg-green-200 text-sm text-green-800 px-3 py-1 rounded animate-bounce">
                      Live
                    </p>
                  `
                    : `
                    <p class="bg-red-200 text-sm text-red-800 px-3 py-1 rounded animate-pulse">
                      Expired
                    </p>
                  `
                }
              </div>
              <p id="countdown-${post.id}"></p>
            </div>
            <h2 class="text-xl leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight my-5">${
              post.employer.company_name
            }</h2>
            <div class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-3 md:space-x-6">
              <div class="sm:mt-2 flex items-center text-sm text-gray-500">
                <img class="w-6 mx-2 sm:ms-0 sm:me-2" src="./assets/icons8-business-time-30.png" alt="" />${
                  post.employment_status
                }
              </div>
              <div class="mt-2 flex items-center text-sm text-gray-500">
                <img class="w-6 mx-2" src="./assets/icons8-location.gif" alt="" />${
                  post.job_location
                }
              </div>
              <div class="mt-2 flex items-center text-sm text-gray-500">
                <img class="w-6 mx-2" src="./assets/icons8-education-50.png" alt="" />${
                  post.education
                }
              </div>
              <div class="mt-2 flex items-center text-sm text-gray-500">
                <img class="w-6 mx-2" src="./assets/icons8-bangladesh-24.png" alt="" />BDT ${
                  post.salary
                }/-
              </div>
              <div class="mt-2 flex items-center text-sm text-gray-500">
                <img class="w-6 mx-2" src="./assets/icons8-date-50.png" alt="" />Closing on ${
                  post.deadline
                }
              </div>
            </div>
          </div>
          
          <a type="button" href="./job_post_details.html?post_id=${post.id}" class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-200 my-5">View Details</a>
          `
        ;
        AllJobsContainer.appendChild(div);

        // Set up countdown timer
        const deadline = new Date(post.deadline + "T23:59:59Z");
        if (deadline > currentDate) {
          const intervalId = setInterval(() => {
            const now = new Date().getTime();
            const distance = deadline - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
              (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor(
              (distance % (1000 * 60 * 60)) / (1000 * 60)
            );
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            const countdownContainer = document.getElementById(
              `countdown-${post.id}`
            );

            // Each interval checks if the countdownContainer exists before attempting to update it.
            if (countdownContainer) {
              countdownContainer.classList.add("countdown");
              countdownContainer.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s remaining...`;
            } else {
              // If the container does not exist, the interval is cleared and removed from countdownIntervals.
              clearInterval(countdownIntervals[post.id]);
              // clear existing intervals stored in countdownIntervals before starting new ones.
              delete countdownIntervals[post.id];
            }
          }, 1000);

          countdownIntervals[post.id] = intervalId;
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Fetch and display all jobs on page load
getJobs();

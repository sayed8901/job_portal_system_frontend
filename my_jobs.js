const token = localStorage.getItem("authToken");
const employer_id = localStorage.getItem("employer_id");

fetch(
  `${config.baseUrl}/job_posts/my_advertisements/?employer_id=${employer_id}`,
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  }
)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);

    const AllJobsContainer = document.getElementById("my-jobs");

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
        "p-5",
      );

      const currentDate = new Date();

      div.innerHTML = `
            <div class="min-w-0 flex-1">
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
              <div
                class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-3 md:space-x-6"
              >
                <div class="sm:mt-2 flex items-center text-sm text-gray-500">
                  <img
                    class="w-6 mx-2 sm:ms-0 sm:me-2"
                    src="./assets/icons8-business-time-30.png"
                    alt=""
                  />${post.employment_status}
                </div>
                <div class="mt-2 flex items-center text-sm text-gray-500">
                  <img
                    class="w-6 mx-2"
                    src="./assets/icons8-location.gif"
                    alt=""
                  />${post.job_location}
                </div>
                <div class="mt-2 flex items-center text-sm text-gray-500">
                  <img
                    class="w-6 mx-2"
                    src="./assets/icons8-education-50.png"
                    alt=""
                  />${post.education}
                </div>
                <div class="mt-2 flex items-center text-sm text-gray-500">
                  <img
                    class="w-6 mx-2"
                    src="./assets/icons8-bangladesh-24.png"
                    alt=""
                  />BDT ${post.salary}/-
                </div>
                <div class="mt-2 flex items-center text-sm text-gray-500">
                  <img class="w-6 mx-2" src="./assets/icons8-date-50.png" alt="" />
                  Published on ${post.job_posted_on}
                </div>
                <div class="mt-2 flex items-center text-sm text-gray-500">
                  <img class="w-6 mx-2" src="./assets/icons8-date-50.png" alt="" />
                  Closing on ${post.deadline}
                </div>
              </div>
            </div>
            <div class="flex flex-col">
              <a
                type="button" href="./applicants_of_a_job.html?post_id=${
                  post.id
                }"
                class="inline-flex items-center rounded-md bg-blue-300 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-200 mx-2 my-5"
              >
                Applications
              </a>
              <a
                type="button" href="./update_job_details.html?post_id=${
                  post.id
                }"
                class="inline-flex items-center rounded-md bg-green-300 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-green-200 mx-2 my-5"
              >
                Update Job
              </a>
              <button
                class="inline-flex items-center rounded-md bg-red-300 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-200 mx-2 my-5" onclick="handleDeleteJob(${
                  post.id
                })"
              >
                Delete Job
              </button>
            </div>
        `;
      AllJobsContainer.appendChild(div);
    });
  })
  .catch((err) => {
    console.log(err);
  })
  .catch((err) => console.log(err));

const handleDeleteJob = (job_post_id) => {
  console.log(job_post_id);

  fetch(`${config.baseUrl}/job_posts/all/${job_post_id}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        // If response status is 204 No Content, no JSON to parse
        if (response.status === 204) {
          return null;
        }
        return response.json();
      } else {
        return Promise.reject("Failed to delete the job post.");
      }
    })
    .then((data) => {
      if (data) {
        console.log(data);
      }
      alert("Job post successfully deleted.");
      window.location.href = "./my_jobs.html";
    })
    .catch((err) => console.log(err));
};

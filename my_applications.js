const token = localStorage.getItem("authToken");
const job_seeker_id = localStorage.getItem("job_seeker_id");

fetch(
  `${config.baseUrl}/job_applications/my_applications/?job_seeker_id=${job_seeker_id}`,
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

    const AllJobsContainer = document.getElementById("my-applications");

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

      div.innerHTML = `
            <div class="min-w-0 flex-1">
              <h2
                class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight mb-5"
              >
                ${post.job_post.job_title}
              </h2>
              <div
                class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-3 md:space-x-6"
              >
                <div class="mt-2 mb-5 flex items-center text-sm text-gray-500">
                  <img class="w-6 mx-2" src="./assets/icons8-bangladesh-24.png" alt="" />
                  <p class="text-lg">Salary Expectation: <span class="font-bold"> BDT ${post.salary}/-</span></p>
                </div>
                <div class="mt-2 mb-5 flex items-center text-sm text-gray-500">
                  <img class="w-6 mx-2" src="./assets/icons8-date-50.png" alt="" />
                  <p class="text-lg">Applied on: <span class="font-bold"> ${post.applied_on}</span></p>
                </div>
              </div>
              <div
                class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-3 md:space-x-6"
              >
                <div class="sm:mt-2 flex items-center text-sm text-gray-500">
                  <img
                    class="w-6 mx-2 sm:ms-0 sm:me-2"
                    src="./assets/icons8-business-time-30.png"
                    alt=""
                  />${post.job_post.employment_status}
                </div>
                <div class="mt-2 flex items-center text-sm text-gray-500">
                  <img
                    class="w-6 mx-2"
                    src="./assets/icons8-location.gif"
                    alt=""
                  />${post.job_post.job_location}
                </div>
                <div class="mt-2 flex items-center text-sm text-gray-500">
                  <img
                    class="w-6 mx-2"
                    src="./assets/icons8-education-50.png"
                    alt=""
                  />${post.job_post.education}
                </div>
                <div class="mt-2 flex items-center text-sm text-gray-500">
                  <img
                    class="w-6 mx-2"
                    src="./assets/icons8-bangladesh-24.png"
                    alt=""
                  />BDT ${post.job_post.salary}/-
                </div>
                <div class="mt-2 flex items-center text-sm text-gray-500">
                  <img class="w-6 mx-2" src="./assets/icons8-date-50.png" alt="" />
                  Closing on ${post.job_post.deadline}
                </div>
              </div>
            </div>
            <div class="flex flex-col gap-10">
              <a
                type="button" href="./job_post_details.html?post_id=${post.job_post.id}"
                class="inline-flex items-center rounded-md bg-green-300 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-green-200"
              >
                View Details
              </a>
              <button
                class="inline-flex items-center rounded-md bg-red-300 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-200" onclick="handleWithdrawApplication(${post.id})"
              >
                Withdraw
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

const handleWithdrawApplication = (job_application_id) => {
  console.log(job_application_id);

  fetch(`${config.baseUrl}/job_applications/all/${job_application_id}/`, {
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
        return Promise.reject("Failed to withdraw application.");
      }
    })
    .then((data) => {
      if (data) {
        console.log(data);
      }
      alert("Application successfully withdrawn.");
      window.location.href = "./my_applications.html";
    })
    .catch((err) => console.log(err));
};

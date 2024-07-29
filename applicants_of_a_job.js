const token = localStorage.getItem("authToken");
const employer_id = localStorage.getItem("employer_id");
const post_id = new URLSearchParams(window.location.search).get("post_id");

console.log("employer_id:", employer_id, "post_id:", post_id);

fetch(
  `${config.baseUrl}/job_applications/applications_for_a_job_post/?job_post_id=${post_id}&employer_id=${employer_id}`,
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  }
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    const AllJobsContainer = document.getElementById("applicants-of-a-job");

    data.forEach((applicant) => {
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
                ${applicant.job_seeker.user.first_name} ${applicant.job_seeker.user.last_name} (<span class="font-normal">Username:</span> ${applicant.job_seeker.user.username})
              </h2>
              <div
                class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-3 md:space-x-6"
              >
                <div class="sm:mt-2 flex items-center text-sm text-gray-500 my-3">
                  <p
                    class="text-md font-bold leading-7 text-gray-900 sm:truncate sm:text-lg sm:tracking-tight"
                  >
                    <span class="font-normal">Email </span> ${applicant.job_seeker.user.email}
                  </p>
                </div>
                <div class="sm:mt-2 flex items-center text-sm text-gray-500 my-3">
                  <p
                    class="text-md font-bold leading-7 text-gray-900 sm:truncate sm:text-lg sm:tracking-tight"
                  >
                    <span class="font-normal">Contact No:</span> ${applicant.job_seeker.contact_no}
                  </p>
                </div>
              </div>

              <div
                class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-3 md:space-x-6"
              >
                <div class="mt-2 flex items-center text-sm text-gray-500">
                  <p>Fathers Name: ${applicant.job_seeker.fathers_name}</p>
                </div>
                <div class="mt-2 flex items-center text-sm text-gray-500">
                  <p>Mothers Name: ${applicant.job_seeker.mothers_name}</p>
                </div>
              </div>

              <div
                class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-3 md:space-x-6"
              >
                <div class="mt-2 flex items-center text-sm text-gray-500">
                  <img
                    class="w-6 mx-2"
                    src="./assets/icons8-location.gif"
                    alt=""
                  />
                  <p>Address: ${applicant.job_seeker.address}</p>
                </div>
                <div class="mt-2 flex items-center text-sm text-gray-500">
                  <p>Sex: ${applicant.job_seeker.sex}</p>
                </div>
                <div class="mt-2 flex items-center text-sm text-gray-500">
                  <p>Age: ${applicant.job_seeker.age}</p>
                </div>
                <div class="mt-2 flex items-center text-sm text-gray-500">
                  <img class="w-6 mx-2" src="./assets/icons8-date-50.png" alt="" />
                  <p>Applied on: ${applicant.applied_on}</p>
                </div>
              </div>

            </div>

            <div class="flex flex-col gap-2">
                <div class="sm:mt-2 flex items-center text-sm text-gray-500 bg-gray-300 rounded-full px-3 py-2 animate-pulse">
                  <img
                    class="w-6 -ml-1 mr-2"
                    src="./assets/profile_img.png"
                    alt=""
                  />
                  <a href="${config.baseUrl}/${applicant.resume}" target="_blank" title="${applicant.resume}"
                    class="text-md font-bold leading-7 text-gray-900 sm:truncate sm:text-xl sm:tracking-tight"
                  >
                    Customized Resume
                  </a>
                </div>
                <div class="sm:mt-2 flex items-center text-sm text-gray-500">
                  <img
                    class="w-6 mx-2"
                    src="./assets/icons8-education-50.png"
                    alt=""
                  />
                  <p
                    class="text-md font-bold leading-7 text-gray-900 sm:truncate sm:text-xl sm:tracking-tight"
                  >
                    <span class="font-normal">Education:</span> ${applicant.job_seeker.education}
                  </p>
                </div>
                <div class="sm:mt-2 flex items-center text-sm text-gray-500">
                  <img
                    class="w-6 mx-2 sm:ms-0 sm:me-2"
                    src="./assets/icons8-business-time-30.png"
                    alt=""
                  />
                  <p
                    class="text-md font-bold leading-7 text-gray-900 sm:truncate sm:text-xl sm:tracking-tight"
                  >
                    <span class="font-normal">Experience:</span> ${applicant.job_seeker.experience}
                  </p>
                </div>
                <div class="sm:mt-2 flex items-center text-sm text-gray-500">
                  <img
                    class="w-6 mx-2"
                    src="./assets/icons8-bangladesh-24.png"
                    alt=""
                  />
                  <p
                    class="text-md font-bold leading-7 text-gray-900 sm:truncate sm:text-xl sm:tracking-tight"
                  >
                    <span class="font-normal">Expectation: </span> ${applicant.salary}/-
                  </p>
                </div>
            </div>
        `;
      AllJobsContainer.appendChild(div);
    });
  })
  .catch((err) => console.log(err));

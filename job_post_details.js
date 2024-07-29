const token = localStorage.getItem("authToken");
const job_seeker_id = localStorage.getItem("job_seeker_id");
const user_type = localStorage.getItem("user_type");

const getParams = () => {
  return new URLSearchParams(window.location.search).get("post_id");
};

const job_post_id = getParams();
console.log(job_post_id);

const currentDate = new Date();

// Fetch job post details
fetch(`${config.baseUrl}/job_posts/all/${job_post_id}/`)
  .then((res) => res.json())
  .then((post) => {
    console.log(post);
    const postDetailsContainer = document.getElementById("job-post-detail");

    const div = document.createElement("div");

    div.innerHTML = `
        <div class="lg:flex justify-between items-end gap-2 space-y-5 mb-10">
          <div>
            <h2 class="text-3xl">${post.employer.company_name}</h2>
            <h1 class="text-4xl font-bold">${post.job_title}</h1>
          </div>
          <div class="lg:space-y-2">
            <p>
              Job Published on: <span class="font-bold">${post.job_posted_on}</span>
            </p>
            <p>
              Application Deadline:
              <span class="font-bold text-rose-800">${post.deadline}</span>
            </p>
          </div>
        </div>

        <hr />

        <div class="my-10">
          <h1 class="text-2xl text-rose-800 font-bold mb-3">Summary</h1>
          <div
            class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6 md:space-x-12 lg:space-x-24"
          >
            <p>Vacancy: <span class="font-bold">${post.vacancy}</span></p>
            <p>Location: <span class="font-bold">${post.job_location}</span></p>
            <p>Maximum Salary: <span class="font-bold">BDT ${post.salary}/-</span></p>
          </div>
        </div>

        <div class="my-10">
          <h1 class="text-2xl text-rose-800 font-bold mb-3">Requirements</h1>
          <div class="space-y-3">
            <p><span class="font-bold">Education: </span>${post.education}</p>
            <p><span class="font-bold">Experience: </span>${post.experience}</p>
          </div>
        </div>

        <div class="my-10">
          <h1 class="text-2xl text-rose-800 font-bold mb-3">
            Responsibilities & Job Context
          </h1>
          <div class="space-y-3">
            <p>${post.job_context}</p>
            <p>${post.job_responsibilities}</p>
          </div>
        </div>

        <div class="my-10">
          <h1 class="text-2xl text-rose-800 font-bold mb-3">
            Compensation & Extra Benefits
          </h1>
          <div class="space-y-3">
            <p><span class="font-bold">Salary: </span>BDT ${post.salary}/-</p>
            <p>
              <span class="font-bold">Extra Benefits: </span>${post.other_benefits}
            </p>
          </div>
        </div>

        <div class="my-10">
          <h1 class="text-2xl text-rose-800 font-bold mb-3">
            Additional Information
          </h1>
          <div
            class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6 md:space-x-12 lg:space-x-24"
          >
            <p>Employment Type: <span class="font-bold">${post.employment_status}</span></p>
            <p>Maximum Age: <span class="font-bold">${post.age}</span></p>
            <p>Job Location: <span class="font-bold">${post.job_location}</span></p>
          </div>
        </div>

        <hr />

        <div class="my-10">
          <h1 class="text-2xl text-rose-800 font-bold mb-3">
            Company Information
          </h1>
          <div class="space-y-3">
            <p><span class="font-bold">Company Name: </span>${post.employer.company_name}</p>
            <p><span class="font-bold">Company Address: </span>${post.employer.company_address}</p>
            <p><span class="font-bold">Business Information: </span>${post.employer.business_info}</p>
          </div>
        </div>

        <hr />

        <div class="my-10">
          <h1 class="text-2xl text-rose-800 font-bold mb-3">
            Application Instructions
          </h1>
          <p>${post.application_instructions}</p>
        </div>

        <hr />

        <!-- apply btn -->
        <div id="apply-section" class="flex justify-end mt-10">
          
        </div>
  `;
    postDetailsContainer.appendChild(div);

    if (job_seeker_id) {
      // Fetch to check if the job_seeker already applied to the job post or not
      fetch(
        `${config.baseUrl}/job_applications/check_application/?job_post_id=${job_post_id}&job_seeker_id=${job_seeker_id}`,
        {
          method: "GET",
          headers: { Authorization: `Token ${token}` },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          const applyBtnSectionContainer =
            document.getElementById("apply-section");

          // Check if job seeker has already applied
          if (data.message === "Already applied for this job post") {
            applyBtnSectionContainer.innerHTML = `
            <p class="bg-green-200 mx-auto text-green-800 px-3 py-1 rounded">
              You have already applied for this job post.
            </p>
            `;
          } else {
            // If not applied, then check if the job post is expired
            // Convert the job post deadline to UTC for comparison purposes
            if (new Date(post.deadline + "T23:59:59Z") < currentDate) {
              applyBtnSectionContainer.innerHTML = `
              <p class="bg-red-200 mx-auto text-red-800 px-3 py-1 rounded">
                This Job Post Already Got Expired, So You Can Not Apply Now.
              </p>
              `;
            } else {
              applyBtnSectionContainer.innerHTML = `
              <a
                href="#"
                class="mr-10 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onclick="handleApplication()"
              >Apply Now</a>`;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const applyBtnSectionContainer = document.getElementById("apply-section");

      // checking if the user is employer or there is no logged in user al all
      // Convert the job post deadline to UTC for comparison purposes
      if (new Date(post.deadline + "T23:59:59Z") <= currentDate) {
        applyBtnSectionContainer.innerHTML = `
              <p class="bg-red-200 mx-auto text-red-800 px-3 py-1 rounded">
                This Job Post Already Got Expired.
              </p>
              `;
      } else {
        applyBtnSectionContainer.innerHTML = `
              <a
                href="./login.html"
                class="mr-10 rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Please Log in as job_seeker to apply<span class="ml-2" aria-hidden="true">&rarr;</span>
              </a>`;
      }
    }
  
    const pdfContainer = document.getElementById("pdf-container");
    pdfContainer.innerHTML = `
      <!-- to save pdf -->
      <button
        onclick="downloadPDF()"
        class="mr-10 rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline flex flex-end"
      >Download Post</button>
    `;
  })
  .catch((err) => {
    console.log(err);
  });

const handleApplication = () => {
  document.getElementById("apply-modal").classList.remove("hidden");

  document.getElementById("apply-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    // I am sending formData directly to handle the file field data

    console.log("FormData:", formData);
    console.log(
      "job_post_id: ",
      job_post_id,
      " & job_seeker_id: ",
      job_seeker_id
    );

    // Show loading spinner and hide buttons while application request processing
    document.getElementById("buttons-div").classList.add("hidden");
    document.getElementById("loading-div").classList.remove("hidden");

    // fetching the job application API
    fetch(
      `${config.baseUrl}/job_applications/apply/?job_post_id=${job_post_id}&job_seeker_id=${job_seeker_id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
        },
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          displayErrorMessages(data.error);
        } else {
          console.log("Application submitted:", data);
          alert(
            "Application successfully submitted. Check your email for confirmation."
          );
          window.location.href = "./my_applications.html";

          // Stop loading spinner after successful application request
          document.getElementById("loading-div").classList.add("hidden");

          // Show hide buttons again, if the application request processing failed
          document.getElementById("buttons-div").classList.remove("hidden");
        }
        closeModal(); // Close the modal
      })
      .catch((err) => {
        console.log("Error submitting application:", err);
      });
  });
};

const closeModal = () => {
  document.getElementById("apply-modal").classList.add("hidden");
};

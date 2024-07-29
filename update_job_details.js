const token = localStorage.getItem("authToken");
const post_id = new URLSearchParams(window.location.search).get("post_id");

fetch(`${config.baseUrl}/job_posts/all/${post_id}/`)
  .then((response) => response.json())
  .then((post) => {
    console.log(post);

    job_category = post.job_category;
    employment_status = post.employment_status;

    const job_details_container = document.getElementById("Job_details_data");
    const div = document.createElement("div");
    (div.classList.add = "border-b"), "border-gray-900/10", "pb-12";

    div.innerHTML = `
        <div class="border-b border-gray-900/10 pb-12">
          
            <h2 class="text-base font-semibold leading-7 text-gray-900">General Information</h2>


            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div class="sm:col-span-full">
                <label for="job_title" class="block text-sm font-medium leading-6 text-gray-900">Job Title</label>
                <div class="mt-2">
                  <input value="${post.job_title}" type="text" name="job_title" id="job_title" required autocomplete="job_title" class="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
              </div>

              <div class="sm:col-span-4">
                <label for="job_location" class="block text-sm font-medium leading-6 text-gray-900">Job Location</label>
                <div class="mt-2">
                  <input value="${post.job_location}" type="text" name="job_location" id="job_location" required autocomplete="job_location" class="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
              </div>

              <div class="sm:col-span-2">
                <label for="vacancy" class="block text-sm font-medium leading-6 text-gray-900">Vacancy</label>
                <div class="mt-2">
                  <input value="${post.vacancy}" type="number" name="vacancy" id="vacancy" required autocomplete="vacancy" class="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
              </div>

              <div class="sm:col-span-4">
                <label for="job_category" class="block text-sm font-medium leading-6 text-gray-900">Job Category</label>
                <div class="mt-2">
                  <input readonly value="${post.job_category}" type="text" name="job_category" id="job_category" required autocomplete="job_category" class="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
              </div>

              <div class="sm:col-span-2">
                <label for="employment_status" class="block text-sm font-medium leading-6 text-gray-900">Employment Type</label>
                <div class="mt-2">
                  <input readonly value="${post.employment_status}" type="text" name="employment_status" id="employment_status" required autocomplete="employment_status" class="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
              </div>
            </div>

        </div>

        
        <div class="border-b border-gray-900/10 pb-12">
          
            <h2 class="text-base font-semibold leading-7 text-gray-900">Requirements</h2>

            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

              <div class="col-span-full">
                <label for="education" class="block text-sm font-medium leading-6 text-gray-900">Education</label>
                <div class="mt-2">
                  <textarea rows="3" name="education" id="education" required class="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">${post.education}</textarea>
                </div>
              </div>

              <div class="sm:col-span-5">
                <label for="experience" class="block text-sm font-medium leading-6 text-gray-900">Job Experience</label>
                <div class="mt-2">
                  <textarea rows="2" name="experience" id="experience" required class="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">${post.experience}</textarea>
                </div>
              </div>

              <div class="sm:col-span-1">
                <label for="age" class="block text-sm font-medium leading-6 text-gray-900">Max Age(yrs)</label>
                <div class="mt-2">
                  <input value="${post.age}" type="number" name="age" id="age" required autocomplete="age" class="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
              </div>
            </div>

        </div>

        <div class="border-b border-gray-900/10 pb-12">
          
            <h2 class="text-base font-semibold leading-7 text-gray-900">Responsibility & Job Context</h2>

            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

              <div class="col-span-full">
                <label for="job_context" class="block text-sm font-medium leading-6 text-gray-900">Job Context</label>
                <div class="mt-2">
                  <textarea rows="3" name="job_context" id="job_context" required class="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">${post.job_context}</textarea>
                </div>
              </div>

              <div class="col-span-full">
                <label for="job_responsibilities" class="block text-sm font-medium leading-6 text-gray-900">Job Responsibilities</label>
                <div class="mt-2">
                  <textarea rows="15" name="job_responsibilities" id="job_responsibilities" required class="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">${post.job_responsibilities}</textarea>
                </div>
              </div>
            </div>

        </div>

        <div class="border-b border-gray-900/10 pb-12">
          
            <h2 class="text-base font-semibold leading-7 text-gray-900">Compensation & Other Benefits</h2>

            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              
              <div class="sm:col-span-4">
                <label for="salary" class="block text-sm font-medium leading-6 text-gray-900">Salary</label>
                <div class="mt-2">
                  <input value="${post.salary}" type="number" name="salary" id="salary" required autocomplete="salary" class="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
              </div>

              <div class="col-span-full">
                <label for="other_benefits" class="block text-sm font-medium leading-6 text-gray-900">Other Benefits</label>
                <div class="mt-2">
                  <textarea rows="3" name="other_benefits" id="other_benefits" class="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">${post.other_benefits}</textarea>
                </div>
              </div>
            </div>

        </div>

        <div class="border-b border-gray-900/10 pb-12">
          
            <h2 class="text-base font-semibold leading-7 text-gray-900">Application Information</h2>

            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

              <div class="col-span-full">
                <label for="application_instructions" class="block text-sm font-medium leading-6 text-gray-900">Application Instructions</label>
                <div class="mt-2">
                  <textarea rows="5" name="application_instructions" id="application_instructions" required class="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">${post.application_instructions}</textarea>
                </div>
              </div>

              <div class="sm:col-span-4">
                <label for="deadline" class="block text-sm font-medium leading-6 text-gray-900">Deadline</label>
                <div class="mt-2">
                  <input value="${post.deadline}" type="date" name="deadline" id="deadline" required autocomplete="deadline" class="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
              </div>
            </div>

        </div>
    `;

    job_details_container.appendChild(div);
  });

const handleUpdateJobDetails = (event) => {
  event.preventDefault();

  // getting the form element
  const form = document.getElementById("job_details_update_form");

  // creating a new formData
  const formData = new FormData(form);

  // creating a new profile data object
  const jobPostDetailsData = {
    // job_category is handled as an array as it might be multiple, so sent as a list to backend
    // also converting it into a integer number as primary key for the job category
    job_category: [parseInt(document.getElementById("job_category").value)],

    job_title: formData.get("job_title"),
    vacancy: parseInt(formData.get("vacancy")),
    job_location: formData.get("job_location"),
    job_title: formData.get("job_title"),
    employment_status: document.getElementById("employment_status").value,

    education: formData.get("education"),
    experience: formData.get("experience"),
    age: parseInt(formData.get("age")),

    job_context: formData.get("job_context"),
    job_responsibilities: formData.get("job_responsibilities"),

    salary: parseInt(formData.get("salary")),
    other_benefits: formData.get("other_benefits"),

    application_instructions: formData.get("application_instructions"),
    deadline: document.getElementById("deadline").value,
  };
  console.log(jobPostDetailsData);

  //   fetching job_post Update API
  fetch(`${config.baseUrl}/job_posts/all/${post_id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(jobPostDetailsData),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("job post details data:", data);
      alert("Job post data successfully updated.");
      window.location.href = "./my_jobs.html";
    })
    .catch((err) => {
      console.log("Error details:", err);
      return err.json();
    })
    .then((errorData) => {
      console.log("Error response body:", errorData);
    });
};

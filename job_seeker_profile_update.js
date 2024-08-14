const token = localStorage.getItem("authToken");
const user_id = localStorage.getItem("user_id");

fetch(`${config.baseUrl}/accounts/user/?user_id=${user_id}`)
  .then((response) => response.json())
  .then((user) => {
    console.log(user);

    const account_info_container = document.getElementById(
      "applicant_profile_account_info"
    );

    const div = document.createElement("div");
    div.innerHTML = `
            <p class="mt-1 text-sm leading-6 text-gray-600">Hello "${user.first_name} ${user.last_name}". This is your profile page.</p>


            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
              <div class="sm:col-span-4">
                <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
                <div class="mt-2">
                  <input readonly value="${user.username}" type="text" name="username" id="username" autocomplete="username" class="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
              </div>

              <div class="sm:col-span-3">
                <label for="first_name" class="block text-sm font-medium leading-6 text-gray-900">First name</label>
                <div class="mt-2">
                  <input readonly value="${user.first_name}" type="text" name="first_name" id="first_name" autocomplete="first_name" class="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
              </div>

              <div class="sm:col-span-3">
                <label for="last_name" class="block text-sm font-medium leading-6 text-gray-900">Last name</label>
                <div class="mt-2">
                  <input readonly value="${user.last_name}" type="text" name="last_name" id="last_name" autocomplete="last_name" class="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
              </div>

              <div class="sm:col-span-4">
                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                <div class="mt-2">
                  <input readonly value="${user.email}" id="email" name="email" type="email" autocomplete="email" class="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
              </div>
            </div>
    `;
    account_info_container.appendChild(div);
  });

fetch(`${config.baseUrl}/job_seeker/by_user_id/?user_id=${user_id}`, {
  headers: {
    Authorization: `Token ${token}`,
  },
})
  .then((response) => response.json())
  .then((user) => {
    console.log(user);

    const account_info_container = document.getElementById(
      "applicant_profile_personal_info"
    );

    const div = document.createElement("div");
    div.innerHTML = `
            <p class="mt-1 text-sm leading-6 text-gray-600">You can easily update your profile information.</p>

            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
              <div class="sm:col-span-3">
                <label for="fathers_name" class="block text-sm font-medium leading-6 text-gray-900">Fathers name</label>
                <div class="mt-2">
                  <input value="${user.fathers_name}" type="text" name="fathers_name" id="fathers_name" autocomplete="fathers_name" class="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
              </div>

              <div class="sm:col-span-3">
                <label for="mothers_name" class="block text-sm font-medium leading-6 text-gray-900">Mothers name</label>
                <div class="mt-2">
                  <input value="${user.mothers_name}" type="text" name="mothers_name" id="mothers_name" autocomplete="mothers_name" class="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
              </div>

              <div class="sm:col-span-4">
                <label for="contact_no" class="block text-sm font-medium leading-6 text-gray-900">Contact no</label>
                <div class="mt-2">
                  <input value="${user.contact_no}" type="text" name="contact_no" id="contact_no" autocomplete="contact_no" class="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
              </div>
            </div>
            <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
              <div class="sm:col-span-3">
                <label for="sex" class="block text-sm font-medium leading-6 text-gray-900">Sex</label>
                <div class="mt-2">
                  <input readonly value="${user.sex}" type="text" name="sex" id="sex" autocomplete="sex" class="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
              </div>

              <div class="sm:col-span-3">
                <label for="age" class="block text-sm font-medium leading-6 text-gray-900">Age</label>
                <div class="mt-2">
                  <input value="${user.age}" type="number" name="age" id="age" autocomplete="age" class="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
              </div>

              <div class="col-span-full">
                <label for="address" class="block text-sm font-medium leading-6 text-gray-900">Address</label>
                <div class="mt-2">
                  <input value="${user.address}" type="text" name="address" id="address" autocomplete="address" class="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
              </div>

              <div class="col-span-full">
                <label for="education" class="block text-sm font-medium leading-6 text-gray-900">Education</label>
                <div class="mt-2">
                  <input value="${user.education}" type="text" name="education" id="education" autocomplete="education" class="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
                <p class="mt-3 text-sm leading-6 text-gray-600">Write about your educational background in short</p>
              </div>

              <div class="sm:col-span-3">
                <label for="experience" class="block text-sm font-medium leading-6 text-gray-900">Job Experience (in yrs)</label>
                <div class="mt-2">
                  <input value="${user.experience}" type="text" name="experience" id="experience" autocomplete="experience" class="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
              </div>
            </div>
    `;
    account_info_container.appendChild(div);
  });

const handleUpdateJobSeekerProfile = (event) => {
  event.preventDefault();

  const job_seeker_id = localStorage.getItem("job_seeker_id");
  console.log(job_seeker_id);

  // getting the form element
  const form = document.getElementById("job_seeker_profile_update_form");

  // creating a new formData
  const formData = new FormData(form);

  // creating a new profile data object
  const jobSeekerProfileData = {
    sex: formData.get("sex"),
    age: parseInt(formData.get("age")),
    contact_no: formData.get("contact_no"),
    address: formData.get("address"),
    fathers_name: formData.get("fathers_name"),
    mothers_name: formData.get("mothers_name"),
    education: formData.get("education"),
    experience: formData.get("experience"),
  };
  console.log(jobSeekerProfileData);

  // fetching profile API
  fetch(`${config.baseUrl}/job_seeker/list/${job_seeker_id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(jobSeekerProfileData),
  })
    .then((res) => {
      res.json();
      console.log(res);
      console.log("User Token:", token);
    })
    .then((data) => {
      console.log("job seeker profile data:", data);
      alert("Profile data successfully updated.");
      window.location.href = "./job_seeker_profile.html";
    })
    .catch((err) => console.log("job seeker update profile error:", err));
};

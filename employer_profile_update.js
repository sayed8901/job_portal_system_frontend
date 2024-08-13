const token = localStorage.getItem("authToken");
const user_id = localStorage.getItem("user_id");

fetch(`${config.baseUrl}/accounts/user/?user_id=${user_id}`)
  .then((response) => response.json())
  .then((user) => {
    console.log(user);

    const account_info_container = document.getElementById(
      "employer_profile_account_info"
    );

    const div = document.createElement("div");
    div.innerHTML = `
            <p class="mt-1 text-sm leading-6 text-gray-600">Hello "${user.first_name} ${user.last_name}". This is your profile page.</p>


            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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

fetch(`${config.baseUrl}/employer/by_user_id/?user_id=${user_id}`, {
  headers: {
    Authorization: `Token ${token}`,
  },
})
  .then((response) => response.json())
  .then((user) => {
    console.log(user);
    localStorage.setItem("employer_id", user.id);

    const account_info_container = document.getElementById(
      "employer_profile_personal_info"
    );

    const div = document.createElement("div");
    div.innerHTML = `
            <p class="mt-1 text-sm leading-6 text-gray-600">You can easily update your profile information.</p>

            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div class="col-span-full">
                <label for="company_name" class="block text-sm font-medium leading-6 text-gray-900">Company Name</label>
                <div class="mt-2">
                  <input value="${user.company_name}" type="text" name="company_name" id="company_name" autocomplete="company_name" class="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
              </div><div class="col-span-full">
                <label for="company_address" class="block text-sm font-medium leading-6 text-gray-900">Company Address</label>
                <div class="mt-2">
                  <input value="${user.company_address}" type="text" name="company_address" id="company_address" autocomplete="company_address" class="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
              </div>
              <div class="col-span-full">
                <label for="business_info" class="block text-sm font-medium leading-6 text-gray-900">Business Information</label>
                <div class="mt-2">
                  <input value="${user.business_info}" type="text" name="business_info" id="business_info" autocomplete="business_info" class="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
              </div>
            </div>
    `;
    account_info_container.appendChild(div);
  });

const handleUpdateEmployerProfile = (event) => {
  event.preventDefault();

  const employer_id = localStorage.getItem("employer_id");
  console.log(employer_id);

  // getting the form element
  const form = document.getElementById("employer_profile_update_form");

  // creating a new formData
  const formData = new FormData(form);

  // creating a new profile data object
  const employerProfileData = {
    company_name: formData.get("company_name"),
    company_address: formData.get("company_address"),
    business_info: formData.get("business_info"),
  };
  console.log(employerProfileData);

  // fetching profile API
  fetch(`${config.baseUrl}/employer/list/${employer_id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(employerProfileData),
  })
    .then((res) => {
      res.json();
      console.log(res);
      console.log("User Token:", token);
    })
    .then((data) => {
      console.log("employer profile data:", data);
      alert("Profile data successfully updated.");
      window.location.href = "./employer_profile.html";
    })
    .catch((err) => console.log("employer update profile error:", err));
};

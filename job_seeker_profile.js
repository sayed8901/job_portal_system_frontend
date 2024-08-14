const token = localStorage.getItem("authToken");
const user_id = localStorage.getItem("user_id");

fetch(`${config.baseUrl}/accounts/user/?user_id=${user_id}`)
  .then((response) => response.json())
  .then((user) => {
    console.log(user);

    const account_info_container = document.getElementById(
      "applicant_profile_account_info"
    );

    const dl = document.createElement("dl");
    dl.classList.add("divide-y", "divide-gray-200");

    dl.innerHTML = `
            <div class="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">
                Full name
              </dt>
              <dd
                class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
              >
                ${user.first_name} ${user.last_name}
              </dd>
            </div>
            <div class="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">
                Username
              </dt>
              <dd
                class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
              >
                ${user.username}
              </dd>
            </div>
            <div class="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">
                Email address
              </dt>
              <dd
                class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
              >
                ${user.email}
              </dd>
            </div>
    `;
    account_info_container.appendChild(dl);
  });

fetch(`${config.baseUrl}/job_seeker/by_user_id/?user_id=${user_id}`, {
  headers: {
    Authorization: `Token ${token}`,
  },
})
  .then((response) => response.json())
  .then((user) => {
    console.log(user);
    localStorage.setItem("job_seeker_id", user.id);

    const account_info_container = document.getElementById(
      "applicant_profile_personal_info"
    );

    const dl = document.createElement("dl");
    dl.classList.add("divide-y", "divide-gray-200");

    dl.innerHTML = `
            <div class="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">
                Father name
              </dt>
              <dd
                class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
              >
                ${user.fathers_name}
              </dd>
            </div>
            <div class="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">
                Mothers name
              </dt>
              <dd
                class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
              >
                ${user.mothers_name}
              </dd>
            </div>
            <div class="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">
                Contact number
              </dt>
              <dd
                class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
              >
                ${user.contact_no}
              </dd>
            </div>
            <div class="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">Sex</dt>
              <dd
                class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
              >
                ${user.sex}
              </dd>
            </div>
            <div class="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">Age</dt>
              <dd
                class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
              >
                ${user.age} yrs
              </dd>
            </div>
            <div class="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">
                Address
              </dt>
              <dd
                class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
              >
                ${user.address}
              </dd>
            </div>
            <div class="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">
                Education
              </dt>
              <dd
                class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
              >
                ${user.education}
              </dd>
            </div>
            <div class="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">
                Experience
              </dt>
              <dd
                class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
              >
                ${user.experience}
              </dd>
            </div>
    `;
    account_info_container.appendChild(dl);
  });

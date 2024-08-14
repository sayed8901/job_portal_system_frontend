const token = localStorage.getItem("authToken");
const user_id = localStorage.getItem("user_id");

fetch(`${config.baseUrl}/accounts/user/?user_id=${user_id}`)
  .then((response) => response.json())
  .then((user) => {
    console.log(user);

    const account_info_container = document.getElementById(
      "employer_profile_account_info"
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

    const dl = document.createElement("dl");
    dl.classList.add("divide-y", "divide-gray-200");

    dl.innerHTML = `
            <div class="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">
                Company name
              </dt>
              <dd
                class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
              >
                ${user.company_name}
              </dd>
            </div>
            <div class="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">
                Company Address
              </dt>
              <dd
                class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
              >
                ${user.company_address}
              </dd>
            </div>
            <div class="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">
                Business info
              </dt>
              <dd
                class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
              >
                ${user.business_info}
              </dd>
            </div>
    `;
    account_info_container.appendChild(dl);
  });

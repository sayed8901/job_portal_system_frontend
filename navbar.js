fetch("./navbar.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("navbar").innerHTML = data;

    const username = localStorage.getItem("username");
    const user_type = localStorage.getItem("user_type");
    console.log("user:", username, ", type:", user_type);

    // to conditionally render nav items
    const navElementMainContainer = document.getElementById(
      "navbar-element-main"
    );
    const navElementMobileContainer = document.getElementById(
      "navbar-element-mobile"
    );
    const navElementAuthContainer = document.getElementById(
      "navbar-element-auth"
    );

    if (user_type == "employer") {
      navElementMainContainer.innerHTML += `
            <a href="./publish_new_job.html" class="rounded-md px-1 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white text-center">Post New Job</a>
            <a href="./my_jobs.html" class="rounded-md px-1 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white text-center">My Jobs</a>
      `;
      navElementMobileContainer.innerHTML += `
            <a href="./publish_new_job.html" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Post New Job</a>
            <a href="./my_jobs.html" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">My Jobs</a>
      `;
      navElementAuthContainer.innerHTML = `
            <a href="./employer_profile.html" class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white  text-center">Profile</a>
            <a class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white text-center cursor-pointer" onclick=handleLogout()>Logout</a>
      `;
    } else if (user_type == "job_seeker") {
      navElementMainContainer.innerHTML += `
            <a href="./my_applications.html" class="rounded-md px-1 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white text-center">My Applications</a>
      `;
      navElementMobileContainer.innerHTML += `
            <a href="./my_applications.html" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">My Applications</a>
      `;
      navElementAuthContainer.innerHTML = `
            <a href="./job_seeker_profile.html" class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white  text-center">Profile</a>
            <a class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white text-center cursor-pointer" onclick=handleLogout()>Logout</a>
      `;
    } else {
      navElementAuthContainer.innerHTML = `
            <a href="./login.html" class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Login</a>
            <a href="./job_seeker_register.html" class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white h-14 w-24 text-center">Applicant Registration</a>
            <a href="./employer_register.html" class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white h-14 w-24 text-center">Employer Registration</a>
      `;
    }

    document.getElementById("logged_in_username").innerText = username;
  })
  .catch((error) => console.error("Error loading navbar:", error));

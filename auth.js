const handleJobSeekerRegistration = (event) => {
  event.preventDefault();

  // getting the form element
  const form = document.getElementById("job_seeker_registration_form");

  // creating a new formData
  const formData = new FormData(form);

  // creating a registration data object
  const jobSeekerRegistrationData = {
    username: formData.get("username"),
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    email: formData.get("email"),

    sex: document.getElementById("sex").value,
    age: parseInt(formData.get("age")),
    contact_no: formData.get("contact_no"),
    address: formData.get("address"),
    fathers_name: formData.get("fathers_name"),
    mothers_name: formData.get("mothers_name"),
    education: formData.get("education"),
    experience: formData.get("experience"),

    password: formData.get("applicant_reg_password_1"),
    confirm_password: formData.get("applicant_reg_password_2"),
  };
  console.log(jobSeekerRegistrationData);

  // fetching registration API
  fetch(`${config.baseUrl}/job_seeker/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobSeekerRegistrationData),
  })
    .then((res) =>
      res.json().then((data) => ({
        status: res.status,
        body: data,
      }))
    )
    .then((response) => {
      console.log("Response received:", response);
      if (response.status === 400) {
        displayErrorMessages(response.body);
      } else {
        console.log("job seeker registration data:", response.body);
        alert(
          "Registration Successful. Please check your email for confirmation."
        );
        window.location.href = "./login.html";
      }
    })
    .catch((err) => console.log("job seeker registration error:", err));
};

const handleEmployerRegistration = (event) => {
  event.preventDefault();

  // getting the form element
  const form = document.getElementById("employer_registration_form");

  // creating a new formData
  const formData = new FormData(form);

  // creating a registration data object
  const employerRegistrationData = {
    username: formData.get("username"),
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    email: formData.get("email"),

    company_name: formData.get("company_name"),
    company_address: formData.get("company_address"),
    business_info: formData.get("business_info"),

    password: formData.get("employer_reg_password_1"),
    confirm_password: formData.get("employer_reg_password_2"),
  };
  console.log(employerRegistrationData);

  // fetching registration API
  fetch(`${config.baseUrl}/employer/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employerRegistrationData),
  })
    .then((res) =>
      res.json().then((data) => ({
        status: res.status,
        body: data,
      }))
    )
    .then((response) => {
      console.log("Response received:", response);
      if (response.status === 400) {
        displayErrorMessages(response.body);
      } else {
        console.log("employer registration data:", response.body);
        alert(
          "Registration Successful. Please check your email for confirmation."
        );
        window.location.href = "./login.html";
      }
    })
    .catch((err) => console.log("employer registration error:", err));
};

const handleLogin = async (event) => {
  event.preventDefault();

  // getting the registration-form element
  const form = document.getElementById("login-form");

  // creating a new formData
  const formData = new FormData(form);

  // creating a new login data object
  const loginData = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  // by using async here, we can wait for the fetch request to complete before proceeding
  const getUserObject = async (user_id) => {
    try {
      // This fetch will wait for the response from the login fetch
      const response = await fetch(
        `${config.baseUrl}/accounts/user/?user_id=${user_id}`
      );
      const data = await response.json();
      console.log(data);

      const user_type = data.user_type;
      const username = data.username;

      console.log("user_type:", user_type);
      console.log("username:", username);

      localStorage.setItem("user_type", user_type);
      localStorage.setItem("username", username);

      // redirecting
      if (user_type == "job_seeker") {
        window.location.href = "./job_seeker_profile.html";
      } else if (user_type == "employer") {
        window.location.href = "./employer_profile.html";
      }
    } catch (err) {
      console.log(err);
    }
  };

  try {
    // fetching login API
    // This fetch will wait for the response from the login fetch
    const response = await fetch(`${config.baseUrl}/accounts/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();

    if (data.error) {
      displayErrorMessages(data.error);
    } else {
      console.log(data);
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user_id", data.user_id);

      // This fetch (getUserObject) will be executed next, waiting for the login fetch to complete
      await getUserObject(data.user_id);

      alert("Login Successful.");
    }
  } catch (err) {
    console.log("Login error", err);
  }
};

const handleLogout = () => {
  const token = localStorage.getItem("authToken");

  // fetching logout API
  fetch(`${config.baseUrl}/accounts/logout/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  })
    .then((res) => {
      console.log(res);
      if (res.ok) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user_id");
        localStorage.removeItem("user_type");
        localStorage.removeItem("username");
        localStorage.removeItem("job_seeker_id");
        localStorage.removeItem("employer_id");

        window.location.href = "./index.html";
        alert("Logged Out Successfully.");
      }
    })
    .catch((err) => console.log("Logout error:", err));
};

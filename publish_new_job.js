const token = localStorage.getItem("authToken");
const employer_id = localStorage.getItem("employer_id");

// fetching categories
fetch(`${config.baseUrl}/category/`)
  .then((res) => res.json())
  .then((data) => {
    // console.log(data);
    const categories_parent = document.getElementById("job_category");
    data.forEach((cat) => {
      // console.log(cat.name);
      categories_parent.innerHTML += `
            <option>${cat.name}</option>
        `;
    });
  })
  .catch((err) => {
    console.log(err);
  });

const handleJobPublish = (event) => {
  event.preventDefault();

  // getting the form element
  const form = document.getElementById("job_publish_form");

  // creating a new formData
  const formData = new FormData(form);

  // creating a job publish data object
  const jobPublishData = {
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

  console.log(jobPublishData);

  // fetching job publish API
  fetch(`${config.baseUrl}/job_posts/publish/?employer_id=${employer_id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(jobPublishData),
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
        console.log("job publish data:", response.body);
        alert("Job published successfully.");
        window.location.href = "./my_jobs.html";
      }
    })
    .catch((err) => console.log("job publish error:", err));
};

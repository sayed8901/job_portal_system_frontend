// footer
fetch("./footer.html")
  .then((res) => res.text())
  .then((data) => (document.getElementById("footer").innerHTML = data));


// banner
fetch("./banner.html")
  .then((res) => res.text())
  .then((data) => (document.getElementById("banner").innerHTML = data));


// advice
fetch("./advice_section.html")
  .then((res) => res.text())
  .then((data) => (document.getElementById("advice").innerHTML = data));

  

// company
fetch(`${config.baseUrl}/employer/list/`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    data.forEach(employer => {
      const categoryContainer = document.getElementById("employers-container");
      const div = document.createElement('div');
      div.innerHTML = `
            <div class="border rounded-tl-3xl rounded-br-3xl px-5 py-2">
              <img src="./assets/front_page-icon.jpg" class="img-responsive w-20 h-20 mb-2 mx-auto" alt="company_img" />
              <p class="text-indigo-700 text-center font-bold mb-3">${employer.company_name}</p>
              <p class="text-center">Address: <span class="font-bold">${employer.company_address}</span></p>
              <p class="text-center">Business: <span>${employer.business_info}</span></p>
            </div>
      `;
       categoryContainer.appendChild(div);
    });
  })
  .catch((err) => {
    console.log(err);
  });


// to show the categories only : extra part
// fetch(`${config.baseUrl}/category/`)
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data);
//     const categoryContainer = document.getElementById('category-container');
//     const div = document.createElement('div');
//     div.classList.add(
//       'flex', 'flex-wrap', 'justify-evenly', 'mx-auto', 'mt-10', 'mb-16', 'items-center', 'gap-x-6', 'gap-y-10', 'lg:mx-0', 
//     );
//     data.forEach(cat => {
//         div.innerHTML += `
//             <p class="animated-border px-3.5 py-2.5 text-sm font-semibold text-center">${cat.name}</p>
//         `;
//     });
//     categoryContainer.appendChild(div);
//   })
//   .catch((err) => {
//     console.log(err);
//   });


// view jobs btn dynamic path & title
// const user_type = localStorage.getItem('user_type');
const btn_container = document.getElementById('view-jobs');
if (user_type == 'employer') {
  btn_container.innerHTML = `
        <a
          href="./my_jobs.html"
          class="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >View My Jobs <span aria-hidden="true">&rarr;</span></a
        >
  `;
}
else {
  btn_container.innerHTML = `
        <a
          href="./all_jobs_by_category.html"
          class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >View All Jobs <span aria-hidden="true">&rarr;</span></a
        >
  `;
}

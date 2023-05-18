document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");
  const jobResults = document.getElementById("job-results");

  function fetchJobs(searchQuery) {
    const url = `https://jsearch.p.rapidapi.com/search?query=${searchQuery}&page=1&num_pages=1`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "bfe0e20588msh534cdf6ac9e6357p1fb254jsneefdced57e3f",
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
      },
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        // Check if data.data exists
        if (data.data && Array.isArray(data.data)) {
          // Clear previous job results
          jobResults.innerHTML = "";

          // Process and display the job results
          const jobs = data.data;
          const jobsString = jobs
            .map(
              (job) =>
                ` 
                 <li style="color: white; font-size: 24px; font-weight: bold; list-style-type: disc; color:#5a67d8; " class="list-item">Company Name</li>
                <h1  style="color: #2d3748;">${job.employer_name}</h1>
                <li style="color: white; font-size: 24px; font-weight: bold; list-style-type: disc; color:#5a67d8; " class="list-item" ">Job Name</li>
                 <h1 style="color: #2d3748;">${job.job_title}</h1>
                <li style="color: white; font-size: 24px; font-weight: bold; list-style-type: disc; color:#5a67d8; " class="list-item">City</li>

                <p style="color: #2d3748;">${job.job_city}</p>
                <li style="color: white; font-size: 24px; font-weight: bold; list-style-type: disc; color:#5a67d8; " class="list-item">Country</li>

                <p style="color: #2d3748;">${job.job_country}</p>
                <li style="color: white; font-size: 24px; font-weight: bold; list-style-type: disc; color:#5a67d8; " class="list-item">Apply Link</li>
                
                <p style="color: #2d3748;">${job.job_apply_link}</p>
              </div>
              <hr bg="blue" class="custom-hr">`
            )

            .join("");

          jobResults.innerHTML = jobsString;
          console.log(jobsString);
        } else {
          jobResults.innerHTML = "<p>No job results found.</p>";
        }
      })
      .catch((error) => console.error(error));
  }

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const searchQuery = searchInput.value.trim();
    if (searchQuery) {
      fetchJobs(searchQuery);
    }
  });
});

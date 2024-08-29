function convertProjectToHtmlCard(project) {
  const htmlCard = `
    <div class="col-xs-12 col-sm-6">
        <article data-category="${project.category}">
            <img
            src="${project.screenshot}"
            alt="Screenshot of ${project.website}"
            />
            <strong>${project.name}</strong>
            <a data-umami-event="${project.name}" href="${removeTrailingSlash(
    project.website
  )}" target="_blank" >${removeTrailingSlash(project.website)}</a>
            <p>${project.headline}</p>
        </article>
    </div>
    `;

  if (
    project.category != "" &&
    project.category != "" &&
    project.category != "" &&
    project.website != "" &&
    project.headline != "" &&
    project.screenshot != ""
  ) {
    $(htmlCard).appendTo($("#techup-projects"));
  }
}

function removeTrailingSlash(url) {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

function sortByNameAscending(dataArray) {
  return dataArray.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    return 0;
  });
}

function isAllValuesNonEmpty(item) {
  for (const key in item) {
    if (item[key] === "" || item[key] === null || item[key] === undefined) {
      return false;
    }
  }
  return true;
}

$(async function () {
  const projects = await $.getJSON("../data/projects.json");

  sortByNameAscending(projects);

  await projects.map(convertProjectToHtmlCard);
});

$(function () {
  function applyFilters() {
    const selectedCategory = $("#techup-categories").val();
    const query = $("#searchInput").val().toLowerCase();

    $("#techup-projects article").each(function () {
      const articleCategory = $(this).data("category");
      const title = $(this).find("strong").text().toLowerCase();
      const parentDiv = $(this).closest("div");

      let showByCategory =
        selectedCategory === "all" || articleCategory === selectedCategory;
      let showBySearch = title.includes(query);

      if (showByCategory && showBySearch) {
        parentDiv.show();
      } else {
        parentDiv.hide();
      }
    });
  }

  $("#techup-categories").change(applyFilters);

  $("#searchInput").on("input", applyFilters);
});

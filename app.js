// Get URL

const site = window.location.hostname

// Custom CSS

const Add_Custom_Style = css => document.head.appendChild(document.createElement("style")).innerHTML = css

// Custom Element

function Create_Custom_Element(tag, attr_tag, attr_name, value) {
  const custom_element = document.customElement(tag)
  custom_element.setAttribute(attr_tag, attr_name)
  custom_element.innerHTML = (value)
  document.body.append(custom_element)
}

//JS codes for TT
if (site.includes("tanktrouble.com")) {
  Add_Custom_Style(`
     
  `)
}
